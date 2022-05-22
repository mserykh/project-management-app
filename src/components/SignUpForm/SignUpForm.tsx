import React, { useContext } from 'react';
import FormElement from '../FormElements/FormElement';
import { ToastContext } from '../../contexts/ToastContext';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { registerUser } from '../../redux/user/actions';
import { useNavigate } from 'react-router';

interface SignUpFormProps {
  labelColor: string;
}

const SignUpForm = ({ labelColor }: SignUpFormProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });
  const { dispatch: toastDispatch } = useContext(ToastContext);
  const navigate = useNavigate();

  const formSubmitHandler: SubmitHandler<FieldValues> = async (values) => {
    const userData = { name: values.name, login: values.username, password: values.password };
    const res = await registerUser(userData);
    if (res.status === 201) {
      toastDispatch({
        type: 'SUCCESS',
        payload: 'User has been successfully created',
      });
      reset();
      navigate('/login');
    } else {
      toastDispatch({
        type: 'ERROR',
        payload: 'User already exist',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(formSubmitHandler)}>
      <FormElement
        type="text"
        label="name"
        labelColor={labelColor}
        placeholder="John doe"
        hasError={errors?.name}
        inputData={register('name', {
          required: 'Enter your name',
          minLength: 5,
        })}
        errorText={'The number of characters must be more than five!'}
        containerClassName="w-full m-0 float-left  mb-[25px]"
        inputClassName="border w-full text-base border-solid border-[#AFB0B9] rounded-[999px] pl-23 focus:outline-0 pl-[24px] py-[11px]"
        labelClassName={`inline-block text-base text-[${labelColor}] float-left mb-[12px] font-semibold`}
      />
      <FormElement
        type="text"
        label="Username"
        labelColor={labelColor}
        placeholder="John-Doe_01"
        errorText={'The number of characters must be more than five!'}
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
        label="Password"
        labelColor={labelColor}
        placeholder="Min. 8 characters"
        errorText={'The number of characters must be more than eight!'}
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
        className="px-[172px] py-[12px] bg-[#096CFE] text-white text-xl rounded-3xl rounded-tr-none font-semibold mb-[24px]"
        type="submit"
      >
        Sign In
      </button>
    </form>
  );
};

export default SignUpForm;
