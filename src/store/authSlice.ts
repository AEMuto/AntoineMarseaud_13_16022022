import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUserProfile, fetchToken } from './authThunks';
import setLSToken from '../utils/setLSToken';
import getLSToken from '../utils/getLSToken';
import removeLSToken from '../utils/removeLSToken';
import { updateUserProfile } from './userThunk';


export type errorState = {
  email?: string;
  password?: string;
  lastName?: string;
  firstName?: string;
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
    firstName: '',
    lastName: '',
    other: '',
  },
};

/**
 * With createSlice we can easily create actions as well as the reducer.
 * In our case - authSlice - we manage reducers concerning the
 * authentication process in it (and the error state).
 * Asynchronous actions such as fetchToken are created in authThunks.ts,
 * then we handle them as reducer functions in the 'extraReducers' part.
 */
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => { // No need to create a complex reducer for logout, just returning the initial state is enough
      if (getLSToken()) removeLSToken();
      return initialState;
    },
    setToken: (state, action: PayloadAction<string>) => { // for storing the token in the state
      // Used when there is already a token in the local storage (see main.tsx)
      state.token = action.payload;
    },
    // A bunch of reducers to handle the error state manually, like in form control.
    setEmailError: (state, action: PayloadAction<{ email: string }>) => {
      state.error.email = action.payload.email;
    },
    setPasswordError: (state, action: PayloadAction<{ password: string }>) => {
      state.error.password = action.payload.password;
    },
    setLastNameError: (state, action: PayloadAction<{ lastName: string }>) => {
      state.error.lastName = action.payload.lastName;
    },
    setFirstNameError: (state, action: PayloadAction<{ firstName: string }>) => {
      state.error.firstName = action.payload.firstName;
    },
    setOtherError: (state, action: PayloadAction<{ other: string }>) => {
      state.error.other = action.payload.other;
    },
  },
  extraReducers: (builder) => {
    // For each thunk that we have there is 3 possible state because they return a promise
    // as follows: fulfilled, pending, rejected
    builder.addCase(fetchToken.fulfilled, (state, action) => {
      const { token } = action.payload;
      if (action.payload.storeTokenToLS) setLSToken(token); // storeTokenToLS is true then we store it in the Local Storage
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
  setFirstNameError,
  setLastNameError,
  setOtherError,
} = authSlice.actions;
