import logo from '../../assets/images/logo.svg';

type LogoProps = {
  isScrolling: boolean;
  isBoardPage: boolean;
};

const Logo = ({ isScrolling, isBoardPage }: LogoProps): JSX.Element => {
  return (
    <div className="logo">
      <img
        className="shrink-0 h-11 xs:w-14 w-10 max-w-none"
        src={logo}
        alt="Application logo"
        id="app_logo"
      />
      {!(isScrolling || isBoardPage) && (
        <span className="hidden sm:block logo__text transition-all">ALLDONE</span>
      )}
    </div>
  );
};

export default Logo;
