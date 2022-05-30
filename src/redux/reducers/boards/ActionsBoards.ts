import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BACKEND_URL, BOARDS_ENDPOINT } from '../../constants';
import { postHttp } from '../../../api/api';
import i18n from '../../../n18i';
import { errorHandler } from '../../utils';
import { logoutUser } from '../../user/actions';
import { AppDispatch } from '../../store';

type BoardPayload = {
  title: string;
  description: string;
};

const BOARDS_URL = `${BACKEND_URL}/${BOARDS_ENDPOINT}`;

export const fetchAllBoards = createAsyncThunk('boardsState/fetchAll', async (_, thunkAPI) => {
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
    if ((e as AxiosError)?.response?.status === 401) {
      const logOut = logoutUser();
      logOut(thunkAPI.dispatch as AppDispatch);
      const errorText = i18n.t('_ERR_SERVER_CODE_401_');
      toast.error(errorText);
    }
    if (errorHandler(e as Record<string, AxiosResponse>)) {
      const error = i18n.t(errorHandler(e as Record<string, AxiosResponse>) as string, {
        type: i18n.t('_TYPE_BOARD_'),
      });
      toast.error(error);
    }
  }
});

export const createBoard = createAsyncThunk(
  'boardsState/createBoard',
  async (boardPayload: BoardPayload, thunkAPI) => {
    try {
      const response = await postHttp(thunkAPI.dispatch as AppDispatch, `${BOARDS_URL}`, {
        title: boardPayload.title,
        description: boardPayload.description,
      });
      if ((response as AxiosResponse).status === 201) {
        toast.success(`A new board ${boardPayload.title} has been added`);
      }
      const responseData = (response as AxiosResponse).data;
      return responseData;
    } catch (e) {
      if ((e as AxiosError)?.response?.status === 401) {
        const logOut = logoutUser();
        logOut(thunkAPI.dispatch as AppDispatch);
        const errorText = i18n.t('_ERR_SERVER_CODE_401_');
        toast.error(errorText);
      }
      if (errorHandler(e as Record<string, AxiosResponse>)) {
        const error = i18n.t(errorHandler(e as Record<string, AxiosResponse>) as string, {
          type: i18n.t('_TYPE_BOARD_'),
        });
        toast.error(error);
      }
    }
  }
);
