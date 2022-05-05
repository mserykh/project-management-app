import logo from '../../assets/images/logo.svg';

const Logo = (): JSX.Element => {
  return (
    <div>
      <img src={logo} alt="Application logo" />
      <span>ALLDONE</span>
    </div>
  );
};

export default Logo;
