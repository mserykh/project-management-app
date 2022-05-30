import axios, { AxiosResponse } from 'axios';
import jwt_decode from 'jwt-decode';

import { setUser } from './userSlice';
import { setToken } from '../reducers/globalStateSlice';
import { AppDispatch, RootState } from '../store';
import { BACKEND_URL } from '../constants';
import { toast } from 'react-toastify';
import i18n from '../../n18i';
import { errorHandler } from '../utils';

type DecodedJWT = {
  userId: string;
  login: string;
  exp: number;
};

interface RegisterUserState {
  name: string;
  login: string;
  password: string;
}

function checkIsTokenExpired(expDate: number) {
  return Date.now() > expDate * 1000;
}

export async function registerUser(userData: RegisterUserState) {
  const res = await axios(`${BACKEND_URL}/signup`, {
    method: 'POST',
    data: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch((err) => err);

  return res;
}

export const signIn =
  (signData: { login: string; password: string }) => async (dispatch: AppDispatch) => {
    try {
      const res = await axios(`${BACKEND_URL}/signin`, {
        method: 'POST',
        data: JSON.stringify(signData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const token = res.data.token;
      const decoded = jwt_decode(token) as DecodedJWT;
      dispatch(setUserData(decoded, token));
      localStorage.setItem('token', token);
    } catch (err) {
      if (errorHandler(err as Record<string, AxiosResponse>)) {
        const error = i18n.t(errorHandler(err as Record<string, AxiosResponse>) as string, {
          type: i18n.t('_TYPE_USER_'),
        });
        toast.error(error);
      }
      dispatch(logoutUser());
    }
  };

export const validateTokenExpiration =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = getState().globalStateReducer.token;
    try {
      const decoded = jwt_decode(token) as DecodedJWT;
      const isExpired = checkIsTokenExpired(decoded.exp);
      if (isExpired) {
        dispatch(logoutUser());
      }
    } catch (err) {
      if (errorHandler(err as Record<string, AxiosResponse>)) {
        const error = i18n.t(errorHandler(err as Record<string, AxiosResponse>) as string, {
          type: i18n.t('_TYPE_USER_'),
        });
        toast.error(error);
      }
      dispatch(logoutUser());
    }
  };

export const setUserData = (decoded: DecodedJWT, token: string) => (dispatch: AppDispatch) => {
  const userData = {
    id: decoded.userId,
    login: decoded.login,
  };

  dispatch(setToken(token));

  dispatch(setUser(userData, true));
  localStorage.setItem('user', JSON.stringify(userData));
};

export const logoutUser = () => (dispatch: AppDispatch) => {
  dispatch(setToken(''));
  dispatch(setUser(null, false));
  localStorage.setItem('token', '');
  localStorage.setItem('user', '');
};
