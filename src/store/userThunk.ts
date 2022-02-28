import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
//TODO: complete updateUserProfile
export const updateUserProfile = createAsyncThunk('user/updateUserProfile', async (payload, {rejectWithValue}) => {
  try {

  } catch(err) {
    const error = err as AxiosError
    if(!error.response) throw err;

  }
})