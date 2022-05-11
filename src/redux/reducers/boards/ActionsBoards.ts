import axios, { AxiosResponse } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BACKEND_URL, BOARDS_ENDPOINT } from '../../constants';

const BOARDS_URL = `${BACKEND_URL}/${BOARDS_ENDPOINT}`;

export const fetchAllBoards = createAsyncThunk('boardsState/fetchAll', async () => {
  const token = localStorage.getItem('token') || '';
  try {
    let boardsPromises: Promise<AxiosResponse<unknown, unknown>>[] = [];
    const response = await axios.get(BOARDS_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const responseData = response.data;
    responseData.forEach((el: Record<string, unknown>) => {
      const boardReq = axios.get(`${BOARDS_URL}/${el.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      boardsPromises = [...boardsPromises, boardReq];
    });
    const boardsResponse = await Promise.all(boardsPromises);
    const boardsData = boardsResponse.map((el: AxiosResponse<unknown, unknown>) => el.data);
    return boardsData;
  } catch (e) {
    return e;
  }
});
