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
import { findIndex, get, cloneDeep, isNil, orderBy } from 'lodash';
import { ColumnInterface, TaskInterface } from '../../types';
import TaskCard from '../TaskCard/TaskCard';
import FormElement from '../FormElements/FormElement';
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop, XYCoord } from 'react-dnd';
import { getNewOrderNumber, moveColumn } from '../../utils';
import { updateColumnsData } from '../../redux/reducers/board/boardStateSlice';
import { updateColumnData } from '../../redux/reducers/board/boardStateSlice';
import { updateTask } from '../../redux/actions/task';

function ColumnCard({ id, title, order, boardId }: ColumnCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const boardData = useAppSelector((state) => state.boardReducer.boardData);
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
  const navigate = useNavigate();

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
    await updateTask(hoverTaskData, boardData.id, columnId, prevItem[0].id as string);
    await updateTask(dragTaskData, boardData.id, columnId, dragItem.id as string);
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
        className={`overflow-auto w-72 bg-purple-100 ${
          isDragging ? 'opacity-0' : 'cursor-grab opacity-100'
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
          {isUpdateInputOpened && !isDragging && (
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
        <div className="flex justify-between mb-2" ref={dropRef1}>
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
        <div className="flex flex-col justify-center items-center">
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
        </div>
      </li>
      <Modal isOpened={isDeleteModalOpened} onClose={handleDeleteModalOnClose}>
        <ConfirmDeleteModalWindow title={title} type="column" id={id} />
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
