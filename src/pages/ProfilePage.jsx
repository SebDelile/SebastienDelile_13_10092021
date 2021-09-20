import { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import { colors } from '../utils/style/colors.js';
import { LoadingSpinner } from '../components/LoadingSpinner.jsx';
import { ProfileHeader } from '../components/ProfileHeader.jsx';
import { Accounts } from '../components/Accounts.jsx';
import { ACCOUNTS_DATA } from '../data/ACCOUNTS_DATA.js';

const isAuthentified = false;

export const ProfilePage = () => {
  const [userProfileData, setUserProfileData] = useState({
    firstname: '',
    lastname: '',
    accountsData: [],
    isLoading: true,
  });
  useEffect(
    () =>
      setUserProfileData({
        firstname: 'Jean-Eudes',
        lastname: 'Cornichon',
        accountsData: ACCOUNTS_DATA,
        isLoading: false,
      }),
    []
  );

  return isAuthentified ? (
    <Redirect to="/login" />
  ) : (
    <Container>
      <h1 className="sr-only">Profile Page</h1>
      {userProfileData.isLoading ? (
        <LoadingSpinner color="white" size="150px" />
      ) : (
        <>
          <ProfileHeader
            firstname={userProfileData.firstname}
            lastname={userProfileData.lastname}
          />
          <Accounts accountsData={userProfileData.accountsData} />
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
  background-color: ${colors.secondary};
`;
