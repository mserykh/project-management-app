import { NavLink, useNavigate } from 'react-router-dom';
import { useScroll } from '../../hooks/useScroll';
import Button from '../../components/Button/Button';
import LanguageToggle from '../../components/LanguageToggle/LanguageToggle';
import Logo from '../../components/Logo/Logo';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import globalStateSlice from '../../redux/reducers/globalStateSlice';
import { useAppSelector } from '../../redux/hooks';
import Modal from '../../components/Modal/Modal';
import AddBoardForm from '../../components/AddBoardForm/AddBoardForm';

const Header = (): JSX.Element => {
  const { t } = useTranslation();
  const isScrolling = useScroll();

  const { userId, token } = useAppSelector((state) => state.stateReducer);
  const dispatch = useDispatch();
  const { logout } = globalStateSlice.actions;
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', token);
  }, [userId, token]);

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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            {t('add_board_btn')}
          </Button>
          <Modal isOpened={isModalOpened} onClose={handleOnClose}>
            <AddBoardForm onClose={handleOnClose} />
          </Modal>
          <UserAvatar />
          <Button
            onClick={() => {
              dispatch(logout());
              navigate('/');
            }}
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            {t('log_out_btn')}
          </Button>
          <Button
            onClick={() => {
              console.log('clicked edit');
              // dispatch({type: PROFILE.EDIT});
            }}
            type="button"
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full"
          >
            {t('edit_profile_btn')}
          </Button>
        </>
      );
    }
    return <></>;
  };

  return (
    <header
      className={`sticky top-0 text-left bg-white text-gray-600 z-999 transition-all${
        isScrolling ? ' shadow' : 'shadow-none'
      }`}
    >
      <div className="flex justify-between container mx-auto py-10">
        <NavLink to="/">
          <Logo isScrolling={isScrolling} />
        </NavLink>
        <AuthorisedButtons />
        <LanguageToggle />
      </div>
    </header>
  );
};

export default Header;
