import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import logo from '../assets/argentBankLogo.png';
import { colors } from '../utils/style/colors.js';
import { selectFirstName } from '../features/profile';
import { logout, selectIsAuthenticated } from '../features/authentication';

/**
 * @namespace Header
 */

/**
 * the Header component
 * Contain logic to display either user's name and signout button, or signin button.
 * @memberof Header
 * @function
 * @returns {ReactElement} jsx to be injected in the html
 */
export const Header = () => {
  let history = useHistory();
  const firstName = useSelector(selectFirstName);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(logout());
    history.push('/');
  };

  return (
    <ComponentWrapper>
      <StyledNavLink exact to="/">
        <Logo src={logo} />
      </StyledNavLink>
      <nav>
        {isAuthenticated ? (
          <MenuList>
            <MenuListItem>
              <StyledNavLink to="/profile">
                <i className="fa fa-user-circle" aria-hidden={true}></i>{' '}
                {firstName}
              </StyledNavLink>
            </MenuListItem>
            <MenuListItem>
              <button type="button" onClick={handleSignout}>
                <i className="fa fa-sign-out" aria-hidden={true}></i> Sign out
              </button>
            </MenuListItem>
          </MenuList>
        ) : (
          <MenuList>
            <MenuListItem>
              <StyledNavLink to="/login">
                <i className="fa fa-user-circle" aria-hidden={true}></i> Sign In
              </StyledNavLink>
            </MenuListItem>
          </MenuList>
        )}
      </nav>
    </ComponentWrapper>
  );
};

/**
 * Styled-tag header to wrap header content.
 * @memberof Header
 */
const ComponentWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 1.25rem;
`;

/**
 * Styled version of NavLink (react-router-dom).
 * @memberof Header
 */
const StyledNavLink = styled(NavLink)`
  &.active,
  &.active > * {
    color: ${colors.activeNavLink};
  }
`;

/**
 * Styled-tag img for the logo in the header.
 * @memberof Header
 */
const Logo = styled.img`
  max-width: 100%;
  width: 12.5rem;
`;

/**
 * Styled-tag ul for the navigation menu list.
 * @memberof Header
 */
const MenuList = styled.ul`
  list-style: none;
`;

/**
 * Styled-tag li for the navigation menu items.
 * @memberof Header
 */
const MenuListItem = styled.li`
  margin-right: 0.5rem;
  display: inline-block;
  font-weight: 700;

  &:hover {
    text-decoration: underline;
  }
`;
