import React, { useState } from 'react';
import FormElement from '../FormElements/FormElement';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { registerUser } from '../../redux/user/actions';
import ErrorMessageLabel from '../FormElements/ErrorMessageLabel';

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
  const [hasError, setError] = useState(false);

  const formSubmitHandler: SubmitHandler<FieldValues> = async (values) => {
    const userData = { name: values.name, login: values.username, password: values.password };
    const res = await registerUser(userData);
    console.log(res);
    if (res.status === 201) {
      reset();
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(formSubmitHandler)}>
      <FormElement
        type="text"
        label="name"
        labelColor={labelColor}
        placeholder="John doe"
        hasError={errors?.email}
        inputData={register('name', {
          required: 'Enter your name',
          minLength: 5,
        })}
        errorText={'The number of characters must be more than five'}
      />
      <FormElement
        type="text"
        label="Username"
        labelColor={labelColor}
        placeholder="John-Doe_01"
        errorText={'The length of username should be more than five characters!'}
        hasError={errors?.username}
        inputData={register('username', {
          required: true,
          minLength: 5,
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
      {hasError && <ErrorMessageLabel>The user already exist</ErrorMessageLabel>}
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
