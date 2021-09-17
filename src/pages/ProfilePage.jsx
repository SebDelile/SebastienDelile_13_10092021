import { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import { COLORS } from '../utils/style/COLORS.js';
import { LoadingSpinner } from '../components/LoadingSpinner.jsx';
import { ProfileHeader } from '../components/ProfileHeader.jsx';
import { Accounts } from '../components/Accounts.jsx';

const isAuthentified = false;

export const ProfilePage = () => {
  const [userProfileData, setUserProfileData] = useState({
    firstname: '',
    lastname: '',
    isLoading: true,
  });
  useEffect(
    () =>
      setUserProfileData({
        firstname: 'Jean-Eudes',
        lastname: 'Cornichon',
        isLoading: true,
      }),
    []
  );

  return isAuthentified ? (
    <Redirect to="/login" />
  ) : (
    <Container>
      <h1 className="sr-only">home page of Argent Bank web application</h1>
      {userProfileData.isLoading ? (
        <LoadingSpinner color="white" size="150px" />
      ) : (
        <>
          <ProfileHeader /> <Accounts />
        </>
      )}
    </Container>
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
  background-color: ${COLORS.secondary};
`;
