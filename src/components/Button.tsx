import React from 'react';
import styled from 'styled-components';
import { colors } from '../theme/colors';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: any;
  style?: React.CSSProperties;
  type?: 'submit' | 'reset';
};

/**
 * A custom button component.
 * @param children
 * @param style
 * @param onClick
 * @param type
 * @constructor
 */
const Button: React.FC<ButtonProps> = ({ children, style, onClick, type }) => {
  return (
    <StyledButton style={style} onClick={onClick} type={type}>
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  border: 2px outset ${colors.primary};
  background-color: ${colors.primary};
  color: ${colors.white};
  font-weight: 700;
  min-width: 4.375rem;
  &:active {
    border-style: inset;
  }
`;
