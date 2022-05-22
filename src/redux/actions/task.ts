import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { getHttp, postHttp, putHttp } from '../../api/api';
import i18n from '../../n18i';
import { ColumnInterface, TaskInterface } from '../../types';
import { BOARDS_ENDPOINT } from '../constants';
import { BACKEND_URL } from '../constants';
import { errorHandler } from '../utils';

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
    if (errorHandler(e as Record<string, unknown>)) {
      const error = i18n.t(errorHandler(e as Record<string, unknown>) as string, {
        type: i18n.t('_TYPE_TASK_'),
      });
      toast.error(error);
    }
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
    if (errorHandler(e as Record<string, unknown>)) {
      const error = i18n.t(errorHandler(e as Record<string, unknown>) as string, {
        type: i18n.t('_TYPE_TASK_'),
      });
      toast.error(error);
    }
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
    if (errorHandler(e as Record<string, unknown>)) {
      const error = i18n.t(errorHandler(e as Record<string, unknown>) as string, {
        type: i18n.t('_TYPE_TASK_'),
      });
      toast.error(error);
    }
  }
};
