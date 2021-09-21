import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import { UserDataContext } from '../utils/contexts/UserDataContext.js';
import { colors } from '../utils/style/colors.js';
import { mainButtonStyle } from '../utils/style/mainButtonStyle.js';
import { USER_DATA } from '../data/USER_DATA.js';

export const LoginPage = () => {
  const [creditential, setCreditential] = useState({
    username: '',
    password: '',
    remember: false,
  });
  let history = useHistory();
  const { userData, updateUserData } = useContext(UserDataContext);

  const handleInputChange = (event) => {
    const { name, type, checked, value } = event.target;
    setCreditential((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const extractedUserData = USER_DATA.find(
      (user) =>
        user.email === creditential.username &&
        user.password === creditential.password
    );
    if (!extractedUserData) {
      alert('Authentification failed, username and/or password is incorrect');
      return;
    } else {
      updateUserData({
        isAuthentified: true,
        firstName: extractedUserData.firstName,
        lastName: extractedUserData.lastName,
      });
      history.push('/profile');
    }
  };

  return userData.isAuthentified ? (
    <Redirect to="/profile" />
  ) : (
    <ComponentWrapper>
      <Form>
        <Icon aria-hidden={true}>
          <i className="fa fa-user-circle"></i>
        </Icon>
        <Title>Sign In</Title>
        <InputWrapper>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            required
            value={creditential.username}
            onChange={handleInputChange}
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            value={creditential.password}
            onChange={handleInputChange}
          />
        </InputWrapper>
        <CheckboxWrapper>
          <input
            type="checkbox"
            id="remember"
            name="remember"
            checked={creditential.remember}
            onChange={handleInputChange}
          />
          <label htmlFor="remember">Remember me</label>
        </CheckboxWrapper>
        <ButtonSubmit type="submit" onClick={handleSubmit}>
          Sign In
        </ButtonSubmit>
      </Form>
    </ComponentWrapper>
  );
};

/**
 * Styled-tag main for the Login page ComponentWrapper
 * @memberof LoginPage
 */
const ComponentWrapper = styled.main`
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
const InputWrapper = styled.div`
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
const CheckboxWrapper = styled.div`
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
