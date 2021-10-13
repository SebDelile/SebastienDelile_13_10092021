import styled from 'styled-components';

/**
 * @namespace Footer
 */

/**
 * the Footer component
 * @memberof Footer
 * @function
 * @returns {ReactElement} jsx to be injected in the html.
 */
export const Footer = () => (
  <ComponentWrapper>
    <p>Copyright 2020 Argent Bank</p>
  </ComponentWrapper>
);

/**
 * Styled-tag footer to wrap footer content.
 * @memberof Footer
 */
const ComponentWrapper = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 2px solid #ccc;
  padding: 2rem 0 1.5rem;
`;
