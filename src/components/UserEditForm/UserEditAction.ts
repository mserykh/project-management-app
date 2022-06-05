import { BACKEND_URL } from '../../redux/constants';
import axios, { AxiosError } from 'axios';
import { logoutUser } from '../../redux/user/actions';
import { AppDispatch } from '../../redux/store';

interface UserEditData {
  name: string;
  login: string;
  password: string;
}

export interface UserDataType {
  id: string;
  name: string;
  login: string;
}

export async function updateUser(
  dispatch: AppDispatch,
  userId: string | undefined,
  userUpdateData: UserEditData,
  token: string
) {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${BACKEND_URL}/users/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: userUpdateData,
    });
    return res.status;
  } catch (e) {
    if ((e as AxiosError)?.response?.status === 401) {
      dispatch(logoutUser());
    }
    return 404;
  }
}

export async function getUserData(dispatch: AppDispatch, token: string, id: string | undefined) {
  try {
    const res = await axios.get(`${BACKEND_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const userData = await res.data.find((data: UserDataType) => data.id === id);

    return userData;
  } catch (e) {
    if ((e as AxiosError)?.response?.status === 401) {
      dispatch(logoutUser());
    }
  }
}

export async function deleteUser(dispatch: AppDispatch, id: string | undefined) {
  try {
    const res = await axios.delete(`${BACKEND_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.status;
  } catch (e) {
    if ((e as AxiosError)?.response?.status === 401) {
      dispatch(logoutUser());
    }
    return 404;
  }
}
