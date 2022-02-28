import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import styled from 'styled-components';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { colors } from '../../theme/colors';
import Loader from '../Loader';
import { errorState } from '../../store/authSlice';
import { loginPayload } from '../../store/authThunks';

export type loginFormProps = loginPayload & {
  toggleChecked: Dispatch<SetStateAction<boolean>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  error: errorState;
  isLoading:boolean
};

export const LoginForm = ({
  email,
  password,
  isChecked,
  handleEmail,
  handlePassword,
  toggleChecked,
  handleSubmit,
  error,
  isLoading,
}:loginFormProps) => {
  return (
    <SignInContainer>
      <FontAwesomeIcon icon={faCircleUser} size="2x" />

      <h1>Sign In</h1>

      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className={error?.email ? 'error' : ''}
            value={email}
            onChange={handleEmail}
          />
          <p className="error-message">{error?.email ? error?.email : ''}</p>
        </div>

        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className={error?.password ? 'error' : ''}
            value={password}
            onChange={handlePassword}
          />
          <p className="error-message">
            {error?.password ? error?.password : ''}
          </p>
        </div>

        <div className="input-remember">
          <input
            type="checkbox"
            id="remember-me"
            checked={isChecked}
            onChange={(e) => toggleChecked(e.target.checked)}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>

        <button className="sign-in-button" type="submit">
          {isLoading ? <Loader color="white" size="21px" /> : 'Sign In'}
        </button>
      </form>
    </SignInContainer>
  );
};

const SignInContainer = styled.section`
  background-color: ${colors.white};
  margin: auto;
  padding: 2rem;
  min-width: 300px;
  text-align: center;

  h1 {
    font-size: 1.5rem;
    margin: 1.4rem 0 1.6rem 0;
  }

  .error-message {
    color: red;
    height: 0.5rem;
    margin: 0.5rem 0;
  }

  input.error {
    color: red;
    border-color: red;
  }

  .input-remember {
    display: flex;
    align-items: center;
  }

  .input-remember label {
    margin-left: 0.25rem;
  }

  .input-wrapper {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-bottom: 0.8rem;
  }

  .input-wrapper label {
    font-weight: bold;
  }

  .input-wrapper input {
    padding: 5px;
    font-size: 1.2rem;
  }

  .sign-in-button {
    display: block;
    width: 100%;
    padding: 8px;
    font-size: 1.1rem;
    font-weight: bold;
    margin-top: 1rem;
    border-color: ${colors.primary};
    background-color: ${colors.primary};
    color: ${colors.white};
  }
`;
