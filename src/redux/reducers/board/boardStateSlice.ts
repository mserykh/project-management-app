import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { boardStateInterface } from './types';
import { BoardInterface, ColumnInterface, TaskInterface, UserInterface } from '../../../types';
import {
  fetchBoard,
  createColumn,
  deleteColumn,
  getAllUsers,
  updateColumn,
  changeColumnsOrder,
} from './ActionsBoard';
import { findIndex } from 'lodash';

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
  users: [],
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
    updateColumnData(state: boardStateInterface, payload: PayloadAction<ColumnInterface[]>) {
      console.log('payload', payload);
      state.boardData.columns = payload.payload;
    },
    updateUsers(state: boardStateInterface, payload: PayloadAction<UserInterface[]>) {
      state.users = payload.payload;
    },
    updateTasksData(state: boardStateInterface, payload: PayloadAction<TaskInterface[]>) {
      const columnIndex = findIndex(
        state.boardData.columns,
        (column) => column.id === payload.type
      );
      state.boardData.columns[columnIndex].tasks = payload.payload;
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
    builder.addCase(updateColumn.fulfilled, (state) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(updateColumn.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
    });
    builder.addCase(updateColumn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(changeColumnsOrder.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteColumn.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(deleteColumn.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
    });
    builder.addCase(deleteColumn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, payload) => {
      state.loading = false;
      state.users = payload.payload as UserInterface[];
    });
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllUsers.rejected, (state, payload) => {
      state.loading = false;
      state.error = payload.payload as string;
    });
  },
});

export const {
  updateLoading,
  updateDeleteModalOpen,
  updateUpdateModalOpen,
  updateBoardData,
  updateColumnData,
  updateUsers,
} = boardStateSlice.actions;

export default boardStateSlice.reducer;
