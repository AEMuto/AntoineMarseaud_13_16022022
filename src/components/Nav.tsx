import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleUser,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { colors } from '../theme/colors';
import { useAppDispatch, useAppSelector } from '../hooks';
import { logout } from '../store/authSlice';

export const Nav = () => {
  const { isConnected } = useAppSelector((state) => state.auth);
  const { firstName } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  return (
    <StyledNav>
      <h1 className="sr-only">Argent Bank</h1>
      <StyledLink to="/">
        <img src={logo} alt="Argent Bank Logo" />
      </StyledLink>
      {isConnected ? (
        <div className="linksContainer">
          <Link to="/profile">
            <FontAwesomeIcon icon={faCircleUser} />
            <span>{firstName}</span>
          </Link>
          <Link to="/" onClick={() => dispatch(logout())}>
            <FontAwesomeIcon icon={faRightFromBracket} />
            <span>Sign Out</span>
          </Link>
        </div>
      ) : (
        <Link to="/login">
          <FontAwesomeIcon icon={faCircleUser} />
          <span>Sign In</span>
        </Link>
      )}
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
    color: ${colors.text};
  }

  a:hover {
    text-decoration: underline;
  }
.linksContainer {
  a:nth-of-type(1) {
    margin-right: 1rem;
  }
}
  span {
    margin-left: 0.25rem;
  }

  img {
    width: 11rem;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
