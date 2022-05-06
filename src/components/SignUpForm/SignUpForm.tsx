import React from 'react';
import FormElement from '../FormElements/FormElement';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

interface SignUpFormProps {
  labelColor: string;
}

const SignUpForm = ({ labelColor }: SignUpFormProps) => {
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
        type="email"
        label="Email"
        labelColor={labelColor}
        placeholder="mail@simmmple.com"
        hasError={errors?.email}
        inputData={register('email', {
          required: 'Enter your e-mail',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: 'Enter a valid e-mail address',
          },
        })}
        errorText={'Enter a valid e-mail address'}
      />
      <FormElement
        type="text"
        label="Username"
        labelColor={labelColor}
        placeholder="John-Doe"
        errorText={'The length of full name should be more than three characters!'}
        hasError={errors?.username}
        inputData={register('username', {
          required: true,
          minLength: 8,
        })}
      />
      <FormElement
        type="password"
        label="Password"
        labelColor={labelColor}
        placeholder="Min. 8 characters"
        errorText={'The length of full name should be more than three characters!'}
        hasError={errors?.password}
        inputData={register('password', {
          required: true,
          minLength: 8,
        })}
      />
      <button
        className="px-[172px] py-[12px] bg-[#096CFE] text-white text-xl rounded-3xl rounded-tr-none font-semibold mb-[24px]"
        type="submit"
        disabled={isSubmitDisabled}
      >
        Sign In
      </button>
    </form>
  );
};

export default SignUpForm;
