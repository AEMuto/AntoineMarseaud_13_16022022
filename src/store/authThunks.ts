import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';
import { AxiosError } from 'axios';
import { errorState } from './authSlice';
import { userState } from './userSlice';
import wait from '../utils/wait';

export type loginPayload = {
  email: string;
  password: string;
  isChecked: boolean;
};

type loginReturnValues = {
  token: string;
  storeTokenToLS: boolean;
};

export type customError = {
  rejectValue: errorState;
};

/**
 * Thunk for retrieving the token from the api.
 * The payload correspond to the object sent by
 * the useDispatch hook inside the handleSubmit
 * of the page component Login.tsx
 * rejectWithValue allow us to customize our error (Promise.rejected)
 */
export const fetchToken = createAsyncThunk<
  loginReturnValues,
  loginPayload,
  customError
>('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const { email, password } = payload; // We destructure the email and password from the payload
    // Then we use it to construct the data object we send to the api route 'login'
    // Note: payload also contains the key 'storeTokenToLS' which is a boolean
    // informing us whether we should store the token in local storage or not.
    const response = await api.post('login', { email, password });
    await wait(250)
    // There we check the value of 'storeTokenToLS' and conditionally return an object
    // that we will handle in our reducer in authSlice.ts
    if (payload.isChecked) {
      return { token: response.data.body.token, storeTokenToLS: true };
    }
    return { token: response.data.body.token, storeTokenToLS: false };
  } catch (err) {
    const error = err as AxiosError; // Cast the error for access
    if (!error.response) {
      throw err;
    }
    if (error.response.data.message.includes('User')) {
      console.log(error.response);
      return rejectWithValue({ email: 'User not found' });
    } else if (error.response.data.message.includes('Password')) {
      return rejectWithValue({ password: 'Invalid Password' });
    } else {
      return rejectWithValue({ other: `${error.response.statusText}` });
    }
  }
});

/**
 * Same logic as above, but there we retrieve the user's information.
 * The main difference is the construction of the params we passed in
 * to the post method of our api.
 */
export const fetchUserProfile = createAsyncThunk<
  userState,
  { token: string },
  customError
>('auth/fetchUserProfile', async ({ token }, { rejectWithValue }) => {
  try {
    const response = await api.post('profile', null,{
      headers: { Authorization: `Bearer ${token}` },
    });
    const { email, firstName, lastName } = response.data.body;
    return { email, firstName, lastName };
  } catch (err) {
    const error = err as AxiosError;
    if (!error.response) {
      throw err;
    }
    const { message } = error.response.data;
    if (message.includes('expired')) {
      return rejectWithValue({
        other: 'Last session has expired, please login',
      });
    } else if (message.includes('invalid')) {
      return rejectWithValue({ other: 'Invalid token, please login' });
    } else {
      return rejectWithValue({ other: `${error.response.statusText}` });
    }
  }
});
