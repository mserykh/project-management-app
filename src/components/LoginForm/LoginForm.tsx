import React, { useContext } from 'react';
import FormElement from '../FormElements/FormElement';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../redux/hooks';
import { ToastContext } from '../../contexts/ToastContext';
import { signIn } from '../../redux/user/actions';
import { useNavigate } from 'react-router';
import store from '../../redux/store';

interface LoginFormProps {
  labelColor: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ labelColor }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { dispatch: toastDispatch } = useContext(ToastContext);

  const formSubmitHandler: SubmitHandler<FieldValues> = async (values) => {
    const userData = { login: values.username, password: values.password };
    await dispatch(signIn(userData));
    const isAuthenticated = store.getState().userReducer.isAuthenticated;
    if (isAuthenticated) {
      navigate('/');
      reset();
    } else {
      toastDispatch({ type: 'ERROR', payload: `Username or password didn't matched` });
    }
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
          minLength: 5,
        })}
        containerClassName="w-full m-0 float-left  mb-[25px]"
        inputClassName="border w-full text-base border-solid border-[#AFB0B9] rounded-[999px] pl-23 focus:outline-0 pl-[24px] py-[11px]"
        labelClassName={`inline-block text-base text-[${labelColor}] float-left mb-[12px] font-semibold`}
      />
      <FormElement
        type="password"
        label="password"
        labelColor={labelColor}
        placeholder="Min. 8 characters"
        errorText={'The length of password should be more than eight characters!'}
        hasError={errors?.password}
        inputData={register('password', {
          required: true,
          minLength: 8,
        })}
        containerClassName="w-full m-0 float-left  mb-[25px]"
        inputClassName="border w-full text-base border-solid border-[#AFB0B9] rounded-[999px] pl-23 focus:outline-0 pl-[24px] py-[11px]"
        labelClassName={`inline-block text-base text-[${labelColor}] float-left mb-[12px] font-semibold`}
      />
      <button
        className="px-[172px] py-[12px] bg-[#832BC1] text-white text-xl rounded-3xl rounded-tr-none font-semibold mb-[24px]"
        type="submit"
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
