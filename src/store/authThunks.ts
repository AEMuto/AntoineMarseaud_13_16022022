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

export const fetchToken = createAsyncThunk<
  loginReturnValues,
  loginPayload,
  customError
>('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const { email, password } = payload;
    const response = await api.post('login', { email, password });
    await wait(250)
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
