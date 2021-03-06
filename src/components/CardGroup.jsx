import styled from 'styled-components';
import propTypes from 'prop-types';
import { colors } from '../utils/style/colors.js';

/**
 * @namespace CardGroup
 */

/**
 * the CardGroup component, wrapper of the card elements.
 * @memberof CardGroup
 * @function
 * @returns {ReactElement} jsx to be injected in the html
 */
export const CardGroup = ({ content }) => {
  const { cardArray, purpose } = content;
  return (
    <ComponentWrapper>
      <h2 className="sr-only">{purpose}</h2>
      {cardArray.map((card, index) => (
        <Card key={index}>
          <CardImage src={card.image} alt={card.alt} />
          <CardTitle>{card.title}</CardTitle>
          <CardText>{card.text}</CardText>
        </Card>
      ))}
    </ComponentWrapper>
  );
};

/**
 * The propTypes for the Cardgroup component
 * @memberof CardGroup
 */
CardGroup.propTypes = {
  content: propTypes.shape({
    purpose: propTypes.string.isRequired,
    cardArray: propTypes.arrayOf(
      propTypes.shape({
        image: propTypes.string.isRequired,
        alt: propTypes.string.isRequired,
        title: propTypes.string.isRequired,
        text: propTypes.string.isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
};

/**
 * Styled-tag section to wrap the Card's group.
 * @memberof CardGroup
 */
const ComponentWrapper = styled.section`
  display: flex;
  flex-direction: column;

  @media only screen and (min-width: 57.5rem) {
    flex-direction: row;
  }
`;

/**
 * Styled-tag article to wrap the Card.
 * @memberof CardGroup
 */
const Card = styled.article`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 2.5rem;
`;

/**
 * Styled-tag img : the heading icon of the card.
 * @memberof CardGroup
 */
const CardImage = styled.img`
  width: 9.5rem;
  border: 0.625rem solid ${colors.primary};
  border-radius: 50%;
  padding: 1rem;
`;

/**
 * Styled-tag h3 : the title of the card.
 * @memberof CardGroup
 */
const CardTitle = styled.h3`
  color: ${colors.veryDarkGrey};
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 1em;
`;

/**
 * Styled-tag p : the text of the card.
 * @memberof CardGroup
 */
const CardText = styled.p`
  margin: 1em 0 1em 0;
  text-align: center;
`;
