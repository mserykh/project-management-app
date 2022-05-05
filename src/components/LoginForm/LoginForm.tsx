import React from 'react';
import FormElement from './FormElement';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

const LoginForm = () => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });

  const isSubmitDisabled = !isDirty || Object.keys(errors).length > 0;

  const formSubmitHandler: SubmitHandler<FieldValues> = () => {
    reset();
  };

  return (
    <form onSubmit={handleSubmit(formSubmitHandler)}>
      <FormElement
        type="text"
        label="Username"
        placeholder="John-Doe"
        errorText={'The length of full name should be more than three characters!'}
        hasError={errors?.username}
        inputData={register('username', {
          required: true,
          minLength: 8,
        })}
      />
      <FormElement
        type="text"
        label="Password"
        placeholder="Min. 8 characters"
        errorText={'The length of full name should be more than three characters!'}
        hasError={errors?.password}
        inputData={register('password', {
          required: true,
          minLength: 8,
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
