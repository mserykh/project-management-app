import { NavLink } from 'react-router-dom';
import { useScroll } from '../../hooks/useScroll';
import Button from '../../components/Button/Button';
import LanguageToggle from '../../components/LanguageToggle/LanguageToggle';
import Logo from '../../components/Logo/Logo';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const userState = {
  isAuthorised: true,
}; //state.user.isAutorised

const Header = (): JSX.Element => {
  const { t } = useTranslation();
  const isScrolling = useScroll();

  const [isAuthorised, setIsAuthorised] = useState<boolean>(userState.isAuthorised);

  const AuthorisedButtons = (): JSX.Element => {
    if (isAuthorised) {
      return (
        <>
          <Button
            onClick={() => {
              console.log('clicked add board');
              // dispatch({type: BOARD.ADD});
            }}
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            {t('add_board_btn')}
          </Button>
          <UserAvatar />
          <Button
            onClick={() => {
              // dispatch({type: LOGOUT});
              userState.isAuthorised = false;
              setIsAuthorised(userState.isAuthorised);
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
