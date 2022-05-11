import { postHttp, putHttp, deleteHttp } from '../../api/api';
import { BACKEND_URL } from '../constants';

export const createBoard = async (title: string): Promise<void> =>
  await postHttp(`${BACKEND_URL}/boards`, { title });

export const updateBoard = async (title: string, id: string): Promise<void | string> =>
  await putHttp(`${BACKEND_URL}/boards/${id}`, { title });

export const deleteBoard = async (id: string): Promise<void | string> =>
  await deleteHttp(`${BACKEND_URL}/boards/${id}`);
