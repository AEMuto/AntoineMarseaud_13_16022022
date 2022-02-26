//TODO: All my logic for authentication should be present there

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoading: boolean
  connected: boolean;
  token: string;
}

const initialState: AuthState = {
  isLoading: false,
  connected: false,
  token: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      return initialState;
    },
  },
  extraReducers: {}
});