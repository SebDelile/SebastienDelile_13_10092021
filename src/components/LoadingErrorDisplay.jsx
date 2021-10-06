import styled from 'styled-components';
import errorLogo from '../assets/error-logo-alt.png';

/**
 * the Loading display error component to be displayed when an error occurs during loading of data.
 * Contain a image and text, color is from the props.
 * @namespace LoadingErrorDisplay
 * @param {string} props.color - the color passed to the component and used as font color (ex: '#FFFFFF')
 * @returns {ReactElement} jsx to be injected in the html
 */
export const LoadingErrorDisplay = ({ color }) => {
  return (
    <ComponentWrapper>
      <Image src={errorLogo} alt="Error logo" />
      <Title color={color}>
        Sorry, the data you requested are unavailable, please try again later.
      </Title>
    </ComponentWrapper>
  );
};

/**
 * The style for the ComponentWrapper part of the LoadingErrorDisplay component.
 * @memberof LoadingErrorDisplay
 */
const ComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
`;

/**
 * The style for the Title part of the LoadingErrorDisplay component.
 * @memberof LoadingErrorDisplay
 */
const Title = styled.h3`
  width: 100%;
  text-align: center;
  margin-top: 1.25rem;
  font-size: 1.25rem;
  color: ${(props) => props.color};
`;

/**
 * Styled-tag img for the banner image of the LoadingErrorDisplay component.
 * @memberof LoadingErrorDisplay
 */
const Image = styled.img`
  height: 7.5rem;

  @media only screen and (min-width: 57.5rem) {
    height: 10rem;
  }
`;
