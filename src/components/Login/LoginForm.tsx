import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { faCircleUser, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
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
  isLoading: boolean
};

/**
 * The LoginForm component. It's main purpose is to render the jsx and stylize it.
 * The submission logic is handled by its parent, the Login page.
 * It's a way to apply the Separation of Concerns principle.
 * Maybe it's not that much efficient, but I find it easier to look
 * just at the Login page when there is a login problem.
 * @param email
 * @param password
 * @param isChecked
 * @param handleEmail
 * @param handlePassword
 * @param toggleChecked
 * @param handleSubmit
 * @param error
 * @param isLoading
 * @constructor
 */
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
}: loginFormProps) => {
  // We have delegated most of the logic of this component to its parent
  // but for the case of toggling the password visibility we handle it
  // there, as it has no effect on the submission.
  const [passwordVisible, togglePassword] = useState(false);
  return (
    <SignInContainer>
      <FontAwesomeIcon icon={faCircleUser} size='2x' />

      <h1>Sign In</h1>

      <form onSubmit={handleSubmit} autoComplete='off'>
        <div className='input-wrapper'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            className={error?.email ? 'error' : ''} // Change the border to red if there is an error
            value={email}
            onChange={handleEmail}
          />
          {/* Conditionally render the error message */}
          <p className='error-message'>{error?.email ? error?.email : ''}</p>
        </div>

        <div className='input-wrapper'>
          <label htmlFor='password'>Password</label>
          <input
            type={passwordVisible ? 'text' : 'password'} // Here we change the type of the input to make the password visible
            id='password'
            className={error?.password ? 'error' : ''}
            value={password}
            onChange={handlePassword}
          />
          <div className='icon-wrapper'>
            <FontAwesomeIcon
              icon={passwordVisible ? faEye : faEyeSlash} // We change the icon depending on the pwd visibility
              onClick={() => togglePassword(!passwordVisible)} // It's there that we toggle the boolean value of passwordVisible
              style={{ cursor: 'pointer' }}
            />
          </div>
          <p className='error-message'>
            {error?.password ? error?.password : ''}
          </p>
        </div>

        <div className='input-remember'>
          <input
            type='checkbox'
            id='remember-me'
            checked={isChecked}
            onChange={(e) => toggleChecked(e.target.checked)}
          />
          <label htmlFor='remember-me'>Remember me</label>
        </div>

        <button className='sign-in-button' type='submit'>
          {isLoading ? <Loader color='white' size='21px' /> : 'Sign In'}
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
    position: relative;
  }

  .input-wrapper label {
    font-weight: bold;
  }

  .input-wrapper input {
    padding: 5px;
    font-size: 1.2rem;
  }

  .icon-wrapper {
    position: absolute;
    right: 0.5rem;
    top: 18px;
    height: 34px;
    width: 34px;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
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
