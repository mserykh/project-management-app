import axios, { AxiosResponse } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BACKEND_URL, BOARDS_ENDPOINT, COLUMNS_ENDPOINT } from '../../constants';
import { postHttp } from '../../../api/api';
import { toast } from 'react-toastify';

const BOARD_URL = `${BACKEND_URL}/${BOARDS_ENDPOINT}`;

type ThunkType = {
  id: string;
  title: string;
  order: number;
};

export const createColumn = createAsyncThunk(
  'createColumn/createColumn',
  async (obj: ThunkType) => {
    try {
      const response = await postHttp(`${BOARD_URL}/${obj.id}/${COLUMNS_ENDPOINT}`, {
        title: obj.title,
        order: obj.order,
      });
      if (response?.data) {
        return response.data;
      }

      if (response?.status === 200) {
        toast.success('A new column is created!');
      }
    } catch (e) {
      toast.error(`An error ${e}`);
    }
  }
);
