import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { PrivateRoute } from '../utils/services/PrivateRoute.jsx';
import styled from 'styled-components';
import { Header } from '../components/Header.jsx';
import { Footer } from '../components/Footer.jsx';
import { HomePage } from '../pages/HomePage.jsx';
import { LoginPage } from '../pages/LoginPage.jsx';
import { ProfilePage } from '../pages/ProfilePage.jsx';
import { ErrorPage } from '../pages/ErrorPage.jsx';

/**
 * @namespace App
 */

/**
 * The main component. It contains the router.
 * @memberof App
 * @function
 * @return {ReactElement} jsx to be injected in the html
 */
export const App = () => (
  <ComponentWrapper>
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute path="/profile">
          <ProfilePage />
        </PrivateRoute>
        <Route>
          <ErrorPage />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  </ComponentWrapper>
);

/**
 * Styled-tag ComponentWrapper for the App.
 * Contains rules for the flex organization of children : all are 100% wide and only main content is flex 1 (not header nor footer).
 * @memberof App
 */
const ComponentWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;

  & > * {
    width: 100%;
  }

  & > main {
    flex: 1;
  }
`;
