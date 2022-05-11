import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { postHttp, putHttp, deleteHttp } from '../../api/api';
import { ColumnInterface } from '../../types';
import { BOARDS_ENDPOINT } from '../constants';
import BASE_URL from './constants';

type BoardResponse = {
  data: ColumnInterface;
};

export const getBoard = async (title: string): Promise<AxiosResponse<unknown, unknown> | void> =>
  await postHttp(`${BASE_URL}/${BOARDS_ENDPOINT}`, { title });

export const createBoard = async (
  title: string
): Promise<BoardResponse> => {
  const res = await postHttp(`${BASE_URL}/${BOARDS_ENDPOINT}`, { title });
  if (res.status === 200) {
    toast.success('A new column is created!');
  }
  return res;
};

export const updateBoard = async (
  title: string,
  id: string
): Promise<AxiosResponse<string, unknown> | void | string> =>
  await putHttp(`${BASE_URL}/${BOARDS_ENDPOINT}`, { title });

export const deleteBoard = async (id: string): Promise<void | string> =>
  await deleteHttp(`${BASE_URL}/${BOARDS_ENDPOINT}`);
