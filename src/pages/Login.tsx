import { StyledMain } from './container/StyledMain';
import { LoginForm } from '../components/Login/LoginForm';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setEmailError, setPasswordError } from '../store/authSlice';
import { fetchUserProfile, fetchToken } from '../store/authThunks';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, toggleChecked] = useState(false);
  const { isLoading, isConnected, token, error } = useAppSelector(
    (state) => state.auth,
  );

  const dispatch = useAppDispatch();

  // There is a token in the store, then we should request the user's info
  useEffect(() => {
    if (!token) return;
    dispatch(fetchUserProfile({ token }));
  }, [token]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      dispatch(setEmailError({ email: 'This field is required' }));
    }
    if (!password) {
      dispatch(setPasswordError({ password: 'This field is required' }));
    }
    if (email && password) {
      dispatch(fetchToken({ email, password, isChecked }));
    }
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    if (error.email) {
      dispatch(setEmailError({ email: '' }));
    }
    setEmail(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    if (error.password) {
      dispatch(setPasswordError({ password: '' }));
    }
    setPassword(e.target.value);
  };

  if (isConnected) {
    return <Navigate to="/profile" />;
  }

  return (
    <StyledMain background={true}>
      <LoginForm
        email={email}
        password={password}
        isChecked={isChecked}
        toggleChecked={toggleChecked}
        handleEmail={handleEmail}
        handlePassword={handlePassword}
        handleSubmit={handleSubmit}
        error={error}
        isLoading={isLoading}
      />
    </StyledMain>
  );
};
