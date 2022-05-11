import { configureStore } from '@reduxjs/toolkit';
import globalStateReducer from './reducers/globalStateSlice';
import userReducer from './user/userSlice';
import boardsReducer from './reducers/boards/boardsStateSlice';
import boardReducer from './reducers/board/boardStateSlice';
import columnReducer from './reducers/column/columnStateSlice';

export const store = configureStore({
  reducer: {
    globalStateReducer,
    userReducer,
    boardsReducer,
    boardReducer,
    columnReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
