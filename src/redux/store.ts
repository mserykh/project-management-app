import { configureStore } from '@reduxjs/toolkit';
import globalStateReducer from './reducers/globalStateSlice';
import userReducer from './user/userSlice';
import boardsReducer from './reducers/boards/boardsStateSlice';
import boardReducer from './reducers/board/boardStateSlice';

export const store = configureStore({
  reducer: {
    globalStateReducer,
    userReducer,
    boardsReducer,
    boardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
