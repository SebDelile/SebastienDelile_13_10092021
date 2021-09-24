import { useState, useContext } from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import { LoadingSpinner } from '../components/LoadingSpinner.jsx';
import { UserDataContext } from '../utils/contexts/UserDataContext.js';
import { colors } from '../utils/style/colors.js';
import { mainButtonStyle } from '../utils/style/mainButtonStyle.js';
import { apiRequest } from '../utils/services/apiRequest.js';

export const LoginPage = () => {
  const [creditential, setCreditential] = useState({
    username: '',
    password: '',
    remember: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { userData, updateUserData } = useContext(UserDataContext);

  const handleInputChange = (event) => {
    const { name, type, checked, value } = event.target;
    setCreditential((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const loginRequest = await apiRequest({
      type: 'post',
      endPoint: '/user/login',
      body: {
        email: creditential.username,
        password: creditential.password,
      },
    });

    if (loginRequest.rejected) {
      handleSubmitError(loginRequest.rejected.status);
      setIsLoading(false);
    } else {
      updateUserData({
        isAuthentified: true,
        token: loginRequest.resolved.data.body.token,
        remember: creditential.remember,
      });
      //isAuthentified update will trigger the redirect to ProfilePage;
    }
  };

  const handleSubmitError = (status) => {
    switch (status) {
      case 400:
        setError(
          'Username and/or password is invalid, please check your inputs and try again.'
        );
        break;
      case 404:
        setError('Wrong request, please contact the app administrator.');
        break;
      default:
        setError('Server is unreachable, please try again later.');
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
          {isLoading ? <LoadingSpinner color="white" size="1em" /> : 'Sign In'}
        </ButtonSubmit>
        {error ? <ErrorMessage>{error}</ErrorMessage> : null}
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
 * Styled-tag p for the icon of the Login page
 * @memberof LoginPage
 */
const Icon = styled.p`
  font-size: 5rem;
`;

/**
 * Styled-tag h1 for the title of the Login page
 * @memberof LoginPage
 */
const Title = styled.h1`
  font-size: 1.5rem;
  margin: 1.25rem 0;
  font-weight: 700;
`;

/**
 * Styled-tag div for the wrapper of the input text of the Login page
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
 * Styled-tag div for the wrapper of the input checkbox of the Login page
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
 * Styled-tag button for the submit button of the Login page
 * @memberof LoginPage
 */
const ButtonSubmit = styled.button`
  ${mainButtonStyle}

  width: 100%;
`;

/**
 * Styled-tag p for the error message of the Login page
 * @memberof LoginPage
 */
const ErrorMessage = styled.p`
  font-size: 1rem;
  color: red;
  margin-top: 1rem;
`;
