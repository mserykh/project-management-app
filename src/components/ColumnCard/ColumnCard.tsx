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
import { updateColumn } from '../../redux/reducers/board/ActionsBoard';
import CreateUpdateTaskForm from '../CreateUpdateTaskForm/CreateUpdateTaskForm';
import { findIndex, get, cloneDeep, isNil, orderBy } from 'lodash';
import { ColumnInterface, TaskInterface } from '../../types';
import FormElement from '../FormElements/FormElement';
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop, XYCoord } from 'react-dnd';
import { getNewOrderNumber, moveColumn } from '../../utils';
import { updateColumnsData } from '../../redux/reducers/board/boardStateSlice';
import { updateColumnData } from '../../redux/reducers/board/boardStateSlice';
import { updateTask } from '../../redux/actions/task';
import TaskCard from '../TaskCard/TaskCard';
import { useTranslation } from 'react-i18next';

function ColumnCard({ id, title, order, boardId }: ColumnCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const boardData = useAppSelector((state) => state.boardReducer.boardData);
  const { t } = useTranslation();

  const columns = boardData.columns;
  const columnIndex = findIndex(boardData.columns, (column) => column.id === id);
  const columnData = boardData.columns[columnIndex];
  const columnId = boardData.columns[columnIndex].id;

  const [, dropRef1] = useDrop({
    accept: 'task',
    drop: async (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (!isNil(dropResult)) {
        return;
      }
      const boardDataCopy = cloneDeep(boardData);
      let oldColumnIndex = -1;
      let taskDataIndex = -1;
      for (let i = 0; i < boardData.columns.length; i += 1) {
        if (findIndex(boardData.columns[i].tasks, (task) => task.id === get(item, 'id')) !== -1) {
          oldColumnIndex = i;
          taskDataIndex = findIndex(
            boardData.columns[i].tasks,
            (task) => task.id === get(item, 'id')
          );
        }
      }
      if (oldColumnIndex !== -1 && taskDataIndex !== -1) {
        const copyTaskData = cloneDeep(boardData.columns[oldColumnIndex].tasks[taskDataIndex]);
        boardDataCopy.columns[oldColumnIndex].tasks.splice(taskDataIndex, 1);
        copyTaskData.order = getNewOrderNumber(columnData.tasks) || 0;
        copyTaskData.columnId = columnData.id;
        boardDataCopy.columns[columnIndex].tasks.push(copyTaskData);
        dispatch(updateColumnsData(boardDataCopy.columns));
        const copyTaskForApi = {
          columnId: copyTaskData.columnId,
          description: copyTaskData.description,
          title: copyTaskData.title,
          done: copyTaskData.done,
          boardId: boardData.id,
          order: copyTaskData.order,
          userId: copyTaskData.userId,
        };
        await updateTask(
          dispatch,
          copyTaskForApi,
          boardData.id,
          boardData.columns[oldColumnIndex].id,
          get(item, 'id')
        );
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const ref = useRef<HTMLLIElement>(null);

  const [{ isDragging }, dragRef] = useDrag({
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
  const moveTaskHandler = async (dragOrder: number, hoverOrder: number) => {
    const dragIndex = columnData.tasks.findIndex((task) => task.order === dragOrder);
    const hoverIndex = columnData.tasks.findIndex((task) => task.order === hoverOrder);
    const dragItem = columnData.tasks[dragIndex];
    if (isNil(dragItem)) {
      return;
    }
    const copyTasks = cloneDeep(columnData.tasks);
    const prevItem = copyTasks.splice(hoverIndex, 1, dragItem);
    const copyBoardData = cloneDeep(boardData);
    const hoverTaskData = {
      columnId: columnId,
      description: prevItem[0].description,
      title: prevItem[0].title,
      done: prevItem[0].done,
      boardId: boardData.id,
      order: dragOrder,
      userId: prevItem[0].userId,
    };
    const dragTaskData = {
      columnId: columnId,
      description: dragItem.description,
      title: dragItem.title,
      done: dragItem.done,
      boardId: boardData.id,
      order: hoverOrder,
      userId: dragItem.userId,
    };
    const copyDragTaskData = { ...dragTaskData, id: dragItem.id };
    const copyHoverTaskData = { ...hoverTaskData, id: prevItem[0].id };
    copyTasks[dragIndex] = copyDragTaskData;
    copyTasks[hoverIndex] = copyHoverTaskData;
    copyBoardData.columns[columnIndex].tasks = copyTasks;
    dispatch(updateColumnsData(copyBoardData.columns));
    await updateTask(dispatch, hoverTaskData, boardData.id, columnId, prevItem[0].id as string);
    await updateTask(dispatch, dragTaskData, boardData.id, columnId, dragItem.id as string);
  };

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

  dragRef(dropRef(dropRef1(ref)));

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
              <p className="caption">{`${tasks.length} ${t('_LBL_TASK_', {
                count: tasks.length,
              })}`}</p>{' '}
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
                inputData={register('columnTitle', {
                  required: true,
                  minLength: 1,
                  value: title || '',
                })}
                labelClassName="hidden"
              />
              <div className="buttons-wrapper">
                <Button className="button--cancel" type="button" onClick={handleCancel}>
                  {t('_BTN_CANCEL_')}
                </Button>
                <Button
                  className={`button--update${
                    isSubmitDisabled ? ' bg-gray' : ' bg-primaryGreen hover:opacity-70'
                  }`}
                  type="submit"
                  isDisabled={isSubmitDisabled}
                >
                  OK
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
            <span>{t('_BTN_ADD_TASK_')}</span>
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
        <ul className="tasks-list">
          {orderBy(tasks, ['order'], ['asc']).map((el: TaskInterface) => (
            <TaskCard
              key={`${el.id}${el.order}`}
              id={el.id as string}
              title={el.title}
              boardId={boardId}
              userId={el.userId}
              description={el.description}
              columnId={id}
              order={el.order}
              moveTaskHandler={moveTaskHandler}
            />
          ))}
        </ul>
      </li>
      {isDeleteModalOpened && (
        <Modal onClose={handleDeleteModalOnClose}>
          <ConfirmDeleteModalWindow
            title={title}
            type="column"
            id={id}
            onClose={handleDeleteModalOnClose}
          />
        </Modal>
      )}
      {isAddTaskModalOpened && (
        <Modal onClose={handleAddTaskModalOnClose}>
          <CreateUpdateTaskForm
            onClose={handleAddTaskModalOnClose}
            columnId={id}
            boardId={boardId}
            readOnly={false}
          />
        </Modal>
      )}
    </>
  );
}

export default ColumnCard;
