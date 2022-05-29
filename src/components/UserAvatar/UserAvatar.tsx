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
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);

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
          setIsOpen(() => !isOpen);
        }}
        type="button"
        className="button--dropdown"
      >
        {t('_BTN_EDIT_PROFILE_')}
      </Button>
      <Button
        onClick={() => {
          dispatch(logoutUser());
          setIsOpen(() => !isOpen);
        }}
        type="button"
        className="button--dropdown button--logout"
      >
        {t('_BTN_LOGOUT_')}
      </Button>
    </>
  );

  return (
    <div className="dropdown ml-auto xs:ml-0">
      <div className="flex gap-2 items-center">
        <img className={`${isOpen ? 'filter--violet' : ''}`} src={user_icon} alt="" />
        <img
          onClick={handleClick}
          className="p-2 cursor-pointer hover:bg-off-white hover:rounded-full"
          src={user_options}
          alt=""
        />
      </div>
      {isOpen && (
        <ul className="dropdown__content translate-x-2/4 xs:translate-x-0">{dropdownItems}</ul>
      )}{' '}
    </div>
  );
};

export default UserAvatar;
