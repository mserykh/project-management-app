import { NavLink, useNavigate } from 'react-router-dom';
import { useScroll } from '../../hooks/useScroll';
import Button from '../../components/Button/Button';
import LanguageToggle from '../../components/LanguageToggle/LanguageToggle';
import Logo from '../../components/Logo/Logo';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import globalStateSlice from '../../redux/reducers/globalStateSlice';
import { useAppSelector } from '../../redux/hooks';
import Modal from '../../components/Modal/Modal';
import FormElement from '../../components/FormElements/FormElement';
import { useForm } from 'react-hook-form';
import createBoard from '../../redux/actions/board';

interface FormInput {
  boardTitle: string;
}

const Header = (): JSX.Element => {
  const { t } = useTranslation();
  const isScrolling = useScroll();

  const { userId, token } = useAppSelector((state) => state.stateReducer);
  const dispatch = useDispatch();
  const { logout } = globalStateSlice.actions;
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', token);
  }, [userId, token]);

  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const {
    register,
    reset,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });

  const formSubmitHandler = (data: FormInput): void => {
    createBoard(data.boardTitle);
    reset();
    setIsModalOpened(false);
  };

  const handleOnClose = (): void => {
    reset();
    setIsModalOpened(false);
  };

  const isSubmitDisabled = !isDirty || Object.keys(errors).length > 0;

  const AuthorisedButtons = (): JSX.Element => {
    if (userId && token) {
      return (
        <>
          <Button
            onClick={() => setIsModalOpened(true)}
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            {t('add_board_btn')}
          </Button>
          <Modal isOpened={isModalOpened} onClose={handleOnClose}>
            <form onSubmit={handleSubmit(formSubmitHandler)}>
              <FormElement
                type="text"
                label="Add board title"
                labelColor={'black'}
                placeholder="Please enter the board title"
                errorText={'The title should contain at lease 1 character'}
                hasError={errors?.boardTitle}
                inputData={register('boardTitle', {
                  required: true,
                  minLength: 1,
                })}
              />
              <Button
                className="bg-blue-500 hover:bg-blue-700 disabled:bg-grey-100 text-white font-bold py-2 px-4 rounded-full"
                type="submit"
                disabled={isSubmitDisabled}
              >
                Create board
              </Button>
            </form>
          </Modal>
          <UserAvatar />
          <Button
            onClick={() => {
              dispatch(logout());
              navigate('/');
            }}
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            {t('log_out_btn')}
          </Button>
          <Button
            onClick={() => {
              console.log('clicked edit');
              // dispatch({type: PROFILE.EDIT});
            }}
            type="button"
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full"
          >
            {t('edit_profile_btn')}
          </Button>
        </>
      );
    }
    return <></>;
  };

  return (
    <header
      className={`sticky top-0 text-left bg-white text-gray-600 z-999 transition-all${
        isScrolling ? ' shadow' : 'shadow-none'
      }`}
    >
      <div className="flex justify-between container mx-auto py-10">
        <NavLink to="/">
          <Logo isScrolling={isScrolling} />
        </NavLink>
        <AuthorisedButtons />
        <LanguageToggle />
      </div>
    </header>
  );
};

export default Header;
