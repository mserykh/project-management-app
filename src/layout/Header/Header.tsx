import { NavLink, useMatch, useNavigate } from 'react-router-dom';
import { useScroll } from '../../hooks/useScroll';
import Button from '../../components/Button/Button';
import LanguageToggle from '../../components/LanguageToggle/LanguageToggle';
import Logo from '../../components/Logo/Logo';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Modal from '../../components/Modal/Modal';
import AddBoardForm from '../../components/AddBoardForm/AddBoardForm';
import { logoutUser } from '../../redux/user/actions';

const Header = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const boardUrl = useMatch('/board/:boardId');
  const isBoardPage = boardUrl?.pathname === location.pathname;

  const { t } = useTranslation();
  const isScrolling = useScroll();

  const token = useAppSelector((state) => state.globalStateReducer.token);
  const userId = useAppSelector((state) => state.userReducer.user?.id);
  const isAuthenticated = useAppSelector((state) => state.userReducer.isAuthenticated);

  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const handleOnClose = (): void => {
    setIsModalOpened(false);
  };

  const AuthorisedButtons = (): JSX.Element => {
    if (userId && token) {
      return (
        <>
          <Button
            onClick={() => setIsModalOpened(true)}
            type="button"
            className="button button--board mx-auto"
          >
            {t('add_board_btn')}
          </Button>
          <Modal isOpened={isModalOpened} onClose={handleOnClose}>
            <AddBoardForm title="" id="" description="" onClose={handleOnClose} />
          </Modal>
          <UserAvatar />
          {!isAuthenticated && <NavLink to={'/login'}>Login</NavLink>}
          {!isAuthenticated && <NavLink to={'/signup'}>Registration</NavLink>}
        </>
      );
    }
    return <></>;
  };

  return (
    <header className={`header ${isScrolling || isBoardPage ? 'shadow' : 'shadow-none'}`}>
      <div
        className={`container w-full flex justify-between mx-auto ${
          isScrolling || isBoardPage ? 'py-5' : 'py-10'
        }`}
      >
        <NavLink to="/">
          <Logo isScrolling={isScrolling} isBoardPage={isBoardPage} />
        </NavLink>
        <AuthorisedButtons />
        <LanguageToggle />
      </div>
    </header>
  );
};

export default Header;
