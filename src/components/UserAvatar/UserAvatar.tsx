import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import user_icon from '../../assets/images/user_icon.svg';
import user_options from '../../assets/images/user_options.svg';
import { useState } from 'react';
import Button from '../Button/Button';
import { useNavigate } from 'react-router';
import { logoutUser } from '../../redux/user/actions';
import { useTranslation } from 'react-i18next';

const UserAvatar = (): JSX.Element => {
  const username = useAppSelector((state) => state.userReducer.user?.login);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = (): void => {
    setIsOpen(() => !isOpen);
  };

  const dropdownItems = (
    <>
      <Button
        onClick={() => {
          navigate('/profile-edit');
        }}
        type="button"
        className="button--dropdown"
      >
        {t('edit_profile_btn')}
      </Button>
      <Button
        onClick={() => {
          dispatch(logoutUser());
          navigate('/');
        }}
        type="button"
        className="button--dropdown button--logout"
      >
        {t('log_out_btn')}
      </Button>
    </>
  );

  return (
    <div className="dropdown">
      <div className="flex gap-2 items-center">
        <img src={user_icon} alt="" />
        <span className="hidden sm:block header__user">{username}</span>
        <img
          onClick={handleClick}
          className="p-2 cursor-pointer hover:bg-off-white hover:rounded-full"
          src={user_options}
          alt=""
        />
      </div>
      {isOpen && <ul className="dropdown__content">{dropdownItems}</ul>}{' '}
    </div>
  );
};

export default UserAvatar;
