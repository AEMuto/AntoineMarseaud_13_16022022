import styled from 'styled-components';
import { colors } from '../../theme/colors';

type StyledMainProps = {
  background?: boolean;
  maxWidth?: boolean;
};

/**
 * A stylized main element that wrap each of our pages.
 */
export const StyledMain = styled.main`
  background-color: ${({ background }: StyledMainProps) =>
    background ? colors.background : 'none'};
  max-width: ${({ maxWidth }: StyledMainProps) =>
    maxWidth ? '1280px' : 'none'};
  flex: 1;
  display: flex;
  flex-direction: column;
`;
