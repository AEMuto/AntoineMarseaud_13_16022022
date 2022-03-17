import { StyledMain } from './container/StyledMain';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../theme/colors';

/**
 * If the user reach for a page that doesn't exist, we display this component,
 * a simple 404 page that suggests going back to the homepage.
 * @constructor
 */
export const NotFound = () => {
  return (
    <NotFoundContainer>
      <h1>404</h1>
      <p>La page que vous recherchez n'existe pas</p>
      <Link to="/">Retourner à la page d'accueil</Link>
    </NotFoundContainer>
  )
}

const NotFoundContainer = styled(StyledMain)`
  justify-content: center;
  align-items: center;
  text-align: center;
  h1 {
    font-size: 6rem;
    color: ${colors.primary};
  }
  p {
    font-size: 1.5rem;
    margin: 2rem;
  }
  a,
  a:visited {
    color: dodgerblue;
    font-size: 1.25rem;
  }
  a:hover {
    text-decoration: underline;
  }
`