import styled from 'styled-components';
import { useAppSelector } from '../../hooks';
import { colors } from '../../theme/colors';
import Button from '../Button';

const ProfileHeader = () => {
  const { firstName, lastName } = useAppSelector((state) => state.user);
  return (
    <StyledHeader>
      <h1>
        Welcome back
        <br />
        {firstName} {lastName}!
      </h1>
      <Button style={{ padding: '.65rem' }}>Edit Name</Button>
    </StyledHeader>
  );
};

export default ProfileHeader;

const StyledHeader = styled.header`
  color: ${colors.white};
  text-align: center;
  margin-bottom: 2rem;
  h1 {
    margin: 1.35rem 0;
  }
`;
