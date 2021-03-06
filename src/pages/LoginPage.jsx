import { useState } from 'react';
import { Redirect } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { LoadingSpinner } from '../components/LoadingSpinner.jsx';
import { colors } from '../utils/style/colors.js';
import { mainButtonStyle } from '../utils/style/mainButtonStyle.js';
import { login, selectAuthentication } from '../features/authentication.js';

/**
 * The login Page : include a form to submit login info.
 * Contain logic to display either loader, error or content.
 * @namespace LoginPage
 * @returns {ReactElement} jsx to be injected in the html
 */
export const LoginPage = () => {
  const [creditential, setCreditential] = useState({
    username: '',
    password: '',
    remember: false,
  });
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector(selectAuthentication);

  /**
   * handle each change in the input fields by updating the local state with the new value.
   * @param {object} event - the event object
   * @memberof LoginPage
   */
  const handleInputChange = (event) => {
    const { name, type, checked, value } = event.target;
    setCreditential((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  /**
   * handle the launch of the action to submit the creditential to the api.
   * @param {object} event - the event object
   * @memberof LoginPage
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(creditential));
    //isAuthenticated update will trigger the redirect to ProfilePage.
  };

  return isAuthenticated ? (
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
          {loading === 'pending' ? (
            <LoadingSpinner color="white" size="1em" />
          ) : (
            'Sign In'
          )}
        </ButtonSubmit>
        {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      </Form>
    </ComponentWrapper>
  );
};

/**
 * Styled-tag main for the Login page ComponentWrapper.
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
 * Styled-tag form for the form of the Login page.
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
 * Styled-tag p for the icon of the Login page.
 * @memberof LoginPage
 */
const Icon = styled.p`
  font-size: 5rem;
`;

/**
 * Styled-tag h1 for the title of the Login page.
 * @memberof LoginPage
 */
const Title = styled.h1`
  font-size: 1.5rem;
  margin: 1.25rem 0;
  font-weight: 700;
`;

/**
 * Styled-tag div for the wrapper of the input text of the Login page.
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
 * Styled-tag div for the wrapper of the input checkbox of the Login page.
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
 * Styled-tag button for the submit button of the Login page.
 * @memberof LoginPage
 */
const ButtonSubmit = styled.button`
  ${mainButtonStyle}

  width: 100%;
`;

/**
 * Styled-tag p for the error message of the Login page.
 * @memberof LoginPage
 */
const ErrorMessage = styled.p`
  font-size: 1rem;
  color: red;
  margin-top: 1rem;
`;
