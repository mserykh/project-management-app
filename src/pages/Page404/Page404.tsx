import { NavLink } from 'react-router-dom';

import WarningIcon from '../../assets/images/warning.svg';

function Page404(): JSX.Element {
  return (
    <div className="relative bg-gradient-to-b from-[#1AD993] to-[#503AE7] h-screen flex flex-col justify-center items-center">
      <div className="routes-container">
        <NavLink
          to={'/'}
          className="font-bold text-center text-xl py-[10px] px-[32px] bg-[#096CFE] text-white rounded-[25px] rounded-tr-none"
        >
          Go to Home page
        </NavLink>
      </div>
      <img
        className="2xs:w-[100px] md:w-[200px] 2xs:mb-[30px] md:mb-[60px]"
        src={WarningIcon}
        alt="warning"
      />
      <h3 className="text-center font-heading text-7xl">Error 404</h3>
      <h4 className="text-center font-heading text-4xl">The requested url wasnt found!</h4>
    </div>
  );
}

export default Page404;
