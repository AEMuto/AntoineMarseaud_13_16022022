import { StyledMain } from './container/StyledMain';
import { LoginForm } from '../components/Login/LoginForm';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setEmailError, setPasswordError } from '../store/authSlice';
import { fetchUserProfile, fetchToken } from '../store/authThunks';
import validateInput from '../utils/validateInput';

/**
 * Our login page. A stateful component that render and control the sign-in form.
 * The form submission and control is handled here.
 * The jsx and the styling are done in its child component: LoginForm.tsx
 * @constructor
 */
export const Login = () => {
  const [email, setEmail] = useState('tony@stark.com');
  const [password, setPassword] = useState('password123');
  const [isChecked, toggleChecked] = useState(false);
  const { isLoading, isConnected, token, error } = useAppSelector(
    (state) => state.auth,
  );

  const dispatch = useAppDispatch();

  // We need to know if there is a token already in the store.
  // If that's the case, we should retrieve the user's information.
  useEffect(() => {
    if (!token) return;
    dispatch(fetchUserProfile({ token }));
  }, [token]);

  /**
   * Network calls are costly we should manage error as much as we can
   * on the client side. We submit only if the fields are validated by
   * our validateInput utilitarian function.
   * @param e
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailValidation = validateInput(email, 'email')
    // We don't validate the password the same way as the email
    // because current users in the DB doesn't have password
    // that follow the 2022 security guidelines.
    if (!emailValidation.valid) {
      dispatch(setEmailError({ email: emailValidation.message }));
    }

    if (!password) {
      dispatch(setPasswordError({ password: 'This field is required' }));
    }

    if (emailValidation.valid && password) {
      dispatch(fetchToken({ email, password, isChecked }));
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

  // Our state indicate the user is connected, so we redirect him to its profile page.
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
