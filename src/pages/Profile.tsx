import { StyledMain } from './container/StyledMain';
import { mockAccounts } from '../mock/mockAccounts';
import ProfileHeader from '../components/Profile/ProfileHeader';
import ProfileAccount from '../components/Profile/ProfileAccount';
import { nanoid } from '@reduxjs/toolkit';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { updateUserProfile } from '../store/userThunk';
import { setFirstNameError, setLastNameError } from '../store/authSlice';
import validateInput from '../utils/validateInput';

/**
 * The profile page stateful component.
 * It displays the user's information, specifically its accounts & a form that allows
 * him to change its first name and last name (see ProfileHeader.tsx).
 * As for the login page we separate the submission logic and the jsx render/styling.
 * @constructor
 */
export const Profile = () => {
  const { token, error } = useAppSelector((state) => state.auth);
  const {firstName, lastName} = useAppSelector((state) => state.user)
  const [isEditing, toggleEditing] = useState(false);
  const [formFirstName, setFormFirstName] = useState('');
  const [formLastName, setFormLastName] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const firstNameValidation = validateInput(formFirstName, 'name');
    const lastNameValidation = validateInput(formLastName, 'name');

    if (!firstNameValidation.valid) {
      dispatch(setFirstNameError({ firstName: firstNameValidation.message }));
    }

    if (!lastNameValidation.valid) {
      dispatch(setLastNameError({ lastName: lastNameValidation.message }));
    }

    if (formLastName === lastName && formFirstName === firstName) {
      toggleEditing(false)
      return
    }

    if (firstNameValidation.valid && lastNameValidation.valid) {
      dispatch(
        updateUserProfile({
          firstName: formFirstName,
          lastName: formLastName,
          token,
        }),
      );
      toggleEditing(false);
    }
  };

  const handleFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    if (error.firstName) {
      dispatch(setFirstNameError({ firstName: '' }));
    }
    setFormFirstName(e.target.value)
  };

  const handleLastName = (e: ChangeEvent<HTMLInputElement>) => {
    if (error.lastName) {
      dispatch(setLastNameError({ lastName: '' }));
    }
    setFormLastName(e.target.value)
  };

  return (
    <StyledMain background={true}>
      <ProfileHeader
        isEditing={isEditing}
        toggleEditing={toggleEditing}
        handleSubmit={handleSubmit}
        handleFirstName={handleFirstName}
        handleLastName={handleLastName}
        error={error}
      />
      <h2 className='sr-only'>Accounts</h2>
      {mockAccounts.map((account) => {
        return <ProfileAccount key={nanoid()} data={account} />;
      })}
    </StyledMain>
  );
};
