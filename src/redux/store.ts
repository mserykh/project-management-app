import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { globalStateSlice } from './reducers/globalStateSlice';
import boardsStateSlice from './reducers/boards/boardsStateSlice';
const stateReducer = globalStateSlice.reducer;
const boardsReducer = boardsStateSlice.reducer;

const rootReducer = combineReducers({
  stateReducer,
  boardsReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
