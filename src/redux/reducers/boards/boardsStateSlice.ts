import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAllBoards } from './ActionsBoards';

import { boardsStateInterface } from './types';
import { BoardInterface } from '../../../types';

const initialState: boardsStateInterface = {
  boardsData: [],
  loading: false,
  deleteModalOpen: false,
  updateModalOpen: false,
  error: '',
};

export const boardsStateSlice = createSlice({
  name: 'boardsState',
  initialState,
  reducers: {
    updateLoading(state: boardsStateInterface) {
      state.loading = !state.loading;
    },
    updateDeleteModalOpen(state: boardsStateInterface) {
      state.deleteModalOpen = !state.deleteModalOpen;
    },
    updateUpdateModalOpen(state: boardsStateInterface) {
      state.updateModalOpen = !state.updateModalOpen;
    },
    updateBoardsData(state: boardsStateInterface, payload: PayloadAction<BoardInterface[] | []>) {
      state.boardsData = payload.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllBoards.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.boardsData = payload as BoardInterface[];
      state.error = '';
    });
    builder.addCase(fetchAllBoards.rejected, (state, { payload }) => {
      state.boardsData = [];
      state.loading = false;
      state.error = payload as string;
    });
    builder.addCase(fetchAllBoards.pending, (state) => {
      state.loading = true;
    });
  },
});

export default boardsStateSlice;
