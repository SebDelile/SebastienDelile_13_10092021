import styled from 'styled-components';
import { Hero } from '../components/Hero.jsx';
import { CardGroup } from '../components/CardGroup.jsx';
import heroBackground from '../assets/bank-tree.jpeg';
import iconChat from '../assets/icon-chat.png';
import iconMoney from '../assets/icon-money.png';
import iconSecurity from '../assets/icon-security.png';

export const HomePage = () => (
  <Container>
    <h1 className="sr-only">home page of Argent Bank web application</h1>
    <Hero content={HERO_CONTENT} />
    <CardGroup content={CARDS_CONTENT} />
  </Container>
);

/**
 * Content to fill the hero
 * @memberof HomePage
 */
const HERO_CONTENT = {
  purpose: 'Promotional banner',
  backgroundImage: heroBackground,
  title: 'No fees.\r\n No minimum deposit. \r\n High interest rates.',
  text: 'Open a savings account with Argent Bank today!',
};

/**
 * Content to fill the cards
 * @memberof HomePage
 */
const CARDS_CONTENT = {
  purpose: 'Marketing pitch',
  cardArray: [
    {
      image: iconChat,
      alt: 'chat icon',
      title: 'You are our #1 priority',
      text: 'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.',
    },
    {
      image: iconMoney,
      alt: 'money icon',
      title: 'More savings means higher rates',
      text: 'The more you save with us, the higher your interest rate will be!',
    },
    {
      image: iconSecurity,
      alt: 'security icon',
      title: 'Security you can trust',
      text: 'We use top of the line encryption to make sure your data and money is always safe.',
    },
  ],
};

/**
 * Styled-tag main for the home page container
 * @memberof HomePage
 */
const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
