import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUserProfile, fetchToken } from './authThunks';
import setLSToken from '../utils/setLSToken';
import getLSToken from '../utils/getLSToken';
import removeLSToken from '../utils/removeLSToken';
import { updateUserProfile } from './userThunk';

//TODO: displace error state in its own slice ?

export type errorState = {
  email?: string;
  password?: string;
  other?: string;
};

export type authState = {
  isLoading: boolean;
  isConnected: boolean;
  token: string;
  error: errorState;
};

const initialState: authState = {
  isLoading: false,
  isConnected: false,
  token: '',
  error: {
    email: '',
    password: '',
    other: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      if (getLSToken()) removeLSToken();
      return initialState;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setEmailError: (state, action) => {
      state.error.email = action.payload.email;
    },
    setPasswordError: (state, action) => {
      state.error.password = action.payload.password;
    },
    setOtherError: (state, action) => {
      state.error.other = action.payload.other;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchToken.fulfilled, (state, action) => {
      const { token } = action.payload;
      if (action.payload.storeTokenToLS) setLSToken(token);
      state.token = token;
      state.isLoading = false;
    });
    builder.addCase(fetchToken.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchToken.rejected, (state, action) => {
      console.log(action.payload);
      if (action.payload) state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchUserProfile.fulfilled, (state) => {
      state.isConnected = true;
      state.isLoading = false;
    });
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      if (action.payload) state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(updateUserProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserProfile.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      if (action.payload) state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export const {
  logout,
  setToken,
  setEmailError,
  setPasswordError,
  setOtherError,
} = authSlice.actions;
