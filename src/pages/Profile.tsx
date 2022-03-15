import { StyledMain } from './container/StyledMain';
import { mockAccounts } from '../mock/mockAccounts';
import ProfileHeader from '../components/Profile/ProfileHeader';
import ProfileAccount from '../components/Profile/ProfileAccount';
import { nanoid } from '@reduxjs/toolkit';
import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { updateUserProfile } from '../store/userThunk';
import { setFirstNameError, setLastNameError } from '../store/authSlice';
import validateInput from '../utils/validateInput';

export const Profile = () => {
  const { token, error } = useAppSelector((state) => state.auth);
  const [isEditing, toggleEditing] = useState(false);
  const [formFirstName, setFormFirstName] = useState('');
  const [formLastName, setFormLastName] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submit')
    const firstNameValidation = validateInput(formFirstName, 'name')
    console.log(firstNameValidation)
    const lastNameValidation = validateInput(formLastName, 'name')
    console.log(lastNameValidation)

    if (!firstNameValidation.valid) {
      console.log(firstNameValidation.message)
      dispatch(setFirstNameError({ firstName: firstNameValidation.message }));
      return;
    }

    if (!lastNameValidation.valid) {
      dispatch(setLastNameError({ lastName: lastNameValidation.message }));
      return;
    }

    if (formFirstName && formLastName) {
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

  return (
    <StyledMain background={true}>
      <ProfileHeader
        isEditing={isEditing}
        toggleEditing={toggleEditing}
        handleSubmit={handleSubmit}
        setFormFirstName={setFormFirstName}
        setFormLastName={setFormLastName}
        error={error}
      />
      <h2 className='sr-only'>Accounts</h2>
      {mockAccounts.map((account) => {
        return <ProfileAccount key={nanoid()} data={account} />;
      })}
    </StyledMain>
  );
};
