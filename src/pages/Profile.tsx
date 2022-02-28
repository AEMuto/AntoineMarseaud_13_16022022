import { StyledMain } from './container/StyledMain';
import ProfileHeader from '../components/Profile/ProfileHeader';
import { mockAccounts } from '../mock/mockAccounts';
import ProfileAccount from '../components/Profile/ProfileAccount';
import { nanoid } from '@reduxjs/toolkit';

export const Profile = () => {
  return (
    <StyledMain background={true}>
      <ProfileHeader/>
      <h2 className="sr-only">Accounts</h2>
      {mockAccounts.map(account => {
        return <ProfileAccount key={nanoid()} data={account} />
      })}
    </StyledMain>
  );
};
