import styled from 'styled-components';
import { Link } from 'react-router-dom';
import errorLogo from '../assets/error-logo.png';

export const ErrorPage = () => (
  <ComponentWrapper>
    <Image src={errorLogo} alt="Error logo" />
    <Title>Oops ! Something went wrong...</Title>
    <Message>
      Sorry, the page you have requested is not available, please try another
      time.
    </Message>
    <StyledLink to="/">Go back to the home page</StyledLink>
  </ComponentWrapper>
);

/**
 * Styled-tag main for the Error page ComponentWrapper
 * @memberof ErrorPage
 */
const ComponentWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;

  & > * {
    margin: 1rem 0;
    text-align: center;

    @media only screen and (min-width: 57.5rem) {
      margin: 1.5rem;
    }
  }
`;

/**
 * Styled-tag img for the banner image of the error page
 * @memberof ErrorPage
 */
const Image = styled.img`
  height: 7.5rem;

  @media only screen and (min-width: 57.5rem) {
    height: 10rem;
  }
`;

/**
 * Styled-tag h1 for the title of the error page
 * @memberof ErrorPage
 */
const Title = styled.h1`
  font-size: 2rem;

  @media only screen and (min-width: 57.5rem) {
    font-size: 2.5rem;
  }
`;

/**
 * Styled-tag p for the message of the Error page
 * @memberof ErrorPage
 */
const Message = styled.p`
  font-size: 1rem;

  @media only screen and (min-width: 57.5rem) {
    font-size: 1.5rem;
  }
`;

/**
 * Styled-component Link (react-router-dom) of the error page to redirect to the home page
 * @memberof ErrorPage
 */
const StyledLink = styled(Link)`
  font-size: 1rem;
  text-decoration: underline;
`;
