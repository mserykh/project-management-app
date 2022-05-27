import React, { useContext, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { ToastContext } from '../../contexts/ToastContext';
import { getUserData, updateUser } from './UserEditAction';
import { useAppSelector } from '../../redux/hooks';
import Modal from '../Modal/Modal';
import FormElement from '../FormElements/FormElement';
import ConfirmDeleteModalWindow from '../ConfirmDeleteModalWindow/ConfirmDeleteModalWindow';
import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';
import MiniLoader from '../../components/Loader/MiniLoader';

const UserEditForm: React.FC = () => {
  const token = useAppSelector((state) => state.globalStateReducer.token);
  const userId = useAppSelector((state) => state.userReducer.user?.id);
  const { dispatch: toastDispatch } = useContext(ToastContext);
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);

  const handleModalOnclose = (): void => {
    setIsModalOpen(false);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onSubmit',
  });

  const handleClickDelete = () => {
    setIsModalOpen(true);
  };

  const formSubmitHandler: SubmitHandler<FieldValues> = async (values) => {
    setLoading(true);
    const userData = await getUserData(token, userId);
    const userName = values.userName === '' ? userData.login : values.userName;
    const name = values.name === '' ? userData.name : values.name;
    const password = values.password;
    const userUpdateData = {
      login: userName,
      name,
      password,
    };

    const resStatus = await updateUser(userId, userUpdateData, token);
    setLoading(false);

    switch (resStatus) {
      case 200:
        toastDispatch({ type: 'SUCCESS', payload: t('_TOAST_USER_UPDATED_') });
        break;
      case 404:
        toastDispatch({ type: 'ERROR', payload: t('_ERR_USER_NOT_UPDATED_') });
        break;
      default:
        return;
    }
    reset();
  };

  return (
    <>
      <Button className="button--delete-profile" type="button" onClick={handleClickDelete}>
        {t('_BTN_DELETE_PROFILE_')}
      </Button>
      <form
        className="grid grid-cols-2 grid-rows-3 gap-4"
        onSubmit={handleSubmit(formSubmitHandler)}
      >
        <FormElement
          type="text"
          label={t('_LBL_NEW_USERNAME_')}
          labelColor="#AA9BFF"
          placeholder={t('_LBL_5_CHARACHTERS_PLACEHOLDER_')}
          errorText={t('_ERR_USERNAME_LENGTH_')}
          hasError={errors?.userName}
          inputData={register('userName', {
            minLength: 8,
          })}
          labelClassName="text-primaryPurple"
        />
        <FormElement
          type="text"
          label={t('_LBL_NEW_NAME_')}
          labelColor="#AA9BFF"
          placeholder={t('_LBL_5_CHARACHTERS_PLACEHOLDER_')}
          errorText={t('_ERR_NAME_LENGTH_')}
          hasError={errors?.name}
          inputData={register('name', {
            minLength: 5,
          })}
          labelClassName="text-primaryPurple"
        />
        <FormElement
          type="password"
          label={t('_LBL_PASSWORD_')}
          placeholder={t('_LBL_PASSWORD_PLACEHOLDER_')}
          labelColor="#AA9BFF"
          errorText={t('_ERR_PASSWORD_LENGTH_')}
          hasError={errors?.password}
          inputData={register('password', {
            minLength: 8,
            required: true,
          })}
          labelClassName="text-primaryPurple"
        />
        <Button
          className="button--column row-start-3 row-end-4 col-start-2 col-end-3 ml-auto"
          type="submit"
          isDisabled={loading}
        >
          {t('_BTN_UPDATE_PROFILE_')}
          {loading && <MiniLoader />}
        </Button>
      </form>
      {isModalOpen && (
        <Modal onClose={handleModalOnclose}>
          <ConfirmDeleteModalWindow
            id={userId ? userId : ''}
            title={'profile'}
            type="user"
            onClose={handleModalOnclose}
          />
        </Modal>
      )}
    </>
  );
};

export default UserEditForm;
