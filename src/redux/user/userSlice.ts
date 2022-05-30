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

function getUserFromLocalStorage(): User | null {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  return user;
}

const initialState: UserState = {
  user: getUserFromLocalStorage(),
  isAuthenticated: !!getUserFromLocalStorage(),
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
    updateUserData: {
      reducer(state: UserState, action: PayloadAction<User>) {
        const user = action.payload as User;
        state.user = user;
      },
      prepare(user: User) {
        return {
          payload: user,
        };
      },
    },
  },
});

export const { setUser, updateUserData } = userSlice.actions;

export default userSlice.reducer;
