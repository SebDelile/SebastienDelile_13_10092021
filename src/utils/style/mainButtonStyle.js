import { COLORS } from './COLORS.js';

export const mainButtonStyle = `
  padding: 0.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  background-color: ${COLORS.primary};
  color: white;
  margin-top: 1rem;
  border: 0.125rem outset ${COLORS.primary};

  &:active {
    border-style: inset;
  }
`;
