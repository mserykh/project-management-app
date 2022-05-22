import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { setUser } from './userSlice';
import { setToken } from '../reducers/globalStateSlice';
import { AppDispatch, RootState } from '../store';
import { BACKEND_URL } from '../constants';
import { toast } from 'react-toastify';
import i18n from '../../n18i';
import { errorHandler } from '../utils';

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
      if (errorHandler(err as Record<string, unknown>)) {
        const error = i18n.t(errorHandler(err as Record<string, unknown>) as string, {
          type: i18n.t('_TYPE_USER_'),
        });
        toast.error(error);
      }
      dispatch(logoutUser());
    }
  };

export const auth = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const token = getState().globalStateReducer.token;
  try {
    const decoded = jwt_decode(token) as DecodedJWT;
    const isExpired = checkIsTokenExpired(decoded.exp);
    if (isExpired) {
      dispatch(logoutUser());
    } else {
      dispatch(setUserData(decoded, token));
    }
  } catch (err) {
    if (errorHandler(err as Record<string, unknown>)) {
      const error = i18n.t(errorHandler(err as Record<string, unknown>) as string, {
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
};

export const logoutUser = () => (dispatch: AppDispatch) => {
  dispatch(setToken(''));
  dispatch(setUser(null, false));
  localStorage.setItem('token', '');
};

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
