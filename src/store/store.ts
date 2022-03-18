import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './userSlice';
import { authSlice } from './authSlice';

/**
 * With configureStore() we combine our slices. Currently,
 * we have one for the user and another one for the authentication status.
 * With the next iteration, we should add a slice containing the accounts transactions.
 * Or we could add them to the user's slice.
 */
export const store = configureStore({
  reducer: { user: userSlice.reducer, auth: authSlice.reducer },
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {user: UserState, auth: AuthState}
export type AppDispatch = typeof store.dispatch