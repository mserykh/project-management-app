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
    <li>
      <div key={props.id} className="task" onClick={() => setIsAddTaskModalOpened(true)}>
        <h3 className="task__title">{props.title}</h3>
        <p className="task__description">{props.description}</p>
        <div className="flex gap-2">
          <img src={user_image} alt="" />
          <span className="text-[#1ad993] task__username">
            &nbsp;{props.userId ? userName(props.userId) : ''}
          </span>
        </div>
        <button className="flex justify-end">
          <img src={card_delete} onClick={() => setIsDeleteModalOpened(true)} />
          <span className="sr-only">Delete the task</span>
        </button>
      </div>
      <Modal isOpened={isDeleteModalOpened} onClose={handleDeleteModalOnClose}>
        <ConfirmDeleteModalWindow
          title={props.title}
          type="task"
          id={props.id ? props.id : ''}
          onClose={handleDeleteModalOnClose}
        />
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
    </li>
  );
}

export default TaskCard;
