import { configureStore } from '@reduxjs/toolkit';
import globalStateReducer from './reducers/globalStateSlice';
import userReducer from './user/userSlice';
import boardsReducer from './reducers/boards/boardsStateSlice';

export const store = configureStore({
  reducer: {
    globalStateReducer,
    userReducer,
    boardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
