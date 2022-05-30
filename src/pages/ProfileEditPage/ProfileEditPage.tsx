import React from 'react';
import { useTranslation } from 'react-i18next';
import UserEditForm from '../../components/UserEditForm/UserEditForm';
import { useAppSelector } from '../../redux/hooks';

function ProfileEditPage(): JSX.Element {
  const { t } = useTranslation();

  const userName = useAppSelector((state) => state.userReducer.user?.login);

  return (
    <main className="container mx-auto">
      <section className="p-3 sm:p-6 grid grid-rows-columns gap-x-2 gap-y-6 mx-auto">
        <h2 className="section__title">{t('_LBL_PROFILE_')}</h2>
        <h3 className="section__description">{`${t('_LBL_YOUR_USERNAME_')}: ${userName}`}</h3>
        <div className="flex flex-col">
          <UserEditForm />
        </div>
      </section>
    </main>
  );
}

export default ProfileEditPage;
