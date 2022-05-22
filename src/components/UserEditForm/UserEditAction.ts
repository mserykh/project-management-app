import { BACKEND_URL } from '../../redux/constants';
import axios from 'axios';

export async function updateUser(
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
  } catch (err) {
    return 404;
  }
}

export async function getUserData(token: string, id: string | undefined) {
  const res = await axios.get(`${BACKEND_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const userData = await res.data.find((data: UserDataType) => data.id === id);

  return userData;
}

export async function deleteUser(id: string | undefined) {
  try {
    const res = await axios.delete(`${BACKEND_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.status;
  } catch (err) {
    return 404;
  }
}

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
