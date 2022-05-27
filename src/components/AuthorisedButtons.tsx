import { useTranslation } from 'react-i18next';
import AddBoardForm from './AddBoardForm/AddBoardForm';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import UserAvatar from './UserAvatar/UserAvatar';

type AuthorisedButtonsProps = {
  isModalOpened: boolean;
  handleOpen: () => void;
  handleClose: () => void;
};

const AuthorisedButtons = ({
  isModalOpened,
  handleOpen,
  handleClose,
}: AuthorisedButtonsProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <Button onClick={handleOpen} type="button" className="button button--board ml-auto">
        {t('_BTN_ADD_BOARD_')}
      </Button>
      {isModalOpened && (
        <Modal onClose={handleClose}>
          <AddBoardForm title="" id="" description="" onClose={handleClose} />
        </Modal>
      )}
      <UserAvatar />
    </>
  );
};

export default AuthorisedButtons;
