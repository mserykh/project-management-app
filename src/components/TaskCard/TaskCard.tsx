import card_delete from '../../assets/images/card_delete.svg';
import user_image from '../../assets/images/user_image.svg';
import Modal from '../Modal/Modal';
import { useState } from 'react';
import ConfirmDeleteModalWindow from '../ConfirmDeleteModalWindow/ConfirmDeleteModalWindow';
import CreateUpdateTaskForm from '../CreateUpdateTaskForm/CreateUpdateTaskForm';
import { TaskInterface, UserInterface } from '../../types';
import { useAppSelector } from '../../redux/hooks';
import { findIndex, get } from 'lodash';

function TaskCard(props: TaskInterface): JSX.Element {
  const { users } = useAppSelector((state) => state.boardReducer);
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState<boolean>(false);

  const [isAddTaskModalOpened, setIsAddTaskModalOpened] = useState<boolean>(false);

  const handleDeleteModalOnClose = (): void => {
    setIsDeleteModalOpened(false);
  };
  const handleAddTaskModalOnClose = (): void => {
    setIsAddTaskModalOpened(false);
  };

  const userName = (userId: string) => {
    if (userId) {
      const userIndex = findIndex(users, (user: UserInterface) => user.id === userId);
      return get(users[userIndex], 'login');
    }
  };

  return (
    <>
      <div
        key={props.id}
        className="w-[360px] bg-white rounded-3xl p-6 h-[275px]"
        onClick={() => setIsAddTaskModalOpened(true)}
      >
        <h3 className="overflow-hidden text-ellipsis whitespace-nowrap mb-10">{props.title}</h3>
        <h5 className="overflow-hidden text-ellipsis whitespace-nowrap mb-10">
          {props.description}
        </h5>
        <div className="mb-10">
          <img className="inline-block" src={user_image}></img>
          <span className="text-[#1ad993]">&nbsp;{props.userId ? userName(props.userId) : ''}</span>
        </div>
        <div className="flex justify-end">
          <img src={card_delete} onClick={() => setIsDeleteModalOpened(true)}></img>
        </div>
      </div>
      <Modal isOpened={isDeleteModalOpened} onClose={handleDeleteModalOnClose}>
        <ConfirmDeleteModalWindow title={props.title} type="task" id={props.id ? props.id : ''} />
      </Modal>
      <Modal isOpened={isAddTaskModalOpened} onClose={handleAddTaskModalOnClose}>
        <CreateUpdateTaskForm
          onClose={handleAddTaskModalOnClose}
          columnId={props.columnId as string}
          boardId={props.boardId as string}
          title={props.title}
          description={props.description}
          id={props.id}
          userId={props.userId}
          readOnly={true}
        />
      </Modal>
    </>
  );
}

export default TaskCard;
