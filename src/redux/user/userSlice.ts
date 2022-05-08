import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  user: {
    id: string;
    login: string;
  } | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state: UserState, action: PayloadAction<any>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    userLogout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
