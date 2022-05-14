import card_delete from '../../assets/images/card_delete.svg';
import Modal from '../Modal/Modal';
import ColumnCardProps from './types';
import { useState } from 'react';
import ConfirmDeleteModalWindow from '../ConfirmDeleteModalWindow/ConfirmDeleteModalWindow';

function ColumnCard({ id, title }: ColumnCardProps): JSX.Element {
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState<boolean>(false);

  const handleDeleteModalOnClose = (): void => {
    setIsDeleteModalOpened(false);
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
        </div>
      </li>
      <Modal isOpened={isDeleteModalOpened} onClose={handleDeleteModalOnClose}>
        <ConfirmDeleteModalWindow title={title} type="column" id={id} />
      </Modal>
    </>
  );
}

export default ColumnCard;
