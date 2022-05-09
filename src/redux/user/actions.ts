import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { setUser } from './userSlice';
import { setToken } from '../reducers/globalStateSlice';
import { AppDispatch } from '../store';
import { useAppSelector } from '../hooks';

const BASE_URL = 'https://pacific-badlands-18958.herokuapp.com';

function checkIsTokenExpired(expDate: number) {
  return Date.now() < expDate * 1000;
}

export function registerUser(userData: RegisterUserState) {
  try {
    axios(`${BASE_URL}/signup`, {
      method: 'POST',
      data: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    console.log(err);
  }
}

export const signIn =
  (signData: { login: string; password: string }) => async (dispatch: AppDispatch) => {
    try {
      const res = await axios(`${BASE_URL}/signin`, {
        method: 'POST',
        data: JSON.stringify(signData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const token = res.data.token;
      dispatch(setUserData(token));
      localStorage.setItem('token', token);
    } catch (err) {
      console.log(err);
    }
  };

export const auth = () => async (dispatch: AppDispatch) => {
  const token = useAppSelector((state) => state.globalStateReducer.token);
  const decoded = jwt_decode(token) as DecodedJWT;
  const isExpired = checkIsTokenExpired(decoded.exp);
  if (!isExpired) {
    dispatch(setToken(''));
    dispatch(setUser(null, false));
  } else {
    dispatch(setUserData(token));
  }
};

export const setUserData = (token: string) => (dispatch: AppDispatch) => {
  const decoded = jwt_decode(token) as DecodedJWT;
  const userData = {
    id: decoded.userId,
    login: decoded.login,
  };
  dispatch(setUser(userData, true));
  dispatch(setToken(token));
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
