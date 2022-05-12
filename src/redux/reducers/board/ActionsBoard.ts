import axios, { AxiosResponse } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BACKEND_URL, BOARDS_ENDPOINT, COLUMNS_ENDPOINT } from '../../constants';
import { postHttp } from '../../../api/api';
import { toast } from 'react-toastify';
import { ColumnInterface } from '../../../types';

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

const addOrder = (columns: ColumnInterface[]): number => {
  if (columns.length > 0) {
    const orderNumbers = [] as number[];
    columns.map((column: ColumnInterface) => {
      orderNumbers.push(column.order);
    });
    const maxOrderNumber = Math.max(...orderNumbers);
    return maxOrderNumber + 1;
  }
  return 1;
};

export const createColumn = createAsyncThunk(
  'createColumn/createColumn',
  async (columnPayload: ColumnPayload) => {
    try {
      const response = await postHttp(
        `${BOARDS_URL}/${columnPayload.boardID}/${COLUMNS_ENDPOINT}`,
        {
          title: columnPayload.title,
          order: addOrder(columnPayload.columns),
        },
        columnPayload.navigate
      );
      if ((response as AxiosResponse).status === 201) {
        toast.success('A new column has been add');
      }
    } catch (e) {
      // columnPayload.navigate('/login');
      toast.error(`An error !!!! ${e}`);
    }
  }
);
