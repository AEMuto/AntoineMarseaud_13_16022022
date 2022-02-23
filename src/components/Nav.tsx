import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { colors } from '../theme/colors';

export const Nav = () => {
  return (
    <StyledNav>
      <h1 className='sr-only'>Argent Bank</h1>
      <StyledLink to='/'>
        <img src={logo} alt='Argent Bank Logo' />
      </StyledLink>
      <Link to='/sign-in'>
        <FontAwesomeIcon icon={faCircleUser} />
        <span>Sign In</span>
      </Link>

    </StyledNav>
  );
};

const StyledNav = styled.nav`
  padding: 0.5rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 4rem;

  a {
    font-weight: 700;
    color: ${colors.text}
  }

  a:hover {
    text-decoration: underline;
  }

  span {
    margin-left: 0.5rem;
  }

  img {
    width: 11rem;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
`