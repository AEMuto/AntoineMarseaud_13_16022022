import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleUser,
  faRightFromBracket,
  faBars,
  faX
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { colors } from '../theme/colors';
import { useAppDispatch, useAppSelector } from '../hooks';
import { logout } from '../store/authSlice';
import { useState } from 'react';

export const Nav = () => {
  const { isConnected } = useAppSelector((state) => state.auth);
  const { firstName } = useAppSelector((state) => state.user);
  const [linksVisible, toggleLinks] = useState(false);
  const dispatch = useAppDispatch();
  return (
    <StyledNav>
      <h1 className='sr-only'>Argent Bank</h1>
      <StyledLink to='/'>
        <img src={logo} alt='Argent Bank Logo' />
      </StyledLink>
      {isConnected ? (
        <>
          <FontAwesomeIcon
            icon={linksVisible ? faX : faBars}
            size="lg"
            onClick={() => toggleLinks(!linksVisible)}
            className="menu-icon"
          />
          <div className={linksVisible ? 'linksContainer visible' : 'linksContainer'}>
            <Link to='/profile'>
              <FontAwesomeIcon icon={faCircleUser} />
              <span>{firstName}</span>
            </Link>
            <Link to='/' onClick={() => dispatch(logout())}>
              <FontAwesomeIcon icon={faRightFromBracket} />
              <span>Sign Out</span>
            </Link>
          </div>
        </>
      ) : (
        <Link to='/login'>
          <FontAwesomeIcon icon={faCircleUser} />
          <span>Sign In</span>
        </Link>
      )}
    </StyledNav>
  );
};

const navHeight = 4;

const StyledNav = styled.nav`
  padding: 0.5rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: ${navHeight}rem;
  position: relative;

  a {
    font-weight: 700;
    color: ${colors.text};
  }

  a:hover {
    text-decoration: underline;
  }
  .menu-icon {
    width: 2rem;
    cursor: pointer;
    @media (min-width: 720px) {
      display: none;
      pointer-events: none;
    }
  }
  .linksContainer {
    position: absolute;
    padding: 1.25rem;
    right: 1rem;
    top: ${navHeight + 1}rem;
    display: flex;
    pointer-events: none;
    opacity: 0;
    flex-direction: column;
    background-color: ${colors.white};
    box-shadow: 
            rgba(0, 0, 0, 0.16) 0 10px 36px 0, 
            rgba(0, 0, 0, 0.06) 0 0 0 1px;
    z-index: 999;
    transition: opacity ease-in-out .25s;

    a:nth-of-type(1) {
      margin-right: 1rem;
      margin-bottom: 1rem;
    }
    @media (min-width: 720px) {
      opacity: 1;
      position: unset;
      display: block;
      box-shadow: unset;
      pointer-events: all;
      transition: unset;
    }
  }
  
  .linksContainer.visible {
    opacity: 1;
    pointer-events: all;
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
