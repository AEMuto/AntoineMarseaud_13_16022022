import styled from 'styled-components';
import { useAppSelector } from '../../hooks';
import { colors } from '../../theme/colors';
import Button from '../Button';
import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import { errorState } from '../../store/authSlice';

type ProfileHeaderProps = {
  isEditing: boolean;
  toggleEditing: Dispatch<SetStateAction<boolean>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleFirstName: (e: ChangeEvent<HTMLInputElement>) => void;
  handleLastName: (e: ChangeEvent<HTMLInputElement>) => void;
  error: errorState;
};

const ProfileHeader = ({
  isEditing,
  toggleEditing,
  handleSubmit,
  handleFirstName,
  handleLastName,
  error
}: ProfileHeaderProps) => {
  const { firstName, lastName } = useAppSelector((state) => state.user);

  return (
    <StyledHeader>
      {isEditing ? (
        <>
          <h1 className="editing">Welcome back</h1>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className='input-container'>
            <div className='input-wrapper'>
              <input
              type='text'
              placeholder={firstName}
              onChange={handleFirstName}
            />
              <p className='error-message'>
                {error.firstName ? error.firstName : ''}
              </p>
            </div>
            <div className='input-wrapper'>
              <input
              type='text'
              placeholder={lastName}
              onChange={handleLastName}
            />
              <p className='error-message'>
                {error.lastName ? error.lastName : ''}
              </p>
            </div>
            </div>
          <ButtonWrapper>
            <Button
              style={{ padding: '.65rem' }}
              type="submit"
              onClick={handleSubmit}>
              Save
            </Button>
            <Button
              style={{ padding: '.65rem', marginLeft: '1rem' }}
              onClick={() => toggleEditing(false)}>
              Cancel
            </Button>
          </ButtonWrapper>
          </form>
        </>
      ) : (
        <>
          <h1>
            Welcome back
            <br />
            {firstName} {lastName}!
          </h1>
          <Button
            style={{ padding: '.65rem', alignSelf: 'center' }}
            onClick={() => toggleEditing(true)}>
            Edit Name
          </Button>
        </>
      )}
    </StyledHeader>
  );
};

export default ProfileHeader;

const StyledHeader = styled.header`
  color: ${colors.white};
  text-align: center;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  min-height: 11rem;
  justify-content: space-between;

  h1 {
    margin: 1.35rem 0;
  }
  h1.editing {
    margin: 1.35rem 0 0 0;
  }
  form {
    flex: 1;
    margin: 1.25rem auto 0 auto;
    display: flex;
    width: 80%;
    max-width: 50rem;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
  }
  input {
    padding: 5px;
    font-size: 1.2rem;
    width: 100%;
    max-width: 10rem;

  }
  .input-wrapper {
    display: flex;
    flex-direction: column;
    text-align: left;
    &:nth-of-type(1) {
      margin-right: 1rem;
    }
  }
  .input-container {
    display: flex;
    
  }
`;

const ButtonWrapper = styled.div``;
