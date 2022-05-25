import { NavLink, useMatch } from 'react-router-dom';
import { useScroll } from '../../hooks/useScroll';
import LanguageToggle from '../../components/LanguageToggle/LanguageToggle';
import Logo from '../../components/Logo/Logo';
import { useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import AuthorisedButtons from '../../components/AuthorisedButtons';

const Header = (): JSX.Element => {
  const boardUrl = useMatch('/board/:boardId');
  const isBoardPage = boardUrl?.pathname === location.pathname;

  const isScrolling = useScroll();

  const token = useAppSelector((state) => state.globalStateReducer.token);
  const userId = useAppSelector((state) => state.userReducer.user?.id);

  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const handleOnClose = (): void => {
    setIsModalOpened(false);
  };

  const openModal = (): void => {
    setIsModalOpened(true);
  };

  return (
    <header className={`header ${isScrolling || isBoardPage ? 'shadow' : 'shadow-none'}`}>
      <div
        className={`container w-full gap-2 grid grid-cols-2 xs:flex xs:flex-rows xs:justify-between mx-auto ${
          isScrolling || isBoardPage ? 'py-2 xs:py-5' : 'py-4 xs:py-10'
        }`}
      >
        <NavLink to="/">
          <Logo isScrolling={isScrolling} isBoardPage={isBoardPage} />
        </NavLink>
        {token && userId && (
          <AuthorisedButtons
            isModalOpened={isModalOpened}
            handleOpen={openModal}
            handleClose={handleOnClose}
          />
        )}
        <LanguageToggle />
      </div>
    </header>
  );
};

export default Header;
