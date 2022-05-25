import React, { useContext } from 'react';
import FormElement from '../FormElements/FormElement';
import { ToastContext } from '../../contexts/ToastContext';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { registerUser } from '../../redux/user/actions';
import { useNavigate } from 'react-router';
import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';

interface SignUpFormProps {
  labelColor: string;
}

const SignUpForm = ({ labelColor }: SignUpFormProps) => {
  const { dispatch: toastDispatch } = useContext(ToastContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });

  const formSubmitHandler: SubmitHandler<FieldValues> = async (values) => {
    const userData = { name: values.name, login: values.username, password: values.password };
    const res = await registerUser(userData);
    if (res.status === 201) {
      toastDispatch({
        type: 'SUCCESS',
        payload: t('_TOAST_USER_CREATED_'),
      });
      reset();
      navigate('/login');
    } else {
      toastDispatch({
        type: 'ERROR',
        payload: t('_ERR_USER_EXISTS_'),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(formSubmitHandler)} className="form">
      <FormElement
        type="text"
        label={t('_LBL_NAME_')}
        labelColor={labelColor}
        placeholder="John doe"
        hasError={errors?.name}
        inputData={register('name', {
          required: t('_LBL_NAME_PLACEHOLDER_'),
          minLength: 5,
        })}
        errorText={t('_ERR_NAME_LENGTH_')}
        labelClassName={`text-${labelColor}`}
      />
      <FormElement
        type="text"
        label={t('_LBL_USERNAME_')}
        labelColor={labelColor}
        placeholder="John-Doe_01"
        errorText={t('_ERR_USERNAME_LENGTH_')}
        hasError={errors?.username}
        inputData={register('username', {
          required: true,
          minLength: 5,
        })}
        labelClassName={`text-${labelColor}`}
      />
      <FormElement
        type="password"
        label={t('_LBL_PASSWORD_')}
        labelColor={labelColor}
        placeholder={t('_LBL_PASSWORD_PLACEHOLDER_')}
        errorText={t('_ERR_PASSWORD_LENGTH_')}
        hasError={errors?.password}
        inputData={register('password', {
          required: true,
          minLength: 8,
        })}
        labelClassName={`inline-block text-base text-${labelColor} float-left mb-3 font-semibold`}
      />
      <Button className="button--signup" type="submit">
        {t('_BTN_SIGN_UP_')}
      </Button>
    </form>
  );
};

export default SignUpForm;
