import styled from 'styled-components';
import { colors } from '../../theme/colors';

type StyledMainProps = {
  background?: boolean;
};

export const StyledMain = styled.main`
  background-color: ${({ background }: StyledMainProps) =>
    background ? colors.background : 'none'};
  flex: 1;
  display: flex;
  flex-direction: column;
`;
