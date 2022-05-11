import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { columnStateInterface } from './types';
import { ColumnInterface, TaskInterface } from '../../../types';
import { createColumn } from './ActionsColumn';

const initialState: columnStateInterface = {
  columnData: {
    id: '',
    title: '',
    order: 1,
    tasks: [] as TaskInterface[],
  },
  loading: false,
  deleteModalOpen: false,
  updateModalOpen: false,
  error: '',
};

export const columnStateSlice = createSlice({
  name: 'columnState',
  initialState,
  reducers: {
    updateLoading(state: columnStateInterface) {
      state.loading = !state.loading;
    },
    updateDeleteModalOpen(state: columnStateInterface) {
      state.deleteModalOpen = !state.deleteModalOpen;
    },
    updateUpdateModalOpen(state: columnStateInterface) {
      state.updateModalOpen = !state.updateModalOpen;
    },
    updateColumnData(state: columnStateInterface, payload: PayloadAction<ColumnInterface>) {
      state.columnData = payload.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createColumn.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.columnData = payload as ColumnInterface;
      state.error = '';
    });
    builder.addCase(createColumn.rejected, (state, { payload }) => {
      state.columnData = {} as ColumnInterface;
      state.loading = false;
      state.error = payload as string;
    });
    builder.addCase(createColumn.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { updateLoading, updateDeleteModalOpen, updateUpdateModalOpen, updateColumnData } =
  columnStateSlice.actions;

export default columnStateSlice.reducer;
