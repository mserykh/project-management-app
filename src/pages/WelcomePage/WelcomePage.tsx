import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

import AppFeatIcon from '../../assets/images/app_feat.svg';
import AboutIcon from '../../assets/images/about.svg';
import MemberIcon from '../../assets/images/github-large.svg';
import SmallGithubGrIcon from '../../assets/images/github-small-1.svg';
import SmallGithubBlIcon from '../../assets/images/github-small-2.svg';
import SmallGithubPrIcon from '../../assets/images/github-small-3.svg';
import SmallLinkedinGrIcon from '../../assets/images/linkedin-small-1.svg';
import SmallLinkedinBlIcon from '../../assets/images/linkedin-small-2.svg';
import SmallLinkedinPrIcon from '../../assets/images/linkedin-small-3.svg';

function WelcomePage(): JSX.Element {
  const userIsAuthenticated = useAppSelector((state) => state.userReducer.isAuthenticated);

  return (
    <main className="h-auto p-0 relative">
      <div className="welcome">
        <div className="routes-container">
          {!userIsAuthenticated && (
            <>
              {' '}
              <NavLink
                to={'/login'}
                className="2xs:mr-[20px] md:mr-[42px] font-bold text-center text-xl py-[10px] px-[32px] bg-[#832BC1] text-white rounded-[25px] rounded-br-none"
              >
                Log In
              </NavLink>
              <NavLink
                to={'/signup'}
                className="font-bold text-center text-xl py-[10px] px-[32px] bg-[#096CFE] text-white rounded-[25px] rounded-tr-none"
              >
                Sign Up
              </NavLink>
            </>
          )}
          {userIsAuthenticated && (
            <NavLink
              to={'/main'}
              className="font-bold text-center text-xl py-[10px] px-[32px] bg-[#096CFE] text-white rounded-[25px] rounded-tr-none"
            >
              Go to Main page
            </NavLink>
          )}
        </div>
        <div className="welcome__container">
          <h1 className="welcome__title">New approach to handle your tasks and projects</h1>
          <div className="welcome__card">
            <div className="welcome__card-container">
              <h4 className="welcome__card-title">Application features</h4>
              <p className="welcome__card-text">
                Lörem ipsum fogyr nism syledes den intravalig tet. Geosade exos dint. Närvaropeng
                öjins. Syskade alogi nära. Oling rer, oaktat odat i ningen tills bejide. Kanade
                nyskapet.{' '}
              </p>
            </div>
            <img alt="icon" src={AppFeatIcon} className="welcome__card-img" />
          </div>
          <div className="welcome__card">
            <img alt="icon" src={AboutIcon} className="welcome__card-img" />
            <div className="welcome__card-container">
              <h4 className="welcome__card-title">About react course</h4>
              <p className="welcome__card-text">
                Lörem ipsum fogyr nism syledes den intravalig tet. Geosade exos dint. Närvaropeng
                öjins. Syskade alogi nära. Oling rer, oaktat odat i ningen tills bejide. Kanade
                nyskapet.{' '}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="our-team">
        <div className="our-team__container">
          <h2 className="our-team__title">Our team</h2>
          <div className="our-team__members-container">
            <div className="our-team__member">
              <div className="our-team__member-img-wrapper bg-[#1AD993] 2xs:rounded-tr-none">
                <img alt="icon" src={MemberIcon} className="our-team__member-img" />
              </div>
              <h4 className="our-team__member-title">Sergei Mangilev</h4>
              <p className="our-team__member-text">
                Lörem ipsum fogyr nism syledes den intravalig tet. Geosade exos dint. Närvaropeng
                öjins.
              </p>
              <div className="our-team__socials">
                <a className="our-team__social">
                  <img alt="icon" src={SmallGithubGrIcon} />
                </a>
                <a className="our-team__social">
                  <img alt="icon" src={SmallLinkedinGrIcon} />
                </a>
              </div>
            </div>
            <div className="our-team__member">
              <div className="our-team__member-img-wrapper bg-[#096CFE] 2xs:rounded-br-none">
                <img alt="icon" src={MemberIcon} className="our-team__member-img" />
              </div>
              <h4 className="our-team__member-title">Marie Serykh</h4>
              <p className="our-team__member-text">
                Lörem ipsum fogyr nism syledes den intravalig tet. Geosade exos dint. Närvaropeng
                öjins.
              </p>
              <div className="our-team__socials">
                <a className="our-team__social">
                  <img alt="icon" src={SmallGithubBlIcon} />
                </a>
                <a className="our-team__social">
                  <img alt="icon" src={SmallLinkedinBlIcon} />
                </a>
              </div>
            </div>
            <div className="our-team__member">
              <div className="our-team__member-img-wrapper bg-[#832BC1] 2xs:rounded-tl-none">
                <img alt="icon" src={MemberIcon} className="our-team__member-img" />
              </div>
              <h4 className="our-team__member-title">Muhammed Abdrahman</h4>
              <p className="our-team__member-text">
                Lörem ipsum fogyr nism syledes den intravalig tet. Geosade exos dint. Närvaropeng
                öjins.
              </p>
              <div className="our-team__socials">
                <a className="our-team__social">
                  <img alt="icon" src={SmallGithubPrIcon} />
                </a>
                <a className="our-team__social">
                  <img alt="icon" src={SmallLinkedinPrIcon} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default WelcomePage;
