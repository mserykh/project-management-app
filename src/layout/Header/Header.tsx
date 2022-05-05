import AddBoardBtn from '../../components/AddBoardBtn/AddBoardBtn';
import LocalizationToggle from '../../components/LocalizationToggle/LocalizationToggle';
import Logo from '../../components/Logo/Logo';
import LogOutBtn from '../../components/LogOutBtn/LogOutBtn';

const Header = (): JSX.Element => {
  return (
    <header className="text-left bg-gray-100 text-gray-600">
      <div className="flex justify-between container mx-auto py-10">
        <Logo />
        <AddBoardBtn />
        <LogOutBtn />
        {/*user.icon
        edit profile */}
        <LocalizationToggle />
      </div>
    </header>
  );
};

export default Header;
