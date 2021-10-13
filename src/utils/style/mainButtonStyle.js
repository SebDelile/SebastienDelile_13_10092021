import { colors } from './colors.js';

/**
 * the style for the main button.
 * @memberof style
 */
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
