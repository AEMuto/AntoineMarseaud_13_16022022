import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { colors } from '../theme/colors';

import { loginError } from '../services/useLogin';

type SignInFormProps = {
  email: string;
  password: string;
  isChecked: boolean;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  toggleChecked: Dispatch<SetStateAction<boolean>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  error: loginError | null;
  isLoading: boolean;
};

export const SignInForm = (props: SignInFormProps) => {
  const {
    email,
    password,
    isChecked,
    setEmail,
    setPassword,
    toggleChecked,
    handleSubmit,
    error,
    isLoading,
  } = props;

  const [formError, setFormError] = useState(error);

  useEffect(() => {
    setFormError(error);
  }, [error]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFormError(null);
  };

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
            className={formError?.for === 'email' ? 'error' : ''}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
            onFocus={handleFocus}
          />
          <p className="error-message">
            {formError?.for === 'email' ? error?.message : ''}
          </p>
        </div>

        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className={formError?.for === 'password' ? 'error' : ''}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
            onFocus={handleFocus}
          />
          <p className="error-message">
            {formError?.for === 'password' ? error?.message : ''}
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
          Sign In
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
