import styled from 'styled-components';
import propTypes from 'prop-types';
import { keyframes } from '../utils/style/keyframes.js';

/**
 * the LoadingSpinner component.
 * Contain a spinner animation.
 * @namespace LoadingSpinner
 * @param {string} props.color - the color passed to the component, used as spinner color (ex: '#FFFFFF')
 * @param {string} props.size - the size of the spinner passed to the component (ex: '100%' or '2rem')
 * @returns {ReactElement} jsx to be injected in the html
 */
export const LoadingSpinner = ({ color, size }) => (
  <ComponentWrapper>
    <p className="sr-only">Please wait a moment</p>
    <DotWrapper size={size}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Dot key={i} delay={i} backgroundColor={color} />
      ))}
    </DotWrapper>
  </ComponentWrapper>
);

/**
 * The propTypes for the LoadingSpinner component
 * @memberof LoadingSpinner
 */
LoadingSpinner.propTypes = {
  color: propTypes.string.isRequired,
  size: propTypes.string.isRequired,
};

/**
 * Styled-tag div for the LoadingSpinner ComponentWrapper.
 * @memberof LoadingSpinner
 */
const ComponentWrapper = styled.div`
  width: 100%;
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

/**
 * Styled-tag div for the DotWrapper of the dots.
 * @memberof LoadingSpinner
 */
const DotWrapper = styled.div`
  position: relative;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  animation: spin 7s infinite linear;

  ${keyframes.spin}
`;

/**
 * Styled-tag div for the dots used for the spinner.
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
    min-width: 0.1875rem;
    min-height: 0.1875rem;
    width: 10%;
    height: 10%;
    border-radius: 50%;
    background-color: ${(props) => props.backgroundColor};
  }

  ${keyframes.spin}
`;
