import { AxiosResponse } from 'axios';
import { getHttp, postHttp, putHttp, deleteHttp } from '../../api/api';
import { ColumnInterface } from '../../types';
import { BOARDS_ENDPOINT } from '../constants';
import { BACKEND_URL } from '../constants';

export type BoardResponse = {
  data: ColumnInterface;
};

export const getBoard = async (title: string): Promise<AxiosResponse<unknown, unknown> | void> =>
  await getHttp(`${BACKEND_URL}/${BOARDS_ENDPOINT}`, { title });

export const createBoard = async (title: string, navigate: (url: string) => void) => {
  const res = await postHttp(
    `${BACKEND_URL}/${BOARDS_ENDPOINT}`,
    { title, description: 'empty description' },
    navigate
  );
  if ((res as AxiosResponse).status === 200) {
    return res;
  }
};

export const updateBoard = async (
  title: string,
  description: string,
  id: string
): Promise<AxiosResponse<string, unknown> | void | string> =>
  await putHttp(`${BACKEND_URL}/${BOARDS_ENDPOINT}/${id}`, { title, description });

export const deleteBoard = async (id: string): Promise<void | string> =>
  await deleteHttp(`${BACKEND_URL}/${BOARDS_ENDPOINT}/${id}`);
