import styled from 'styled-components';
import { colors } from '../utils/style/colors.js';
import { ProfileHeader } from '../components/ProfileHeader.jsx';
import { Accounts } from '../components/Accounts.jsx';

/**
 * The profilePage : include a profileheader and a Accounts components.
 * wre i a private route to redirect to loginPage if not connected.
 * @namespace ProfilePage
 * @returns {ReactElement} jsx to be injected in the html
 */
export const ProfilePage = () => (
  <ComponentWrapper>
    <h1 className="sr-only">Profile Page</h1>
    <ProfileHeader />
    <Accounts />
  </ComponentWrapper>
);

/**
 * Styled-tag main for the Profile page ComponentWrapper.
 * @memberof ProfilePage
 */
const ComponentWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: ${colors.secondary};
`;
