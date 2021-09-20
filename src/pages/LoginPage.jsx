import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import { colors } from '../utils/style/colors.js';
import { mainButtonStyle } from '../utils/style/mainButtonStyle.js';

const name = null;

export const LoginPage = () => {
  const [creditential, setCreditential] = useState({
    username: '',
    password: '',
    remember: false,
  });
  let history = useHistory();

  const handleInputChange = (event) => {
    const { name, type, checked, value } = event.target;
    setCreditential((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push('/profile');
  };

  return name ? (
    <Redirect to="/profile" />
  ) : (
    <Container>
      <Form>
        <Icon aria-hidden={true}>
          <i className="fa fa-user-circle"></i>
        </Icon>
        <Title>Sign In</Title>
        <WrapperInput>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            required
            value={creditential.username}
            onChange={handleInputChange}
          />
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            value={creditential.password}
            onChange={handleInputChange}
          />
        </WrapperInput>
        <WrapperCheckbox>
          <input
            type="checkbox"
            id="remember"
            name="remember"
            checked={creditential.remember}
            onChange={handleInputChange}
          />
          <label htmlFor="remember">Remember me</label>
        </WrapperCheckbox>
        <ButtonSubmit type="submit" onClick={handleSubmit}>
          Sign In
        </ButtonSubmit>
      </Form>
    </Container>
  );
};

/**
 * Styled-tag main for the Login page container
 * @memberof LoginPage
 */
const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: ${colors.secondary};
`;

/**
 * Styled-tag form for the form of the Login page
 * @memberof LoginPage
 */
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  width: 18.75rem;
  margin: 3rem 0;
  padding: 2rem;
`;

/**
 * Styled-tag form for the icon of the Login page
 * @memberof LoginPage
 */
const Icon = styled.p`
  font-size: 5rem;
`;

/**
 * Styled-tag form for the title of the Login page
 * @memberof LoginPage
 */
const Title = styled.h1`
  font-size: 1.5rem;
  margin: 1.25rem 0;
  font-weight: 700;
`;

/**
 * Styled-tag form for the wrapper of the input text of the Login page
 * @memberof LoginPage
 */
const WrapperInput = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  text-align: left;
  margin-bottom: 1rem;

  & label {
    font-weight: bold;
    font-size: 1rem;
  }

  & input {
    padding: 0.25rem;
    font-size: 1.2rem;
  }
`;

/**
 * Styled-tag form for the wrapper of the input checkbox of the Login page
 * @memberof LoginPage
 */
const WrapperCheckbox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  & > * {
    cursor: pointer;
  }

  & label {
    margin-left: 0.25rem;
    font-size: 1rem;
  }
`;

/**
 * Styled-tag form for the submit button of the Login page
 * @memberof LoginPage
 */
const ButtonSubmit = styled.button`
  ${mainButtonStyle}

  width: 100%;
`;
