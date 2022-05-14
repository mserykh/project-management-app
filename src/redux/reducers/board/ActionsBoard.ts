import axios, { AxiosResponse } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BACKEND_URL, BOARDS_ENDPOINT, COLUMNS_ENDPOINT } from '../../constants';
import { deleteHttp, postHttp, putHttp } from '../../../api/api';
import { toast } from 'react-toastify';
import { ColumnInterface, TaskInterface } from '../../../types';

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

type ColumnPayload = {
  title: string;
  columns?: ColumnInterface[];
  navigate: (url: string) => void;
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

const getNewOrderNumber = (elementsArray: ColumnInterface[] | TaskInterface[]): number => {
  if (elementsArray.length > 0) {
    const maxOrderNumber = Math.max(...elementsArray.map((element) => element.order));
    return maxOrderNumber + 1;
  }
  return 1;
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

export const deleteColumn = createAsyncThunk(
  'boardState/deleteColumn',
  async ({ title, columnId, boardId }: DeleteColumnPayload, thunkAPI) => {
    try {
      await deleteHttp(`${BOARDS_URL}/${boardId}/${COLUMNS_ENDPOINT}/${columnId}`);
      toast.success(`A ${title} column has been deleted`);
      thunkAPI.dispatch(fetchBoard(boardId));
    } catch (e) {
      toast.error(`An error !!!! ${e}`);
    }
  }
);
