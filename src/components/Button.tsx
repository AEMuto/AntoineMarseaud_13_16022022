import React from 'react';
import styled from 'styled-components';
import { colors } from '../theme/colors';

const Button = ({
  children,
  style,

}: {
  children: React.ReactNode;
  style?: React.CSSProperties;

}) => {
  return <StyledButton  style={style}>{children}</StyledButton>;
};

export default Button;

const StyledButton = styled.button`
  border: 2px outset ${colors.primary};
  background-color: ${colors.primary};
  color: ${colors.white};
  font-weight: 700;
  &:active {
    border-style: inset;
  }
`;
