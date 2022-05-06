import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { globalStateSlice } from './reducers/globalStateSlice';
const stateReducer = globalStateSlice.reducer;
const rootReducer = combineReducers({
  stateReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
