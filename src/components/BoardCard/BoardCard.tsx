import { NavLink } from 'react-router-dom';
import card_delete from '../../assets/images/card_delete.svg';
import card_edit from '../../assets/images/card_edit.svg';
import AddBoardForm from '../AddBoardForm/AddBoardForm';
import Modal from '../Modal/Modal';
import BoardCardProps from './types';
import { SyntheticEvent } from 'react';
import { useState } from 'react';
import ConfirmDeleteModalWindow from '../ConfirmDeleteModalWindow/ConfirmDeleteModalWindow';

function BoardCard(props: BoardCardProps): JSX.Element {
  const [isUpdateModalOpened, setIsUpdateModalOpened] = useState<boolean>(false);
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState<boolean>(false);
  const handleUpdateModalOnClose = (): void => {
    setIsUpdateModalOpened(false);
  };
  const handleDeleteModalOnClose = (): void => {
    setIsDeleteModalOpened(false);
  };
  const handleOnClick = (event: SyntheticEvent): void => {
    if ((event.target as Node).nodeName === 'IMG') {
      event.preventDefault();
      event.stopPropagation();
    }
  };
  return (
    <>
      <NavLink to={`/board/${props.id}`} onClick={handleOnClick}>
        <div className="flex flex-col gap-4 w-[260px] h-[252px] bg-[#f4f2ff] rounded-[24px] my-6 py-4 px-4">
          <h3 className="w-full h-[60px] text-ellipsis overflow-hidden font-['Inter'] not-italic text-[24px] leading-[125%]">
            {props.title}
          </h3>
          <p className="font-['Inter'] text-[16px]">{props.description}</p>
          <div className="w-[44px] gap-6 flex justify-between">
            <img
              className="inline-block"
              src={card_edit}
              onClick={() => {
                setIsUpdateModalOpened(true);
              }}
            ></img>
            <img
              className="inline-block"
              src={card_delete}
              onClick={() => {
                setIsDeleteModalOpened(true);
              }}
            ></img>
          </div>
          <div className="uppercase text-[#aa9bff] text-[16px] leading-5">{`${
            props.columnsCount ? props.columnsCount : '0'
          } columns`}</div>
          <div className="uppercase text-[#aa9bff] text-[16px] leading-5">{`${
            props.tasksCount ? props.tasksCount : '0'
          } tasks`}</div>
        </div>
      </NavLink>
      <Modal isOpened={isUpdateModalOpened} onClose={handleUpdateModalOnClose}>
        <AddBoardForm
          onClose={handleUpdateModalOnClose}
          title={props.title}
          id={props.id}
          description={props.description}
        />
      </Modal>
      <Modal isOpened={isDeleteModalOpened} onClose={handleDeleteModalOnClose}>
        <ConfirmDeleteModalWindow title={props.title} type="board" id={props.id} />
      </Modal>
    </>
  );
}

export default BoardCard;
