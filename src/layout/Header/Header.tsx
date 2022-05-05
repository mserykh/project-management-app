import { NavLink } from 'react-router-dom';
import Button from '../../components/Button/Button';
import LanguageToggle from '../../components/LanguageToggle/LanguageToggle';
import Logo from '../../components/Logo/Logo';
import UserAvatar from '../../components/UserAvatar/UserAvatar';

const Header = (): JSX.Element => {
  const isAuthorised = true; //state.user.isAutorised
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
            buttonStyle="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Add Board
          </Button>
          <UserAvatar />
          <Button
            onClick={() => {
              // dispatch({type: LOGOUT});
              console.log('clicked log out');
            }}
            type="button"
            buttonStyle="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Log Out
          </Button>
          <Button
            onClick={() => {
              console.log('clicked edit');
              // dispatch({type: PROFILE.EDIT});
            }}
            type="button"
            buttonStyle="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full"
          >
            Edit profile
          </Button>
        </>
      );
    }
    return <></>;
  };

  return (
    <header className="text-left bg-gray-100 text-gray-600">
      <div className="flex justify-between container mx-auto py-10">
        <NavLink to="/">
          <Logo />
        </NavLink>
        <AuthorisedButtons />
        <LanguageToggle />
      </div>
    </header>
  );
};

export default Header;
