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
import { ColumnInterface, TaskInterface, UserInterface } from '../../../types';
import { updateColumnData } from './boardStateSlice';
import { getNewOrderNumber } from '../../../utils';

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
      toast.error(`An error !!!! ${e}`);
    }
  }
);

export const updateColumn = createAsyncThunk(
  'boardState/updateColumn',
  async (columnPayload: ColumnPayload, thunkAPI) => {
    try {
      const response = await putHttp(
        `${BOARDS_URL}/${columnPayload.boardId}/${COLUMNS_ENDPOINT}/${columnPayload.columnId}`,
        {
          title: columnPayload.title,
          order: columnPayload.order,
        }
      );
      if ((response as AxiosResponse).status === 200) {
        toast.success('A column has been update');
        thunkAPI.dispatch(fetchBoard(columnPayload.boardId));
      }
    } catch (e) {
      toast.error(`An error !!!! ${e}`);
    }
  }
);

// update all orders for columns following the deleted item : -1

export const deleteColumn = createAsyncThunk(
  'boardState/deleteColumn',
  async ({ title, columnId, boardId }: DeleteColumnPayload) => {
    try {
      await deleteHttp(`${BOARDS_URL}/${boardId}/${COLUMNS_ENDPOINT}/${columnId}`);
      toast.success(`A ${title} column has been deleted`);
    } catch (e) {
      toast.error(`An error !!!! ${e}`);
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
      toast.error(`An error !!!! ${e}`);
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
      return (e as AxiosError).message;
    }
  }
);
