import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { boardStateInterface } from './types';
import { BoardInterface, ColumnInterface } from '../../../types';
import { fetchBoard, createColumn } from './ActionsBoard';

const initialState: boardStateInterface = {
  boardData: {
    id: '',
    title: '',
    description: '',
    columns: [] as ColumnInterface[],
  },
  loading: false,
  deleteModalOpen: false,
  updateModalOpen: false,
  error: '',
};

export const boardStateSlice = createSlice({
  name: 'boardState',
  initialState,
  reducers: {
    updateLoading(state: boardStateInterface) {
      state.loading = !state.loading;
    },
    updateDeleteModalOpen(state: boardStateInterface) {
      state.deleteModalOpen = !state.deleteModalOpen;
    },
    updateUpdateModalOpen(state: boardStateInterface) {
      state.updateModalOpen = !state.updateModalOpen;
    },
    updateBoardData(state: boardStateInterface, payload: PayloadAction<BoardInterface>) {
      state.boardData = payload.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.boardData = payload as BoardInterface;
      state.error = '';
    });
    builder.addCase(fetchBoard.rejected, (state, { payload }) => {
      state.boardData = {} as BoardInterface;
      state.loading = false;
      state.error = payload as string;
    });
    builder.addCase(fetchBoard.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createColumn.fulfilled, (state) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(createColumn.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
    });
    builder.addCase(createColumn.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { updateLoading, updateDeleteModalOpen, updateUpdateModalOpen, updateBoardData } =
  boardStateSlice.actions;

export default boardStateSlice.reducer;
