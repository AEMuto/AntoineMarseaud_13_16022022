import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  connected: false,
  token: '',
  email: '',
  firstName: '',
  lastName: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.connected = true;
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    logout: () => {
      return initialState;
    },
  },
});
