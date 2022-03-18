import { createSlice } from '@reduxjs/toolkit';
import { fetchUserProfile } from './authThunks';
import { updateUserProfile } from './userThunk';
import { logout } from './authSlice';

export type userProfile = {
  firstName: string;
  lastName: string;
}

export type userState = userProfile & {
  email: string;
};

const initialState: userState = {
  email: '',
  firstName: '',
  lastName: '',
};

/**
 * Slice that handle all things concerning the user's information.
 * It should contain the future user's accounts data we'll create in
 * the next iteration. Currently, we use the mock/mockAccounts.ts
 */
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
    builder.addCase(updateUserProfile.fulfilled, (state,action) => {
      const {firstName, lastName} = action.payload;
      state.firstName = firstName
      state.lastName = lastName
    });
    builder.addCase(logout, () => {
      return initialState
    })
  },
});
