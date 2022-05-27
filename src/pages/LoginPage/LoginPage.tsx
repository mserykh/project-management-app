import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import Logo from '../../components/Logo/Logo';

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <section className="grid md:h-m l:h-l md:grid-cols-2 gap-6 md:gap-0">
      <div className="flex flex-col content-center justify-center max-h-columns">
        <div className="w-full max-w-input ml-auto mr-auto">
          <div className="mb-6">
            <h2 className="section__title text-primaryViolet">{t('_BTN_SIGN_IN_')}</h2>
          </div>
          <LoginForm labelColor="primaryViolet" />
          <span className="block text-left text-large">
            {t('_LBL_NOT_REGISTERED_')}&nbsp;
            <NavLink to="/signup" className="text-primaryViolet font-semibold">
              {t('_LINK_CREATE_ACCOUNT_')}
            </NavLink>
          </span>
        </div>
      </div>
      <div className="bg-gradient-to-b from-primaryViolet to-primaryPurple flex flex-col justify-center items-center gap-6 md:gap-10 p-6">
        <div className="bg-white px-6 py-6  md:px-14 md:py-10 rounded max-w-full">
          <Logo isScrolling={false} isBoardPage={false} />
        </div>
        <div className="text-center section__title text-white">
          <p>{t('_LBL_GET_ALL_DONE_')}</p>
          <p>{t('_LBL_EASILY_')}</p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
