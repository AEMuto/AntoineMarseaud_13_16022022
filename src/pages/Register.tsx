import { StyledMain } from './container/StyledMain';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Navigate } from 'react-router-dom';
import validateInput from '../utils/validateInput';
import { setEmailError, setFirstNameError, setLastNameError, setPasswordError } from '../store/authSlice';
import { RegisterForm } from '../components/Register/RegisterForm';

export const Register = () => {
  const { isConnected, isLoading, error } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailValidation = validateInput(email, 'email');
    const passwordValidation = validateInput(password, 'password');
    const firstNameValidation = validateInput(firstName, 'name');
    const lastNameValidation = validateInput(lastName, 'name');

    if (!emailValidation.valid) {
      dispatch(setEmailError({ email: emailValidation.message }));
    }

    if (!passwordValidation.valid) {
      dispatch(setPasswordError({ password: passwordValidation.message }));
    }

    if (!firstNameValidation.valid) {
      dispatch(setFirstNameError({ firstName: firstNameValidation.message }));
    }

    if (!lastNameValidation.valid) {
      dispatch(setLastNameError({ lastName: lastNameValidation.message }));
    }

    if (
      emailValidation.valid &&
      passwordValidation.valid &&
      firstNameValidation.valid &&
      lastNameValidation.valid
    ) {
      console.log('submitting: create user');
    }
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => { // Refers to the onChange attribute we declare on the input.
    if (error.email) {
      dispatch(setEmailError({ email: '' })); // We reset the error state when the user begin to type in the field.
    }
    setEmail(e.target.value); // We store the field value in our state.
  };

  const handleFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    if (error.firstName) {
      dispatch(setFirstNameError({ firstName: '' }));
    }
    setFirstName(e.target.value);
  };

  const handleLastName = (e: ChangeEvent<HTMLInputElement>) => {
    if (error.lastName) {
      dispatch(setLastNameError({ lastName: '' }));
    }
    setLastName(e.target.value);
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
        firstName={firstName}
        lastName={lastName}
        password={password}
        handleEmail={handleEmail}
        handleFirstName={handleFirstName}
        handleLastName={handleLastName}
        handlePassword={handlePassword}
        handleSubmit={handleSubmit}
        error={error}
        isLoading={isLoading}
      />
    </StyledMain>
  );
};
