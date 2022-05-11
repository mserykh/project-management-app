import card_delete from '../../assets/images/card_delete.svg';
import card_edit from '../../assets/images/card_edit.svg';
import AddBoardForm from '../AddBoardForm/AddBoardForm';
import Modal from '../Modal/Modal';
import ColumnCardProps from './types';
import { SyntheticEvent } from 'react';
import { useState } from 'react';
import ConfirmDeleteModalWindow from '../ConfirmDeleteModalWindow/ConfirmDeleteModalWindow';

function ColumnCard({ id, title }: ColumnCardProps): JSX.Element {
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
      <li key={id} className="w-96 bg-purple-100 rounded-3xl p-6 h-96">
        <h3 className="w-[260px] h-[80px] font-['Inter'] not-italic text-[32px] leading-[125%] my-6 mx-6">
          {title}
        </h3>
        <div className="w-[44px] flex justify-between my-6">
          <img
            className="inline-block mx-6"
            src={card_edit}
            onClick={() => {
              setIsUpdateModalOpened(true);
            }}
          ></img>
          <img
            className="inline-block mx-6 "
            src={card_delete}
            onClick={() => {
              setIsDeleteModalOpened(true);
            }}
          ></img>
        </div>
      </li>
      <Modal isOpened={isUpdateModalOpened} onClose={handleUpdateModalOnClose}>
        <AddBoardForm onClose={handleUpdateModalOnClose} title={title} id={id} />
      </Modal>
      <Modal isOpened={isDeleteModalOpened} onClose={handleDeleteModalOnClose}>
        <ConfirmDeleteModalWindow title={title} type="board" id={id} />
      </Modal>
    </>
  );
}

export default ColumnCard;
