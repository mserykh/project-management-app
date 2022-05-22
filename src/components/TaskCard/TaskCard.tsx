import card_delete from '../../assets/images/card_delete.svg';
import user_image from '../../assets/images/user_image.svg';
import Modal from '../Modal/Modal';
import { useRef, useState } from 'react';
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
    item: { index: props.order, id: props.id, name: props.title },
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
    <>
      <div
        key={props.id}
        className="w-[360px] bg-white rounded-3xl p-6 h-[275px] mb-10"
        ref={ref}
        draggable
        onClick={() => setIsAddTaskModalOpened(true)}
      >
        <h3 className="overflow-hidden text-ellipsis whitespace-nowrap mb-10">{props.title}</h3>
        <h5 className="overflow-hidden text-ellipsis whitespace-nowrap mb-10">
          {props.description}
        </h5>
        <div className="mb-5">
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
