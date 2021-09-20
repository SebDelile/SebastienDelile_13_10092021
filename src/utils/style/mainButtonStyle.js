import { colors } from './colors.js';

export const mainButtonStyle = `
  padding: 0.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  background-color: ${colors.primary};
  color: white;
  margin-top: 1rem;
  border: 0.125rem outset ${colors.primary};

  &:active {
    border-style: inset;
  }
`;
