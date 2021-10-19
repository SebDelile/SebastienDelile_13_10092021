import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../features/authentication';

/**
 * a util to turn a route to a private route : check authentication, allow rendering children if authenticated, or redirect to the login page if not
 * @memberof utils
 * @function
 * @param {object} param0 - all props of a normal route, including the children
 * @returns {ReactElement} a route with the children if authenticated or a redirect to LoginPage otherwise
 */
export const PrivateRoute = ({ children, ...rest }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return (
    <Route
      {...rest}
      render={() => (isAuthenticated ? children : <Redirect to="/login" />)}
    />
  );
};
