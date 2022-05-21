import { AxiosResponse } from 'axios';
import { getHttp, putHttp, deleteHttp } from '../../api/api';
import i18n from '../../n18i';
import { ColumnInterface } from '../../types';
import { BOARDS_ENDPOINT } from '../constants';
import { BACKEND_URL } from '../constants';
import { errorHandler } from '../utils';
import { toast } from 'react-toastify';

export type BoardResponse = {
  data: ColumnInterface;
};

export const getBoard = async (title: string): Promise<AxiosResponse<unknown, unknown> | void> => {
  try {
    await getHttp(`${BACKEND_URL}/${BOARDS_ENDPOINT}`, { title });
  } catch (e) {
    if (errorHandler(e as Record<string, unknown>)) {
      const error = i18n.t(errorHandler(e as Record<string, unknown>) as string, {
        type: i18n.t('_TYPE_BOARD_'),
      });
      toast.error(error);
    }
  }
};

export const updateBoard = async (
  title: string,
  description: string,
  id: string
): Promise<AxiosResponse<string, unknown> | void | string> => {
  try {
    await putHttp(`${BACKEND_URL}/${BOARDS_ENDPOINT}/${id}`, { title, description });
  } catch (e) {
    if (errorHandler(e as Record<string, unknown>)) {
      const error = i18n.t(errorHandler(e as Record<string, unknown>) as string, {
        type: i18n.t('_TYPE_BOARD_'),
      });
      toast.error(error);
    }
  }
};

export const deleteBoard = async (id: string): Promise<void | string> => {
  try {
    await deleteHttp(`${BACKEND_URL}/${BOARDS_ENDPOINT}/${id}`);
  } catch (e) {
    debugger;
    errorHandler(e as Record<string, unknown>);
    if (errorHandler(e as Record<string, unknown>)) {
      const error = i18n.t(errorHandler(e as Record<string, unknown>) as string, {
        type: i18n.t('_TYPE_BOARD_'),
      });
      toast.error(error);
    }
  }
};
