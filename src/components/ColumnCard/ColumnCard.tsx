import card_delete from '../../assets/images/card_delete.svg';
import Modal from '../Modal/Modal';
import ColumnCardProps from './types';
import { useState } from 'react';
import ConfirmDeleteModalWindow from '../ConfirmDeleteModalWindow/ConfirmDeleteModalWindow';
import CreateUpdateTaskForm from '../CreateUpdateTaskForm/CreateUpdateTaskForm';

function ColumnCard({ id, title }: ColumnCardProps): JSX.Element {
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState<boolean>(false);
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
      </li>
      <Modal isOpened={isDeleteModalOpened} onClose={handleDeleteModalOnClose}>
        <ConfirmDeleteModalWindow title={title} type="column" id={id} />
      </Modal>
      <Modal isOpened={isAddTaskModalOpened} onClose={handleAddTaskModalOnClose}>
        <CreateUpdateTaskForm onClose={handleAddTaskModalOnClose} />
      </Modal>
    </>
  );
}

export default ColumnCard;
