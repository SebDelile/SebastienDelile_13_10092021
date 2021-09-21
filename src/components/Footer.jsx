import styled from 'styled-components';

export const Footer = () => (
  <ComponentWrapper>
    <Disclaimer>Copyright 2020 Argent Bank</Disclaimer>
  </ComponentWrapper>
);

/**
 * Styled-tag footer to wrap footer content
 * @memberof Footer
 */
const ComponentWrapper = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 2px solid #ccc;
  padding: 2rem 0 1.5rem;
`;

/**
 * Styled tag p containing the disclaimer text
 * @memberof Footer
 */
const Disclaimer = styled.p``;
