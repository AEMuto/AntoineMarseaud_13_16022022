import styled from 'styled-components';
import { colors } from '../theme/colors';

export const Footer = () => {
  return (
    <StyledFooter>
      <p>Copyright 2020 Argent Bank</p>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  min-height: 4.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 2px solid ${colors.grey};
`;