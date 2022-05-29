import axios, { AxiosError, AxiosResponse } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  BACKEND_URL,
  BOARDS_ENDPOINT,
  COLUMNS_ENDPOINT,
  TASKS_ENDPOINT,
  USERS_ENDPOINT,
} from '../../constants';
import { deleteHttp, postHttp, putHttp } from '../../../api/api';
import { toast } from 'react-toastify';
import { ColumnInterface, UserInterface } from '../../../types';
import { getNewOrderNumber } from '../../../utils';
import i18n from '../../../n18i';
import { errorHandler } from '../../utils';
import { logoutUser } from '../../user/actions';
import { AppDispatch } from '../../store';

export type ColumnPayload = {
  title: string;
  columns?: ColumnInterface[];
  boardId: string;
  columnId?: string;
  order?: number;
};

type changeColumnsOrderPayload = {
  draggingColumn: ColumnPayload;
  changedColumns: ColumnPayload[];
  draggedColumn: ColumnPayload;
};

type DeleteColumnPayload = {
  title: string;
  boardId: string;
  columnId: string;
};

type DeleteTaskPayload = {
  title: string;
  taskId: string;
  boardId: string;
  columnId: string;
};

const BOARDS_URL = `${BACKEND_URL}/${BOARDS_ENDPOINT}`;

