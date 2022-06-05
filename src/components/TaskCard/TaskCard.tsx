import card_delete from '../../assets/images/card_delete.svg';
import user_image from '../../assets/images/user_image.svg';
import Modal from '../Modal/Modal';
import { SyntheticEvent, useRef, useState } from 'react';
import ConfirmDeleteModalWindow from '../ConfirmDeleteModalWindow/ConfirmDeleteModalWindow';
import CreateUpdateTaskForm from '../CreateUpdateTaskForm/CreateUpdateTaskForm';
import { TaskInterface, UserInterface } from '../../types';
import { useAppSelector } from '../../redux/hooks';
import { findIndex, isNil, get } from 'lodash';
import { useDrag, useDrop, XYCoord } from 'react-dnd';

function TaskCard(props: TaskInterface): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: 'task',
    hover: (item: TaskInterface, monitor) => {
      /*Function from react-dnd docs https://react-dnd.github.io/react-dnd/examples/sortable/simple */
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = props.order;
      if (dragIndex === hoverIndex) {
        return;
      }
      if (props.columnId !== item.columnId) {
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex && hoverIndex && dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex && hoverIndex && dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
      if (props.moveTaskHandler) {
        if (!isNil(dragIndex) && !isNil(hoverIndex)) {
          props.moveTaskHandler(dragIndex as number, hoverIndex as number);
        }
      }
      item.index = hoverIndex;
    },
  });
  const [, drag] = useDrag({
    type: 'task',
    item: { index: props.order, id: props.id, name: props.title, columnId: props.columnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
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
    if (userId && users) {
      const userIndex = findIndex(users, (user: UserInterface) => user.id === userId);
      return get(users[userIndex], 'login');
    }
  };
  drag(drop(ref));
  return (
    <li>
      <div
        key={props.id}
        className="task"
        ref={ref}
        draggable
        onClick={(event: SyntheticEvent) => {
          if ((event.target as Node).nodeName === 'IMG') {
            event.preventDefault();
            event.stopPropagation();
            return;
          } else {
            setIsAddTaskModalOpened(true);
          }
        }}
      >
        <h3 className="task__title" title={props.title}>
          {props.title}
        </h3>
        <h5 className="task__description">{props.description}</h5>
        <div className="flex gap-2">
          <img src={user_image} alt="" />
          <span className="text-primaryGreen task__username">
            &nbsp;{props.userId ? userName(props.userId) : ''}
          </span>
        </div>
        <button className="self-end flex items-center justify-center w-8 h-8 hover:bg-off-white hover:rounded-full">
          <img src={card_delete} onClick={() => setIsDeleteModalOpened(true)} />
          <span className="sr-only">Delete the task</span>
        </button>
      </div>
      {isDeleteModalOpened && (
        <Modal onClose={handleDeleteModalOnClose}>
          <ConfirmDeleteModalWindow
            title={props.title}
            type="task"
            id={props.id ? props.id : ''}
            onClose={handleDeleteModalOnClose}
          />
        </Modal>
      )}
      {isAddTaskModalOpened && (
        <Modal onClose={handleAddTaskModalOnClose}>
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
      )}
    </li>
  );
}

export default TaskCard;
