import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { getHttp, postHttp, putHttp, deleteHttp } from '../../api/api';
import { ToastContext } from '../../contexts/ToastContext';
import { ColumnInterface } from '../../types';
import { BOARDS_ENDPOINT } from '../constants';
import { BACKEND_URL } from '../constants';

const { dispatch: toastDispatch } = useContext(ToastContext);

export type BoardResponse = {
  data: ColumnInterface;
};

export const getBoard = async (title: string): Promise<AxiosResponse<unknown, unknown> | void> =>
  await getHttp(`${BACKEND_URL}/${BOARDS_ENDPOINT}`, { title });

export const createBoard = async (
  title: string
) => {
  const res = await postHttp(`${BACKEND_URL}/${BOARDS_ENDPOINT}`, { title });
  if (res?.status === 200) {
    toastDispatch({
      type: 'SUCCESS',
      payload: 'A new column is created!',
    });
  }
  return res;
};

export const updateBoard = async (
  title: string,
  id: string
): Promise<AxiosResponse<string, unknown> | void | string> =>
  await putHttp(`${BACKEND_URL}/${BOARDS_ENDPOINT}/${id}`, { title });

export const deleteBoard = async (id: string): Promise<void | string> =>
  await deleteHttp(`${BACKEND_URL}/${BOARDS_ENDPOINT}/${id}`);
