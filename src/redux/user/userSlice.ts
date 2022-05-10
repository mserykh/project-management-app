import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  id: string;
  login: string;
} | null;

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
    setUser: {
      reducer(state: UserState, action: PayloadAction<UserState>) {
        const { user, isAuthenticated } = action.payload;
        state.user = user;
        state.isAuthenticated = isAuthenticated;
      },
      prepare(user: User, isAuthenticated: boolean) {
        return {
          payload: { user, isAuthenticated },
        };
      },
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
