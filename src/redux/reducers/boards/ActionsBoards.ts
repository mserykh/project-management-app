import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BACKEND_URL, BOARDS_ENDPOINT } from '../../constants';
import { postHttp } from '../../../api/api';
import { BoardInterface } from '../../../types';

type BoardPayload = {
  title: string;
  description: string;
  navigate: (url: string) => void;
};

const BOARDS_URL = `${BACKEND_URL}/${BOARDS_ENDPOINT}`;

export const fetchAllBoards = createAsyncThunk('boardsState/fetchAll', async () => {
  const token = localStorage.getItem('token') || '';
  try {
    const response = await axios.get(BOARDS_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const responseData = response.data;
    return responseData;
  } catch (e) {
    return e;
  }
});

export const createBoard = createAsyncThunk(
  'boardsState/createBoard',
  async (boardPayload: BoardPayload) => {
    try {
      const response = await postHttp(
        `${BOARDS_URL}`,
        {
          title: boardPayload.title,
          description: boardPayload.description,
        },
        boardPayload.navigate
      );
      if ((response as AxiosResponse).status === 201) {
        toast.success(`A new board ${boardPayload.title} has been added`);
      }
      const responseData = (response as AxiosResponse).data;
      return responseData as BoardInterface;
    } catch (e) {
      toast.error(`An error ${e}`);
    }
  }
);
