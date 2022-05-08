import { configureStore } from '@reduxjs/toolkit';
import globalStateReducer from './reducers/globalStateSlice';
import userReducer from './user/userSlice';

export const store = configureStore({
  reducer: {
    globalStateReducer,
    userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
