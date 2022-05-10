import { postHttp, putHttp, deleteHttp } from '../../api/api';
import BASE_URL from './constants';

export const createBoard = async (title: string): Promise<void> =>
  await postHttp(`${BASE_URL}/boards`, { title });

export const updateBoard = async (title: string, id: string): Promise<void | string> =>
  await putHttp(`${BASE_URL}/boards/${id}`, { title });

export const deleteBoard = async (id: string): Promise<void | string> =>
  await deleteHttp(`${BASE_URL}/boards/${id}`);
