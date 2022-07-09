import { StyledMain } from './container/StyledMain';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Navigate } from 'react-router-dom';
import validateInput from '../utils/validateInput';
import { setEmailError, setPasswordError } from '../store/authSlice';
import { RegisterForm } from '../components/Register/RegisterForm';

//TODO: Make the register form

export const Register = () => {
  const { isConnected, isLoading, error } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailValidation = validateInput(email, 'email')
    const passwordValidation = validateInput(password, 'password')

    if (!emailValidation.valid) {
      dispatch(setEmailError({ email: emailValidation.message }));
    }

    if (!passwordValidation.valid) {
      dispatch(setPasswordError({ password: passwordValidation.message }));
    }

    if (emailValidation.valid && password) {
      console.log('submitting: create user')
    }
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => { // Refers to the onChange attribute we declare on the input.
    if (error.email) {
      dispatch(setEmailError({ email: '' })); // We reset the error state when the user begin to type in the field.
    }
    setEmail(e.target.value); // We store the field value in our state.
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    if (error.password) {
      dispatch(setPasswordError({ password: '' }));
    }
    setPassword(e.target.value);
  };

  if (isConnected) {
    return <Navigate to='/profile' />;
  }

  return (
    <StyledMain background={true}>
      <RegisterForm
        email={email}
        password={password}
        handleEmail={handleEmail}
        handlePassword={handlePassword}
        handleSubmit={handleSubmit}
        error={error}
        isLoading={isLoading}
      />
    </StyledMain>
  );
};
