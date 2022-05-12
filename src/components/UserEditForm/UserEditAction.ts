import { BACKEND_URL } from '../../redux/constants';
import axios from 'axios';

export async function updateUser(
  userId: string | undefined,
  userUpdateData: UserEditData,
  token: string
) {
  try {
    console.log(userId);

    const res = await axios({
      method: 'PUT',
      url: `${BACKEND_URL}/users/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: userUpdateData,
    });

    console.log('first');
    return res.status;
  } catch (err) {
    console.log('second');
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