export const fetchBoard = createAsyncThunk(
  'boardState/fetchBoard',
  async (id: string, thunkAPI) => {
    const token = localStorage.getItem('token') || '';
    try {
      const response = await axios.get(`${BOARDS_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (e) {
      if ((e as AxiosError)?.response?.status === 401) {
        const logOut = logoutUser();
        logOut(thunkAPI.dispatch as AppDispatch);
        return {};
      }
      if (errorHandler(e as Record<string, AxiosResponse>)) {
        const error = i18n.t(errorHandler(e as Record<string, AxiosResponse>) as string, {
          type: i18n.t('_TYPE_COLUMN_'),
        });
        toast.error(error);
      }
    }
  }
);

export const createColumn = createAsyncThunk(
  'boardState/createColumn',
  async (columnPayload: ColumnPayload, thunkAPI) => {
    try {
      const response = await postHttp(
        thunkAPI.dispatch as AppDispatch,
        `${BOARDS_URL}/${columnPayload.boardId}/${COLUMNS_ENDPOINT}`,
        {
          title: columnPayload.title,
          order: getNewOrderNumber(columnPayload.columns as ColumnInterface[]),
        }
      );
      if ((response as AxiosResponse).status === 201) {
        const toastText = i18n.t('_TOAST_NEW_COLUMN_');
        toast.success(toastText);
        thunkAPI.dispatch(fetchBoard(columnPayload.boardId));
      }
    } catch (e) {
      if (errorHandler(e as Record<string, AxiosResponse>)) {
        const error = i18n.t(errorHandler(e as Record<string, AxiosResponse>) as string, {
          type: i18n.t('_TYPE_COLUMN_'),
        });
        toast.error(error);
      }
    }
  }
);

export const updateColumn = createAsyncThunk(
  'boardState/updateColumn',
  async (columnPayload: ColumnPayload, thunkAPI) => {
    try {
      const response = await putHttp(
        thunkAPI.dispatch as AppDispatch,
        `${BOARDS_URL}/${columnPayload.boardId}/${COLUMNS_ENDPOINT}/${columnPayload.columnId}`,
        {
          title: columnPayload.title,
          order: columnPayload.order,
        }
      );
      if ((response as AxiosResponse).status === 200) {
        const toastText = i18n.t('_TOAST_COLUMN_UPDATED_');
        toast.success(toastText);
      }
    } catch (e) {
      if (errorHandler(e as Record<string, AxiosResponse>)) {
        const error = i18n.t(errorHandler(e as Record<string, AxiosResponse>) as string, {
          type: i18n.t('_TYPE_COLUMN_'),
        });
        toast.error(error);
      }
    }
  }
);

const updateColumnOrder = async (
  dispatch: AppDispatch,
  columnPayload: ColumnPayload
): Promise<void> => {
  try {
    await putHttp(
      dispatch,
      `${BOARDS_URL}/${columnPayload.boardId}/${COLUMNS_ENDPOINT}/${columnPayload.columnId}`,
      {
        title: columnPayload.title,
        order: columnPayload.order,
      }
    );
  } catch (e) {
    console.error(e);
    toast.error(`An error ${e}`);
  }
};

export const changeColumnsOrder = createAsyncThunk(
  'boardState/changeColumnsOrder',
  async (
    { draggingColumn, changedColumns, draggedColumn }: changeColumnsOrderPayload,
    thunkAPI
  ) => {
    try {
      runGenerator(
        changeColumnsOrderGenerator(
          thunkAPI.dispatch as AppDispatch,
          draggingColumn,
          changedColumns,
          draggedColumn
        )
      );
      const toastText = i18n.t('_TOAST_COLUMN_UPDATED_');
      toast.success(toastText);
    } catch (e) {
      if (errorHandler(e as Record<string, AxiosResponse>)) {
        const error = i18n.t(errorHandler(e as Record<string, AxiosResponse>) as string, {
          type: i18n.t('_TYPE_COLUMN_'),
        });
        toast.error(error);
      }
    }
  }
);

function* changeColumnsOrderGenerator(
  dispatch: AppDispatch,
  draggingColumn: ColumnPayload,
  changedColumns: ColumnPayload[],
  draggedColumn: ColumnPayload
) {
  yield updateColumnOrder(dispatch, draggingColumn);
  for (const changedColumn of changedColumns) {
    yield updateColumnOrder(dispatch, changedColumn);
  }
  yield updateColumnOrder(dispatch, draggedColumn);
}

export const deleteColumn = createAsyncThunk(
  'boardState/deleteColumn',
  async ({ title, columnId, boardId }: DeleteColumnPayload, thunkAPI) => {
    try {
      const response = await deleteHttp(
        thunkAPI.dispatch as AppDispatch,
        `${BOARDS_URL}/${boardId}/${COLUMNS_ENDPOINT}/${columnId}`
      );
      if ((response as AxiosResponse).status === 204) {
        const toastText = i18n.t('_TOAST_COLUMN_DELETED_', { title: title });
        toast.success(toastText);
      }
    } catch (e) {
      if (errorHandler(e as Record<string, AxiosResponse>)) {
        const error = i18n.t(errorHandler(e as Record<string, AxiosResponse>) as string, {
          type: i18n.t('_TYPE_COLUMN_'),
        });
        toast.error(error);
      }
    }
  }
);

export const deleteTask = createAsyncThunk(
  'boardState/deleteTask',
  async ({ title, taskId, columnId, boardId }: DeleteTaskPayload, thunkAPI) => {
    try {
      const response = await deleteHttp(
        thunkAPI.dispatch as AppDispatch,
        `${BOARDS_URL}/${boardId}/${COLUMNS_ENDPOINT}/${columnId}/${TASKS_ENDPOINT}/${taskId}`
      );
      if ((response as AxiosResponse).status === 204) {
        thunkAPI.dispatch(fetchBoard(boardId));
        const toastText = i18n.t('_TOAST_TASK_DELETED_', { title: title });
        toast.success(toastText);
      }
    } catch (e) {
      if (errorHandler(e as Record<string, AxiosResponse>)) {
        const error = i18n.t(errorHandler(e as Record<string, AxiosResponse>) as string, {
          type: i18n.t('_TYPE_TASK_'),
        });
        toast.error(error);
      }
    }
  }
);

export const getAllUsers = createAsyncThunk(
  'boardState/getAllUsers',
  async (_, thunkAPI): Promise<UserInterface[] | string | void> => {
    const token = localStorage.getItem('token') || '';
    try {
      const response = await axios.get(`${BACKEND_URL}/${USERS_ENDPOINT}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      return data;
    } catch (e) {
      if ((e as AxiosError)?.response?.status === 401) {
        const logOut = logoutUser();
        logOut(thunkAPI.dispatch as AppDispatch);
        const errorText = i18n.t('_ERR_SERVER_CODE_401_');
        toast.error(errorText);
      }
      if (errorHandler(e as Record<string, AxiosResponse>)) {
        const error = i18n.t(errorHandler(e as Record<string, AxiosResponse>) as string, {
          type: i18n.t('_TYPE_TASK_'),
        });
        toast.error(error);
      }
    }
  }
);

function runGenerator(
  gen: Generator<Promise<void> | void, Promise<void> | void, Promise<void> | void>
): Promise<void | ColumnPayload> {
  return Promise.resolve().then(function handleNext(value): void | PromiseLike<void> {
    const next = gen.next(value);

    return (function handleResult(next): Promise<void> | void {
      if (next.done) {
        return next.value;
      } else {
        return Promise.resolve(next.value).then(handleNext, function handleErr(err) {
          return Promise.resolve(gen.throw(err)).then(handleResult);
        });
      }
    })(next);
  });
}
