import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { userProfile } from './userSlice';
import { customError } from './authThunks';
import api from '../services/api';

type updateUserProfilePayload = userProfile & {
  token: string;
};

/**
 * Thunk handling the modification of a user first name & last name.
 */
export const updateUserProfile = createAsyncThunk<
  userProfile, // Return values
  updateUserProfilePayload,
  customError
>(
  'user/updateUserProfile',
  async (payload, { rejectWithValue }) => {
    try {

      const response = await api.put(
        'profile',
        { firstName: payload.firstName, lastName: payload.lastName },
        {
          headers: { Authorization: `Bearer ${payload.token}` },
        },
      );

      const { lastName, firstName } = response.data.body;
      return { lastName, firstName };
    } catch (err) {
      const error = err as AxiosError;
      if (!error.response) throw err;
      const { message } = error.response.data;
      return rejectWithValue({
        other: message,
      });
    }
  },
);
