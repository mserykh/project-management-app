import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BACKEND_URL, BOARDS_ENDPOINT } from '../../constants';

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
