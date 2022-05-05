import logo from '../../assets/images/logo.svg';

type LogoProps = {
  isScrolling: boolean;
};

const Logo = ({ isScrolling }: LogoProps): JSX.Element => {
  return (
    <div>
      <img src={logo} alt="Application logo" />
      {!isScrolling && <span className="transition-all">ALLDONE</span>}
    </div>
  );
};

export default Logo;
