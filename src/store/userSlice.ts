import { createSlice } from '@reduxjs/toolkit';
import { fetchUserProfile } from './authThunks';

export type userState = {
  email: string;
  firstName: string;
  lastName: string;
};

const initialState: userState = {
  email: '',
  firstName: '',
  lastName: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      const { email, firstName, lastName } = action.payload;
      state.email = email;
      state.firstName = firstName;
      state.lastName = lastName;
    });
  },
});
