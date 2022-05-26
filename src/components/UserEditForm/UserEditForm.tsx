import React, { useContext, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { ToastContext } from '../../contexts/ToastContext';
import { getUserData, updateUser } from './UserEditAction';
import { useAppSelector } from '../../redux/hooks';
import Modal from '../Modal/Modal';
import FormElement from '../FormElements/FormElement';
import ConfirmDeleteModalWindow from '../ConfirmDeleteModalWindow/ConfirmDeleteModalWindow';
import Button from '../Button/Button';

const UserEditForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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

  const token = useAppSelector((state) => state.globalStateReducer.token);
  const userId = useAppSelector((state) => state.userReducer.user?.id);
  const { dispatch: toastDispatch } = useContext(ToastContext);

  const formSubmitHandler: SubmitHandler<FieldValues> = async (values) => {
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

    switch (resStatus) {
      case 200:
        toastDispatch({ type: 'SUCCESS', payload: 'User successfully updated' });
        break;
      case 404:
        toastDispatch({ type: 'ERROR', payload: `User wasn't founded!, update` });
        break;
      default:
        return;
    }
    reset();
  };

  return (
    <>
      <Button className="button--delete-profile" type="button" onClick={handleClickDelete}>
        Delete Profile
      </Button>
      <form
        className="grid grid-cols-2 grid-rows-3 gap-4"
        onSubmit={handleSubmit(formSubmitHandler)}
      >
        <FormElement
          type="text"
          label="New username"
          labelColor="#AA9BFF"
          placeholder="Min. 8 characters"
          errorText="The length of password should be more than eight characters!"
          hasError={errors?.userName}
          inputData={register('userName', {
            minLength: 8,
          })}
          labelClassName="text-primaryPurple"
        />
        <FormElement
          type="text"
          label="New name"
          labelColor="#AA9BFF"
          placeholder="Min. 5 characters"
          errorText="The length of password should be more than five characters!"
          hasError={errors?.name}
          inputData={register('name', {
            minLength: 5,
          })}
          labelClassName="text-primaryPurple"
        />
        <FormElement
          type="password"
          label="password"
          placeholder="Min. 8 characters"
          labelColor="#AA9BFF"
          errorText={'The length of password should be more than eight characters!'}
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
        >
          Update profile
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
