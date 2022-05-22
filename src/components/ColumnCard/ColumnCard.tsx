import card_delete from '../../assets/images/card_delete.svg';
import task_add from '../../assets/images/task_add.svg';
import Modal from '../Modal/Modal';
import ColumnCardProps from './types';
import { useRef, useState } from 'react';
import ConfirmDeleteModalWindow from '../ConfirmDeleteModalWindow/ConfirmDeleteModalWindow';
import { useForm } from 'react-hook-form';
import { AddColumnFormData } from '../AddColumnForm/AddColumnForm';
import Button from '../Button/Button';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useNavigate } from 'react-router';
import { updateColumn } from '../../redux/reducers/board/ActionsBoard';
import CreateUpdateTaskForm from '../CreateUpdateTaskForm/CreateUpdateTaskForm';
import { findIndex } from 'lodash';
import { ColumnInterface, TaskInterface } from '../../types';
import TaskCard from '../TaskCard/TaskCard';
import FormElement from '../FormElements/FormElement';
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop, XYCoord } from 'react-dnd';
import { moveColumn } from '../../utils';
import { updateColumnData } from '../../redux/reducers/board/boardStateSlice';

function ColumnCard({ id, title, order, boardId }: ColumnCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const boardData = useAppSelector((state) => state.boardReducer.boardData);
  const columns = boardData.columns;
  const navigate = useNavigate();

  const ref = useRef<HTMLLIElement>(null);

  const [{ isDragging }, dragRef, preview] = useDrag({
    type: 'column',
    item: () => {
      return { id, title, order, boardId };
    },
    collect: (monitor: DragSourceMonitor) => ({
      item: monitor.getItem(),
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'column',
    drop: async (item: ColumnCardProps, monitor: DropTargetMonitor) => {
      if (!ref.current) {
        return;
      }
      const dragColumnOrder = item.order;
      const dropColumnOrder = order;
      if (dragColumnOrder === dropColumnOrder) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset() as XYCoord;
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;

      if (dragColumnOrder < dropColumnOrder && hoverClientX < hoverMiddleX) {
        return;
      }

      if (dragColumnOrder > dropColumnOrder && hoverClientX > hoverMiddleX) {
        return;
      }
      await moveColumn(columns, boardId, dragColumnOrder, dropColumnOrder, dispatch);
    },
  });

  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState<boolean>(false);
  const [isUpdateInputOpened, setIsUpdateInputOpened] = useState<boolean>(false);
  const [isAddTaskModalOpened, setIsAddTaskModalOpened] = useState<boolean>(false);
  const { tasks } = useAppSelector((state) => {
    const columnIndex = findIndex(
      state.boardReducer.boardData.columns,
      (column: ColumnInterface) => column.id === id
    );
    return state.boardReducer.boardData.columns[columnIndex];
  });
  const tasksRender = tasks.map((el: TaskInterface) => (
    <TaskCard
      key={el.id}
      id={el.id as string}
      title={el.title}
      boardId={boardId}
      userId={el.userId}
      description={el.description}
      columnId={id}
    />
  ));

  const handleDeleteModalOnClose = (): void => {
    setIsDeleteModalOpened(false);
  };
  const handleAddTaskModalOnClose = (): void => {
    setIsAddTaskModalOpened(false);
  };

  const {
    register,
    reset,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<AddColumnFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });
  const isSubmitDisabled = !isDirty || Object.keys(errors).length > 0;

  const handleUpdateColumnTitle = (): void => {
    setIsUpdateInputOpened((prevValue) => !prevValue);
  };

  const handleCancel = (): void => {
    handleUpdateColumnTitle();
    reset();
  };

  const formSubmitHandler = (data: AddColumnFormData): void => {
    if (data.columnTitle !== title) {
      dispatch(
        updateColumn({
          title: data.columnTitle,
          columnId: id,
          boardId: boardData.id,
          order: order,
          navigate: navigate,
        })
      );
      dispatch(
        updateColumnData({
          id: id,
          title: data.columnTitle,
          order: order,
          tasks,
        })
      );
    }
    reset();
    handleUpdateColumnTitle();
  };

  dragRef(dropRef(ref));

  return (
    <>
      <li
        ref={ref}
        key={id}
        className={`column ${isDragging ? 'opacity-0' : 'cursor-grab opacity-100'}`}
      >
        <header className="column__header transition">
          {!isUpdateInputOpened && (
            <>
              <h3 ref={dragRef} onClick={handleUpdateColumnTitle} className="column__title">
                {title}
              </h3>
              <p className="caption">{`${tasks.length} ${tasks.length > 1 ? 'tasks' : 'task'}`}</p>
            </>
          )}
          {isUpdateInputOpened && !isDragging && (
            <form
              className="form items-baselinetransition"
              onSubmit={handleSubmit(formSubmitHandler)}
            >
              <FormElement
                type="text"
                label="Add column title"
                labelColor={'black'}
                placeholder="Please enter the column title"
                errorText={'The title should contain at least 1 character'}
                hasError={!!errors?.columnTitle}
                classNameLabel="hidden"
                inputData={register('columnTitle', {
                  required: true,
                  minLength: 1,
                  value: title || '',
                })}
              />
              <div className="buttons-wrapper">
                <Button className="button--cancel" type="button" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  className={`button--update${
                    isSubmitDisabled ? ' bg-gray-300' : ' bg-primaryGreen hover:bg-emerald-600'
                  }`}
                  type="submit"
                  isDisabled={isSubmitDisabled}
                >
                  Ok
                </Button>
              </div>
            </form>
          )}
        </header>
        <div className="flex items-center justify-between">
          <button
            className="button button--task"
            onClick={() => {
              setIsAddTaskModalOpened(true);
            }}
          >
            <img className="" src={task_add}></img>
            <span>Add task</span>
          </button>
          <button
            onClick={() => {
              setIsDeleteModalOpened(true);
            }}
            className="flex items-center justify-center w-8 h-8 hover:bg-white hover:rounded-full"
          >
            <img src={card_delete} alt="" />
            <span className="sr-only">Delete the column</span>
          </button>
        </div>
        <ul className="tasks-list">{tasksRender}</ul>
      </li>
      <Modal isOpened={isDeleteModalOpened} onClose={handleDeleteModalOnClose}>
        <ConfirmDeleteModalWindow
          title={title}
          type="column"
          id={id}
          onClose={handleDeleteModalOnClose}
        />
      </Modal>
      <Modal isOpened={isAddTaskModalOpened} onClose={handleAddTaskModalOnClose}>
        <CreateUpdateTaskForm
          onClose={handleAddTaskModalOnClose}
          columnId={id}
          boardId={boardId}
          readOnly={false}
        />
      </Modal>
    </>
  );
}

export default ColumnCard;
