import { createSlice } from '@reduxjs/toolkit';
import { UserType } from '../types/types';

const initialState: { user: UserType | null } = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
