import React, { useContext } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { ToastContext } from '../../contexts/ToastContext';
import EditFormElement from '../FormElements/EditFormElement';
import FormElement from '../FormElements/FormElement';

const LoginForm: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onSubmit',
  });

  const { dispatch: toastDispatch } = useContext(ToastContext);

  const formSubmitHandler: SubmitHandler<FieldValues> = async (values) => {
    const userData = {};
  };

  return (
    <form className="grid grid-cols-2 gap-2" onSubmit={handleSubmit(formSubmitHandler)}>
      <EditFormElement
        type="text"
        label="New username"
        placeholder="Min. 8 characters"
        errorText="The length of password should be more than eight characters!"
        hasError={errors?.userName}
        inputData={register('userName', {
          required: true,
          minLength: 8,
        })}
      />
      <EditFormElement
        type="text"
        label="New name"
        placeholder="Min. 6 characters"
        errorText="The length of password should be more than five characters!"
        hasError={errors?.name}
        inputData={register('name', {
          required: true,
          minLength: 5,
        })}
      />
      <EditFormElement
        type="password"
        label="password"
        placeholder="Min. 8 characters"
        errorText={'The length of password should be more than eight characters!'}
        hasError={errors?.password}
        inputData={register('password', {
          required: true,
          minLength: 8,
        })}
      />
    </form>
  );
};

export default LoginForm;
