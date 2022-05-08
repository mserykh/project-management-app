import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { globalStateInterface } from './types';

const initialState: globalStateInterface = {
  token: localStorage.getItem('token') || '',
  language: localStorage.getItem('language') || 'en',
};

export const globalStateSlice = createSlice({
  name: 'globalState',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    updateLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
  },
});

export const { setToken } = globalStateSlice.actions;
export default globalStateSlice.reducer;
