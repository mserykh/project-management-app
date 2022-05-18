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
import { updateColumnData } from '../../redux/reducers/board/boardStateSlice';
import { moveColumn } from '../../utils';

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

    // end: (item, monitor) => {
    //   console.log(item);
    // },
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
      console.log(dragColumnOrder, dropColumnOrder);

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
      await moveColumn(
        columns,
        boardId,
        dragColumnOrder,
        dropColumnOrder,
        dispatch,
        updateColumn,
        updateColumnData
      );
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
        className={`overflow-auto w-72 bg-purple-100 ${
          isDragging ? 'opacity-0' : 'opacity-100'
        } rounded-3xl p-4`}
      >
        <div className="">
          {!isUpdateInputOpened && (
            <h3
              ref={dragRef}
              onClick={handleUpdateColumnTitle}
              className={`w-[256px] h-[80px] font-['Inter'] not-italic text-[32px] leading-[125%]`}
            >
              {title}
            </h3>
          )}
          {isUpdateInputOpened && (
            <form onSubmit={handleSubmit(formSubmitHandler)}>
              <FormElement
                type="text"
                label="Add column title"
                labelColor={'black'}
                placeholder="Please enter the column title"
                errorText={'The title should contain at least 1 character'}
                hasError={!!errors?.columnTitle}
                inputData={register('columnTitle', {
                  required: true,
                  minLength: 1,
                  value: title || '',
                })}
              />
              <Button
                className={`ml-auto whitespace-nowrap text-white font-bold py-2 px-4 rounded-full rounded-tr${
                  isSubmitDisabled ? ' bg-gray-300' : ' bg-emerald-400 hover:bg-emerald-600'
                }`}
                type="submit"
                isDisabled={isSubmitDisabled}
              >
                Ok
              </Button>
              <Button
                className={`ml-auto whitespace-nowrap text-white font-bold py-2 px-4 rounded-full rounded-tr bg-gray-200 hover:bg-gray-400`}
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </form>
          )}
        </div>
        <div className="flex justify-between mb-2">
          <div
            className="flex gap-2"
            onClick={() => {
              setIsAddTaskModalOpened(true);
            }}
          >
            <img className="inline-block" src={task_add}></img>
            <span className="font-['Inter'] not-italic text-[#503ae7] text-[16px] leading-[150%]">
              Add task
            </span>
          </div>
          <img
            className="inline-block"
            src={card_delete}
            onClick={() => setIsDeleteModalOpened(true)}
          ></img>
        </div>
        <div className="flex flex-col gap-2 w-full">{tasksRender}</div>
      </li>
      <Modal isOpened={isDeleteModalOpened} onClose={handleDeleteModalOnClose}>
        <ConfirmDeleteModalWindow title={title} type="column" id={id} />
      </Modal>
      <Modal isOpened={isAddTaskModalOpened} onClose={handleAddTaskModalOnClose}>
        <CreateUpdateTaskForm
          onClose={handleAddTaskModalOnClose}
          columnId={id}
          boardId={boardId}
          editMode={true}
        />
      </Modal>
    </>
  );
}

export default ColumnCard;
