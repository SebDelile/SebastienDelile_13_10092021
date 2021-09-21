import { useContext, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { UserDataContext } from '../utils/contexts/UserDataContext.js';
import { colors } from '../utils/style/colors.js';
import { LoadingSpinner } from '../components/LoadingSpinner.jsx';
import { ProfileHeader } from '../components/ProfileHeader.jsx';
import { Accounts } from '../components/Accounts.jsx';
import { ACCOUNTS_DATA } from '../data/ACCOUNTS_DATA.js';

export const ProfilePage = () => {
  const { userData, updateUserData } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);
  let history = useHistory();

  useEffect(() => {
    const fetchUserAccount = async () => {
      setIsLoading(true);
      try {
        const accountsData = await new Promise((resolve) => {
          setTimeout(() => resolve(ACCOUNTS_DATA), 2000);
        });
        updateUserData({ accountsData: accountsData });
        setIsLoading(false);
      } catch (error) {
        history.push('/errorpage');
      }
    };
    fetchUserAccount();
  }, []);

  return userData.isAuthentified ? (
    <Container>
      <h1 className="sr-only">Profile Page</h1>
      <ProfileHeader
        firstName={userData.firstName}
        lastName={userData.lastName}
      />
      {isLoading ? (
        <LoadingSpinner color="white" size="150px" />
      ) : (
        <Accounts accountsData={userData.accountsData} />
      )}
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
