import styled from 'styled-components';
import { KEYFRAMES } from '../utils/style/KEYFRAMES.js';

export const LoadingSpinner = ({ color, size }) => (
  <Container>
    <p className="sr-only">Please wait a moment</p>
    <Wrapper size={size}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Dot key={i} delay={i} backgroundColor={color} />
      ))}
    </Wrapper>
  </Container>
);

/**
 * Styled-tag div for the LoadingSpinner container
 * @memberof LoadingSpinner
 */
const Container = styled.div`
  width: 100%;
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

/**
 * Styled-tag div for the wrapper of the dots
 * @memberof LoadingSpinner
 */
const Wrapper = styled.div`
  position: relative;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  animation: spin 7s infinite linear;

  ${KEYFRAMES.spin}
`;

/**
 * Styled-tag div for the dots used for the spinner
 * @memberof LoadingSpinner
 */
const Dot = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  animation: spin 1.8s infinite ease-in-out;
  animation-delay: ${(props) => (props.delay + 1) * 0.15}s;

  &::before {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    content: '';
    display: block;
    width: 10%;
    height: 10%;
    border-radius: 50%;
    background-color: ${(props) => props.backgroundColor};
  }

  ${KEYFRAMES.spin}
`;
