import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import i18n from '../../n18i';
import { globalStateInterface } from './types';

const initialState: globalStateInterface = {
  token: localStorage.getItem('token') || '',
  language: localStorage.getItem('language') || 'en',
};

export const globalStateSlice = createSlice({
  name: 'globalState',
  initialState,
  reducers: {
    setToken(state: globalStateInterface, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    updateLanguage(state: globalStateInterface, action: PayloadAction<string>) {
      state.language = action.payload;
      i18n.changeLanguage(action.payload);
    },
  },
});

export default globalStateSlice;
