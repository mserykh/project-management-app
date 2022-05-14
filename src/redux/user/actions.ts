import axios, { AxiosError } from 'axios';
import jwt_decode from 'jwt-decode';

import { setUser } from './userSlice';
import { setToken } from '../reducers/globalStateSlice';
import { AppDispatch, RootState } from '../store';
import { BACKEND_URL, USERS_ENDPOINT } from '../constants';

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
      console.log(token);
      const decoded = jwt_decode(token) as DecodedJWT;
      dispatch(setUserData(decoded, token));
      localStorage.setItem('token', token);
    } catch (err) {
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

export const getAllUsers = () => async (): Promise<unknown> => {
  const token = localStorage.getItem('token') || '';
  try {
    const response = await axios.get(`${BACKEND_URL}/${USERS_ENDPOINT}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    return data;
  } catch (e) {
    return (e as AxiosError).message;
  }
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
