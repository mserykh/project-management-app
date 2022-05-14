import card_delete from '../../assets/images/card_delete.svg';
import task_add from '../../assets/images/task_add.svg';
import Modal from '../Modal/Modal';
import ColumnCardProps from './types';
import { useState } from 'react';
import ConfirmDeleteModalWindow from '../ConfirmDeleteModalWindow/ConfirmDeleteModalWindow';
import CreateUpdateTaskForm from '../CreateUpdateTaskForm/CreateUpdateTaskForm';
import { useAppSelector } from '../../redux/hooks';
import { findIndex } from 'lodash';
import { ColumnInterface, TaskInterface } from '../../types';
import TaskCard from '../TaskCard/TaskCard';

function ColumnCard({ id, title, boardId }: ColumnCardProps): JSX.Element {
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState<boolean>(false);
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

  return (
    <>
      <li key={id} className="w-96 bg-purple-100 rounded-3xl p-6 h-96">
        <h3 className="w-[260px] h-[80px] font-['Inter'] not-italic text-[32px] leading-[125%] my-6 mx-6">
          {title}
        </h3>
        <div className="w-[44px] flex justify-between my-6">
          <img
            className="inline-block mx-6 "
            src={card_delete}
            onClick={() => setIsDeleteModalOpened(true)}
          ></img>
          <div
            onClick={() => {
              setIsAddTaskModalOpened(true);
            }}
          >
            <img className="inline-block mx-6 " src={task_add}></img>
            <span className="font-['Inter'] not-italic text-[#503ae7] text-[16px] leading-[150%]">
              Add task
            </span>
          </div>
        </div>
        <div>{tasksRender}</div>
      </li>
      <Modal isOpened={isDeleteModalOpened} onClose={handleDeleteModalOnClose}>
        <ConfirmDeleteModalWindow title={title} type="column" id={id} />
      </Modal>
      <Modal isOpened={isAddTaskModalOpened} onClose={handleAddTaskModalOnClose}>
        <CreateUpdateTaskForm onClose={handleAddTaskModalOnClose} columnId={id} boardId={boardId} />
      </Modal>
    </>
  );
}

export default ColumnCard;
