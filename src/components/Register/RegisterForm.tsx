import { loginPayload } from '../../store/authThunks';
import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { errorState } from '../../store/authSlice';
import styled from 'styled-components';
import { colors } from '../../theme/colors';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Loader from '../Loader';

export type registerFormProps = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFirstName: (e: ChangeEvent<HTMLInputElement>) => void;
  handleLastName: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  error: errorState;
  isLoading: boolean
};

export const RegisterForm = ({
  email,
  firstName,
  lastName,
  password,
  handleEmail,
  handleFirstName,
  handleLastName,
  handlePassword,
  handleSubmit,
  error,
  isLoading,
}: registerFormProps) => {
  const [passwordVisible, togglePassword] = useState(false);
  return (
    <SignUpContainer>
      <FontAwesomeIcon icon={faCircleUser} size='2x' />

      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit} autoComplete='off'>
        {/* Firstname */}
        <div className='input-wrapper'>
          <label htmlFor='firstname'>First Name</label>
          <input
            type='text'
            id='firstname'
            className={error?.firstName ? 'error' : ''} // Change the border to red if there is an error
            value={firstName}
            onChange={handleFirstName}
          />
          {/* Conditionally render the error message */}
          <p className='error-message'>{error?.firstName ? error?.firstName : ''}</p>
        </div>
        {/* Lastname */}
        <div className='input-wrapper'>
          <label htmlFor='lastname'>Last Name</label>
          <input
            type='text'
            id='lastname'
            className={error?.lastName ? 'error' : ''} // Change the border to red if there is an error
            value={lastName}
            onChange={handleLastName}
          />
          {/* Conditionally render the error message */}
          <p className='error-message'>{error?.lastName ? error?.lastName : ''}</p>
        </div>
        {/* Email */}
        <div className='input-wrapper'>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            id='email'
            className={error?.email ? 'error' : ''} // Change the border to red if there is an error
            value={email}
            onChange={handleEmail}
          />
          {/* Conditionally render the error message */}
          <p className='error-message'>{error?.email ? error?.email : ''}</p>
        </div>
        {/* Password */}
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

        <p className='login'>Already have an account? <StyledLink to='/register'>Login</StyledLink></p>
        <button className='sign-up-button' type='submit'>
          {isLoading ? <Loader color='white' size='21px' /> : 'Sign Up'}
        </button>
      </form>
    </SignUpContainer>
  );
};

const StyledLink = styled(Link)`
  color: ${colors.primary};

  &:hover {
    color: ${colors.secondary};
  }
`;

const SignUpContainer = styled.section`
  background-color: ${colors.white};
  margin: auto;
  padding: 2rem;
  min-width: 300px;
  text-align: center;

  h1 {
    font-size: 1.5rem;
    margin: 1.4rem 0 1.6rem 0;
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

  .login {
    margin-top: 3.5rem;
    text-align: left;
  }

  .sign-up-button {
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