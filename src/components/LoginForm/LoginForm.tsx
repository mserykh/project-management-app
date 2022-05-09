import React from 'react';
import FormElement from '../FormElements/FormElement';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../redux/hooks';
import { signIn } from '../../redux/user/actions';
import { useNavigate } from 'react-router';

interface LoginFormProps {
  labelColor: string;
}

const LoginForm = ({ labelColor }: LoginFormProps) => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isSubmitDisabled = !isDirty || Object.keys(errors).length > 0;

  const formSubmitHandler: SubmitHandler<FieldValues> = (values) => {
    const userData = { login: values.username, password: values.password };
    dispatch(signIn(userData));
    navigate('');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(formSubmitHandler)}>
      <FormElement
        type="text"
        label="username"
        labelColor={labelColor}
        placeholder="John-Doe"
        errorText={'The length of full name should be more than five characters!'}
        hasError={errors?.username}
        inputData={register('username', {
          required: true,
        })}
      />
      <FormElement
        type="password"
        label="password"
        labelColor={labelColor}
        placeholder="Min. 5 characters"
        errorText={'The length of password should be more than eight characters!'}
        hasError={errors?.password}
        inputData={register('password', {
          required: true,
        })}
      />
      <button
        className="px-[172px] py-[12px] bg-[#832BC1] text-white text-xl rounded-3xl rounded-tr-none font-semibold mb-[24px]"
        type="submit"
        disabled={isSubmitDisabled}
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
