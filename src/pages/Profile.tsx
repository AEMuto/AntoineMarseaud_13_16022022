import { StyledMain } from './container/StyledMain';
import ProfileHeader from '../components/Profile/ProfileHeader';
import { mockAccounts } from '../mock/mockAccounts';
import ProfileAccount from '../components/Profile/ProfileAccount';
import { nanoid } from '@reduxjs/toolkit';
import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { updateUserProfile } from '../store/userThunk';

export const Profile = () => {
  const [isEditing, toggleEditing] = useState(false);
  const [formFirstName, setFormFirstName] = useState('');
  const [formLastName, setFormLastName] = useState('');
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formFirstName || !formLastName) return;
    dispatch(
      updateUserProfile({
        firstName: formFirstName,
        lastName: formLastName,
        token,
      }),
    );
    toggleEditing(false);
  };

  return (
    <StyledMain background={true}>
      <ProfileHeader
        isEditing={isEditing}
        toggleEditing={toggleEditing}
        handleSubmit={handleSubmit}
        setFormFirstName={setFormFirstName}
        setFormLastName={setFormLastName}
      />
      <h2 className="sr-only">Accounts</h2>
      {mockAccounts.map((account) => {
        return <ProfileAccount key={nanoid()} data={account} />;
      })}
    </StyledMain>
  );
};
