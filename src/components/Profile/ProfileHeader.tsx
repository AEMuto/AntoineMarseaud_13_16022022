import styled from 'styled-components';
import { useAppSelector } from '../../hooks';
import { colors } from '../../theme/colors';
import Button from '../Button';
import { Dispatch, FormEvent, SetStateAction } from 'react';

type ProfileHeaderProps = {
  isEditing: boolean;
  toggleEditing: Dispatch<SetStateAction<boolean>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setFormFirstName: Dispatch<SetStateAction<string>>;
  setFormLastName: Dispatch<SetStateAction<string>>;
};

const ProfileHeader = ({
  isEditing,
  toggleEditing,
  handleSubmit,
  setFormFirstName,
  setFormLastName,
}: ProfileHeaderProps) => {
  const { firstName, lastName } = useAppSelector((state) => state.user);

  return (
    <StyledHeader>
      {isEditing ? (
        <>
          <h1 className="editing">Welcome back</h1>
          <form onSubmit={handleSubmit} autoComplete="off">
            <input
              type="text"
              placeholder={firstName}
              onChange={(e) => setFormFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder={lastName}
              onChange={(e) => setFormLastName(e.target.value)}
            />
          </form>
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
  min-height: 164.375px;
  justify-content: space-between;
  h1 {
    margin: 1.35rem 0;
  }
  h1.editing {
    margin: 1.35rem 0 0 0;
  }
  form {
    margin: 1rem auto;
    display: flex;
    width: 80%;
    max-width: 50rem;
    justify-content: center;
  }
  input {
    padding: 5px;
    font-size: 1.2rem;
    width: 100%;
    max-width: 10rem;
    &:nth-of-type(1) {
      margin-right: 1rem;
    }
  }
`;

const ButtonWrapper = styled.div``;
