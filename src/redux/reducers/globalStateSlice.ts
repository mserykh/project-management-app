import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import i18n from '../../n18i';
import { globalStateInterface } from './types';

const initialState: globalStateInterface = {
  userId: localStorage.getItem('userId') || '',
  token: localStorage.getItem('token') || '',
  language: localStorage.getItem('language') || 'en',
};

export const globalStateSlice = createSlice({
  name: 'globalState',
  initialState,
  reducers: {
    updateUserId(state: globalStateInterface, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
    updateToken(state: globalStateInterface, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    logout(state: globalStateInterface) {
      state.userId = '';
      state.token = '';
    },
    updateLanguage(state: globalStateInterface, action: PayloadAction<string>) {
      state.language = action.payload;
      i18n.changeLanguage(action.payload);
    },
  },
});

export default globalStateSlice;
