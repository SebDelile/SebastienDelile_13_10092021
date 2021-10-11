import styled from 'styled-components';
import propTypes from 'prop-types';

/**
 * the Hero component.
 * Contain a title, text and background image.
 * @namespace Hero
 * @param {object} props.content - the content props passed to the component
 * @param {string} props.content.backgroundImage - the image reference to pass as background
 * @param {string} props.content.title - the title of the hero
 * @param {string} props.content.text - the text of the hero
 * @returns {ReactElement} jsx to be injected in the html
 */
export const Hero = ({ content }) => {
  const { backgroundImage, title, text, purpose } = content;
  return (
    <ComponentWrapper backgroundImage={backgroundImage}>
      <h2 className="sr-only">{purpose}</h2>
      <HeroContent>
        <HeroTitle>{title}</HeroTitle>
        <HeroText>{text}</HeroText>
      </HeroContent>
    </ComponentWrapper>
  );
};

/**
 * The propTypes for the Hero component
 * @memberof Hero
 */
Hero.propTypes = {
  content: propTypes.shape({
    purpose: propTypes.string.isRequired,
    backgroundImage: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
    text: propTypes.string.isRequired,
  }).isRequired,
};

/**
 * Styled-tag section to wrap the hero.
 * @memberof Hero
 */
const ComponentWrapper = styled.section`
  background-image: url(${(props) => props.backgroundImage});
  background-position: 0 -4.125rem;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 18.75rem;
  position: relative;

  @media only screen and (min-width: 57.5rem) {
    height: 25rem;
    background-position: 0% 33%;
  }
`;

/**
 * Styled-tag div to wrap the hero title and text.
 * @memberof Hero
 */
const HeroContent = styled.div`
  position: relative;
  top: 2rem;
  width: 16.5rem;
  background: white;
  padding: 2rem;
  text-align: left;
  margin: 0 auto;

  @media only screen and (min-width: 57.5rem) {
    position: absolute;
    top: 3.125rem;
    right: 3.125rem;
    width: 22.75rem;
    margin: 2rem;
  }
`;

/**
 * Styled-tag h3 : the hero title.
 * @memberof Hero
 */
const HeroTitle = styled.h3`
  font-weight: bold;
  font-size: 1rem;
  white-space: pre-line;

  @media only screen and (min-width: 57.5rem) {
    font-size: 1.5rem;
  }
`;

/**
 * Styled-tag p : the hero text.
 * @memberof Hero
 */
const HeroText = styled.p`
  margin-top: 1em;
  font-size: 0.9rem;

  @media only screen and (min-width: 57.5rem) {
    font-size: 1.2rem;
  }
`;
