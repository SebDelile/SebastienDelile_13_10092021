import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../utils/style/colors.js';
import { ProfileHeader } from '../components/ProfileHeader.jsx';
import { Accounts } from '../components/Accounts.jsx';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../features/authentication.js';

export const ProfilePage = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated ? (
    <ComponentWrapper>
      <h1 className="sr-only">Profile Page</h1>
      <ProfileHeader />
      <Accounts />
    </ComponentWrapper>
  ) : (
    <Redirect to="/login" />
  );
};

/**
 * Styled-tag main for the Profile page ComponentWrapper
 * @memberof ProfilePage
 */
const ComponentWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: ${colors.secondary};
`;
