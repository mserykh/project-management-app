import React from 'react';
import UserEditForm from '../../components/UserEditForm/UserEditForm';

function ProfileEditPage(): JSX.Element {
  return (
    <main className="container mx-auto">
      <section className="p-3 sm:p-6 grid grid-rows-columns gap-x-2 gap-y-6 mx-auto">
        <h2 className="section__title">User Profile</h2>
        <h3 className="section__description">Edit user profile</h3>
        <div className="flex flex-col">
          <UserEditForm />
        </div>
      </section>
    </main>
  );
}

export default ProfileEditPage;
