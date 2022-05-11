import { AxiosResponse } from 'axios';
import { postHttp, putHttp, deleteHttp } from '../../api/api';
import { BOARDS_ENDPOINT } from '../constants';
import BASE_URL from './constants';

export const getBoard = async (title: string): Promise<AxiosResponse<unknown, unknown> | void> =>
  await postHttp(`${BASE_URL}/${BOARDS_ENDPOINT}`, { title });

export const createBoard = async (title: string): Promise<AxiosResponse<unknown, unknown> | void> =>
  await postHttp(`${BASE_URL}/${BOARDS_ENDPOINT}`, { title });

export const updateBoard = async (
  title: string,
  id: string
): Promise<AxiosResponse<string, unknown> | void | string> =>
  await putHttp(`${BASE_URL}/${BOARDS_ENDPOINT}`, { title });

export const deleteBoard = async (id: string): Promise<void | string> =>
  await deleteHttp(`${BASE_URL}/${BOARDS_ENDPOINT}`);
