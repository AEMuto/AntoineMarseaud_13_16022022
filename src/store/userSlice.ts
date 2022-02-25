import {
  createAction,
  createSlice,
  PayloadAction,
  PrepareAction,
} from '@reduxjs/toolkit';

interface UserState {
  connected: boolean;
  token: string;
  email: string;
  firstName: string;
  lastName: string;
}

const initialState: UserState = {
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
    signIn: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    connect: (
      state,
      action: PayloadAction<{
        email: string;
        firstName: string;
        lastName: string;
      }>,
    ) => {
      state.connected = true;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    logout: () => {
      return initialState;
    },
  },
});

export const {signIn, connect, logout} = userSlice.actions

// export const connectUser = createAction(
//   'user/connect',
//   (connected: string, email: string, firstName: string, lastName: string) => {
//     return {
//       payload: { connected, email, firstName, lastName },
//     };
//   },
// );
