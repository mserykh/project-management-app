import React from 'react';
import UserEditForm from '../../components/UserEditForm/UserEditForm';

function ProfileEditPage(): JSX.Element {
  return (
    <div className="pt-[50px] pl-[82px]">
      <h3 className="text-5xl">User Profile</h3>
      <div className="pt-[36px] flex flex-col">
        <h4>Edit user profile</h4>
        <UserEditForm />
      </div>
    </div>
  );
}

export default ProfileEditPage;
