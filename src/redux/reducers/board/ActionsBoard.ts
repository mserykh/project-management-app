import axios, { AxiosResponse } from 'axios';
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

const BOARDS_URL = `${BACKEND_URL}/${BOARDS_ENDPOINT}`;

export const fetchBoard = createAsyncThunk('boardState/fetchBoard', async (id: string) => {
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
    return e;
  }
});

export type ColumnPayload = {
  title: string;
  columns?: ColumnInterface[];
  navigate?: (url: string) => void;
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
  navigate: (url: string) => void;
};

type DeleteTaskPayload = {
  title: string;
  taskId: string;
  boardId: string;
  columnId: string;
  navigate: (url: string) => void;
};

export const createColumn = createAsyncThunk(
  'boardState/createColumn',
  async (columnPayload: ColumnPayload, thunkAPI) => {
    try {
      const response = await postHttp(
        `${BOARDS_URL}/${columnPayload.boardId}/${COLUMNS_ENDPOINT}`,
        {
          title: columnPayload.title,
          order: getNewOrderNumber(columnPayload.columns as ColumnInterface[]),
        },
        columnPayload.navigate
      );
      if ((response as AxiosResponse).status === 201) {
        toast.success('A new column has been added');
        thunkAPI.dispatch(fetchBoard(columnPayload.boardId));
      }
    } catch (e) {
      if (errorHandler(e as Record<string, unknown>)) {
        const error = i18n.t(errorHandler(e as Record<string, unknown>) as string, {
          type: i18n.t('_TYPE_COLUMN_'),
        });
        toast.error(error);
      }
    }
  }
);

export const updateColumn = createAsyncThunk(
  'boardState/updateColumn',
  async (columnPayload: ColumnPayload) => {
    try {
      const response = await putHttp(
        `${BOARDS_URL}/${columnPayload.boardId}/${COLUMNS_ENDPOINT}/${columnPayload.columnId}`,
        {
          title: columnPayload.title,
          order: columnPayload.order,
        }
      );
      if ((response as AxiosResponse).status === 200) {
        toast.success('A column has been updated');
        // thunkAPI.dispatch(fetchBoard(columnPayload.boardId));
      }
    } catch (e) {
      if (errorHandler(e as Record<string, unknown>)) {
        const error = i18n.t(errorHandler(e as Record<string, unknown>) as string, {
          type: i18n.t('_TYPE_COLUMN_'),
        });
        toast.error(error);
      }
    }
  }
);

const updateColumnOrder = async (columnPayload: ColumnPayload): Promise<void> => {
  try {
    await putHttp(
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
  async ({ draggingColumn, changedColumns, draggedColumn }: changeColumnsOrderPayload) => {
    try {
      runGenerator(changeColumnsOrderGenerator(draggingColumn, changedColumns, draggedColumn));
      toast.success('A column has been updated');
    } catch (e) {
      console.error(e);
    }
  }
);

function* changeColumnsOrderGenerator(
  draggingColumn: ColumnPayload,
  changedColumns: ColumnPayload[],
  draggedColumn: ColumnPayload
) {
  yield updateColumnOrder(draggingColumn);
  for (const changedColumn of changedColumns) {
    yield updateColumnOrder(changedColumn);
  }
  yield updateColumnOrder(draggedColumn);
}

export const deleteColumn = createAsyncThunk(
  'boardState/deleteColumn',
  async ({ title, columnId, boardId }: DeleteColumnPayload) => {
    try {
      await deleteHttp(`${BOARDS_URL}/${boardId}/${COLUMNS_ENDPOINT}/${columnId}`);
      toast.success(`A ${title} column has been deleted`);
    } catch (e) {
      if (errorHandler(e as Record<string, unknown>)) {
        const error = i18n.t(errorHandler(e as Record<string, unknown>) as string, {
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
      await deleteHttp(
        `${BOARDS_URL}/${boardId}/${COLUMNS_ENDPOINT}/${columnId}/${TASKS_ENDPOINT}/${taskId}`
      );
      toast.success(`A ${title} task has been deleted`);
      thunkAPI.dispatch(fetchBoard(boardId));
    } catch (e) {
      if (errorHandler(e as Record<string, unknown>)) {
        const error = i18n.t(errorHandler(e as Record<string, unknown>) as string, {
          type: i18n.t('_TYPE_TASK_'),
        });
        toast.error(error);
      }
    }
  }
);

export const getAllUsers = createAsyncThunk(
  'boardState/getAllUsers',
  async (): Promise<UserInterface[] | string | void> => {
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
      if (errorHandler(e as Record<string, unknown>)) {
        const error = i18n.t(errorHandler(e as Record<string, unknown>) as string, {
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
