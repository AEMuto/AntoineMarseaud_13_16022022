import { Dispatch, FormEvent, SetStateAction } from 'react';
import styled from 'styled-components';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { colors } from '../theme/colors';

type SignInFormProps = {
  name: string;
  password: string;
  isChecked: boolean;
  setName: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  toggleChecked: Dispatch<SetStateAction<boolean>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export const SignInForm = (props: SignInFormProps) => {
  const {
    name,
    password,
    isChecked,
    setName,
    setPassword,
    toggleChecked,
    handleSubmit,
  } = props;

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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
    margin: 1.2rem 0;
  }

  .input-remember {
    display: flex;
  }

  .input-remember label {
    margin-left: 0.25rem;
  }

  .input-wrapper {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-bottom: 1rem;
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
