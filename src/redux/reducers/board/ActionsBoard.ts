import axios, { AxiosResponse } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BACKEND_URL, BOARDS_ENDPOINT, COLUMNS_ENDPOINT } from '../../constants';
import { postHttp } from '../../../api/api';
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
  boardID: string;
  title: string;
  columns: ColumnInterface[];
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
  'createColumn/createColumn',
  async (columnPayload: ColumnPayload, thunkAPI) => {
    try {
      const response = await postHttp(
        `${BOARDS_URL}/${columnPayload.boardID}/${COLUMNS_ENDPOINT}`,
        {
          title: columnPayload.title,
          order: getNewOrderNumber(columnPayload.columns),
        },
        columnPayload.navigate
      );
      if ((response as AxiosResponse).status === 201) {
        toast.success('A new column has been added');
        thunkAPI.dispatch(fetchBoard(columnPayload.boardID));
      }
    } catch (e) {
      // columnPayload.navigate('/login');
      toast.error(`An error !!!! ${e}`);
    }
  }
);
