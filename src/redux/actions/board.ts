import { AxiosResponse } from 'axios';
import { getHttp, postHttp, putHttp, deleteHttp } from '../../api/api';
import { ColumnInterface } from '../../types';
import { BOARDS_ENDPOINT } from '../constants';
import { BACKEND_URL } from '../constants';

export type BoardResponse = {
  data: ColumnInterface;
};

type BoardPayload = {
  title: string;
  description: string;
  navigate: (url: string) => void;
};

export const getBoard = async (title: string): Promise<AxiosResponse<unknown, unknown> | void> =>
  await getHttp(`${BACKEND_URL}/${BOARDS_ENDPOINT}`, { title });

export const updateBoard = async (
  title: string,
  description: string,
  id: string
): Promise<AxiosResponse<string, unknown> | void | string> =>
  await putHttp(`${BACKEND_URL}/${BOARDS_ENDPOINT}/${id}`, { title, description });

export const deleteBoard = async (id: string): Promise<void | string> =>
  await deleteHttp(`${BACKEND_URL}/${BOARDS_ENDPOINT}/${id}`);
