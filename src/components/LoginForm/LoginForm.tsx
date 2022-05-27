import React, { useContext, useState } from 'react';
import FormElement from '../FormElements/FormElement';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../redux/hooks';
import { ToastContext } from '../../contexts/ToastContext';
import { signIn } from '../../redux/user/actions';
import { useNavigate } from 'react-router';
import store from '../../redux/store';
import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';
import MiniLoader from '../../components/Loader/MiniLoader';

interface LoginFormProps {
  labelColor: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ labelColor }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { dispatch: toastDispatch } = useContext(ToastContext);
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

  const [loading, setLoading] = useState(false);

  const formSubmitHandler: SubmitHandler<FieldValues> = async (values) => {
    setLoading(true);
    const userData = { login: values.username, password: values.password };
    await dispatch(signIn(userData));
    setLoading(false);
    const isAuthenticated = store.getState().userReducer.isAuthenticated;
    if (isAuthenticated) {
      navigate('/');
      toastDispatch({ type: 'SUCCESS', payload: t('_TOAST_LOGGED_IN_') });
      reset();
    } else {
      toastDispatch({ type: 'ERROR', payload: t('_ERR_CREDENTIALS_') });
    }
  };

  return (
    <form onSubmit={handleSubmit(formSubmitHandler)} className="form">
      <FormElement
        type="text"
        label={t('_LBL_USERNAME_')}
        labelColor={labelColor}
        placeholder="John-Doe"
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
        labelClassName={`text-${labelColor}`}
      />
      <Button className="button--signin" type="submit" isDisabled={loading}>
        {t('_BTN_SIGN_IN_')}
        {loading && <MiniLoader />}
      </Button>
    </form>
  );
};

export default LoginForm;
