import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { UserDataContext } from '../utils/contexts/UserDataContext.js';
import { colors } from '../utils/style/colors.js';
import { ProfileHeader } from '../components/ProfileHeader.jsx';
import { Accounts } from '../components/Accounts.jsx';

export const ProfilePage = () => {
  const { userData } = useContext(UserDataContext);

  return userData.isAuthentified ? (
    <Container>
      <h1 className="sr-only">Profile Page</h1>
      <ProfileHeader
        firstName={userData.firstName}
        lastName={userData.lastName}
      />
      <Accounts accountsData={userData.accountsData} />
    </Container>
  ) : (
    <Redirect to="/login" />
  );
};

/**
 * Styled-tag main for the Profile page container
 * @memberof ProfilePage
 */
const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: ${colors.secondary};
`;
