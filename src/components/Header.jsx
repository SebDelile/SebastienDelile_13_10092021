import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/argentBankLogo.png';
import { COLORS } from '../utils/style/COLORS.js';

export const Header = () => {
  const name = 'Jean-Eudes';
  return (
    <Container>
      <StyledNavLink exact to="/">
        <Logo src={logo} />
      </StyledNavLink>
      <Menu>
        {name ? (
          <MenuList>
            <MenuListItem>
              <StyledNavLink to="/profile">
                <i className="fa fa-user-circle"></i> {name}
              </StyledNavLink>
            </MenuListItem>
            <MenuListItem>
              <MenuButton>
                <i className="fa fa-sign-out"></i> Sign out
              </MenuButton>
            </MenuListItem>
          </MenuList>
        ) : (
          <MenuList>
            <MenuListItem>
              <StyledNavLink to="/login">
                <i className="fa fa-user-circle"></i> Sign In
              </StyledNavLink>
            </MenuListItem>
          </MenuList>
        )}
      </Menu>
    </Container>
  );
};

/**
 * Styled-tag header to wrap header content
 * @memberof Header
 */
const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 1.25rem;
`;

/**
 * Styled version of NavLink (react-router-dom)
 * @memberof Header
 */
const StyledNavLink = styled(NavLink)`
  &.active,
  &.active > * {
    color: ${COLORS.activeNavLink};
  }
`;

/**
 * Styled-tag img for the logo in the header
 * @memberof Header
 */
const Logo = styled.img`
  max-width: 100%;
  width: 12.5rem;
`;

/**
 * Styled-tag nav
 * @memberof Header
 */
const Menu = styled.nav``;

/**
 * Styled-tag ul for the navigation menu list
 * @memberof Header
 */
const MenuList = styled.ul`
  list-style: none;
`;

/**
 * Styled-tag li for the navigation menu items
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

/**
 * Styled-tag button for the signout button
 * @memberof Header
 */
const MenuButton = styled.button``;
