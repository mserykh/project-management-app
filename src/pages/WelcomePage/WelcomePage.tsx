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
import { useTranslation } from 'react-i18next';

function WelcomePage(): JSX.Element {
  const userIsAuthenticated = useAppSelector((state) => state.userReducer.isAuthenticated);
  const { t } = useTranslation();

  return (
    <main>
      <section className="welcome">
        <div className="container py-12 mx-auto">
          <div className="welcome__buttons">
            {!userIsAuthenticated && (
              <>
                {' '}
                <NavLink
                  to={'/login'}
                  className="font-semibold text-center text-l py-3 px-8 text-white rounded-full rounded-br-none hover:text-primaryBlue"
                >
                  {t('_BTN_SIGN_IN_')}
                </NavLink>
                <NavLink
                  to={'/signup'}
                  className="font-semibold text-center text-l py-3 px-8 bg-primaryBlue text-white rounded-full rounded-tr-none hover:bg-white hover:text-primaryBlue"
                >
                  {t('_BTN_SIGN_UP_')}
                </NavLink>
              </>
            )}
            {userIsAuthenticated && (
              <NavLink
                to={'/main'}
                className="font-semibold text-center text-l py-3 px-8 bg-primaryBlue text-white rounded-full rounded-tr-none hover:bg-white hover:text-primaryBlue"
              >
                {t('_BTN_TO_MAIN_PAGE_')}
              </NavLink>
            )}
          </div>
          <div className="welcome__container">
            <h1 className="welcome__title">{t('_LBL_MAIN_LEAD_')}</h1>
            <ul className="welcome__cards">
              <li className="welcome__card">
                <div className="welcome__card-container">
                  <h4 className="welcome__card-title">{t('_LBL_MAIN_FEATURES_')}</h4>
                  <p className="welcome__card-text">
                    Lörem ipsum fogyr nism syledes den intravalig tet. Geosade exos dint.
                    Närvaropeng öjins. Syskade alogi nära. Oling rer, oaktat odat i ningen tills
                    bejide. Kanade nyskapet.
                  </p>
                </div>
                <img alt="icon" src={AppFeatIcon} className="welcome__card-img" />
              </li>
              <li className="welcome__card">
                <img alt="icon" src={AboutIcon} className="welcome__card-img" />
                <div className="welcome__card-container">
                  <h4 className="welcome__card-title">{t('_LBL_MAIN_ABOUT_COURSE_')}</h4>
                  <p className="welcome__card-text">
                    Lörem ipsum fogyr nism syledes den intravalig tet. Geosade exos dint.
                    Närvaropeng öjins. Syskade alogi nära. Oling rer, oaktat odat i ningen tills
                    bejide. Kanade nyskapet.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="our-team">
        <div className="container mx-auto">
          <div className="our-team__container">
            <h2 className="our-team__title">{t('_LBL_OUR_TEAM_')}</h2>
            <ul className="our-team__members-container">
              <li className="our-team__member">
                <div className="our-team__member-img-wrapper bg-primaryGreen 2xs:rounded-tr-none">
                  <img alt="icon" src={MemberIcon} className="our-team__member-img" />
                </div>
                <h4 className="our-team__member-title">Sergei Mangilev</h4>
                <p className="our-team__member-text">Team lead, Front-End Developer</p>
                <div className="our-team__socials">
                  <a href="https://github.com/ssmangilev" className="our-team__social">
                    <img alt="icon" src={SmallGithubGrIcon} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/sergei-mangilev"
                    className="our-team__social"
                  >
                    <img alt="icon" src={SmallLinkedinGrIcon} />
                  </a>
                </div>
              </li>
              <li className="our-team__member">
                <div className="our-team__member-img-wrapper bg-primaryBlue 2xs:rounded-br-none">
                  <img alt="icon" src={MemberIcon} className="our-team__member-img" />
                </div>
                <h4 className="our-team__member-title">Marie Serykh</h4>
                <p className="our-team__member-text">Front-End Developer</p>
                <div className="our-team__socials">
                  <a href="https://github.com/mserykh" className="our-team__social">
                    <img alt="icon" src={SmallGithubBlIcon} />
                  </a>
                  <a href="https://www.linkedin.com/in/mariaserykh/" className="our-team__social">
                    <img alt="icon" src={SmallLinkedinBlIcon} />
                  </a>
                </div>
              </li>
              <li className="our-team__member">
                <div className="our-team__member-img-wrapper bg-primaryViolet 2xs:rounded-tl-none">
                  <img alt="icon" src={MemberIcon} className="our-team__member-img" />
                </div>
                <h4 className="our-team__member-title">Muhammed Abdrahman</h4>
                <p className="our-team__member-text">Front-End Developer</p>
                <div className="our-team__socials">
                  <a href="https://github.com/muhammed03" className="our-team__social">
                    <img alt="icon" src={SmallGithubPrIcon} />
                  </a>
                  <a href="https://github.com/muhammed03" className="our-team__social">
                    <img alt="icon" src={SmallLinkedinPrIcon} />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

export default WelcomePage;
