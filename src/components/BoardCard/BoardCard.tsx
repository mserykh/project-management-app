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
    <NavLink to={`/board/${props.id}`} onClick={handleOnClick}>
      <div className="w-[308px] h-[252px] bg-[#f4f2ff] rounded-[24px] my-6">
        <h3 className="w-[260px] h-[80px] font-['Inter'] not-italic text-[32px] leading-[125%] my-6 mx-6">
          {props.title}
        </h3>
        <div className="w-[44px] flex justify-between my-6">
          <img
            className="inline-block mx-6"
            src={card_edit}
            onClick={() => {
              setIsUpdateModalOpened(true);
            }}
          ></img>
          <Modal isOpened={isUpdateModalOpened} onClose={handleUpdateModalOnClose}>
            <AddBoardForm onClose={handleUpdateModalOnClose} title={props.title} id={props.id} />
          </Modal>
          <img
            className="inline-block mx-6 "
            src={card_delete}
            onClick={() => {
              setIsDeleteModalOpened(true);
            }}
          ></img>
          <Modal isOpened={isDeleteModalOpened} onClose={handleDeleteModalOnClose}>
            <ConfirmDeleteModalWindow title={props.title} type="board" id={props.id} />
          </Modal>
        </div>
        <div className="uppercase text-[#aa9bff] text-[16px] leading-5 mx-6 my-6">{`${
          props.columnsCount ? props.columnsCount : '0'
        } columns`}</div>
        <div className="uppercase text-[#aa9bff] text-[16px] leading-5 mx-6">{`${
          props.tasksCount ? props.tasksCount : '0'
        } tasks`}</div>
      </div>
    </NavLink>
  );
}

export default BoardCard;
