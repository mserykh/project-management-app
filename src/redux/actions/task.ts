import { AxiosError, AxiosResponse } from 'axios';
import { getHttp, postHttp, putHttp, deleteHttp } from '../../api/api';
import { ColumnInterface, TaskInterface } from '../../types';
import { BOARDS_ENDPOINT } from '../constants';
import { BACKEND_URL } from '../constants';

export type BoardResponse = {
  data: ColumnInterface;
};

export const getAllTasks = async (
  boardId: string,
  columnId: string
): Promise<AxiosResponse<unknown, unknown> | void | string> => {
  const URL = `${BACKEND_URL}/${BOARDS_ENDPOINT}/${boardId}/columns/${columnId}/tasks`;
  try {
    const res = await getHttp(URL, {});
    return res;
  } catch (e) {
    return (e as AxiosError).message;
  }
};

export const createTask = async (
  data: TaskInterface,
  boardId: string,
  columnId: string
): Promise<AxiosResponse<unknown, unknown> | void | string> => {
  const URL = `${BACKEND_URL}/${BOARDS_ENDPOINT}/${boardId}/columns/${columnId}/tasks`;
  try {
    return await postHttp(URL, data);
  } catch (e) {
    return (e as AxiosError).message;
  }
};

export const updateTask = async (
  data: TaskInterface,
  boardId: string,
  columnId: string,
  id: string
): Promise<AxiosResponse<string, unknown> | void | string> => {
  const URL = `${BACKEND_URL}/${BOARDS_ENDPOINT}/${boardId}/columns/${columnId}/tasks`;
  try {
    await putHttp(`${URL}/${id}`, { ...data });
  } catch (e) {
    return (e as AxiosError).message;
  }
};

export const deleteBoard = async (id: string): Promise<void | string> =>
  await deleteHttp(`${BACKEND_URL}/${BOARDS_ENDPOINT}/${id}`);
