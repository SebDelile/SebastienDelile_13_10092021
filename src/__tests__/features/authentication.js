import reducer, {
  selectIsAuthenticated,
  selectAuthentication,
  resetAuthentication,
  login,
} from '../../features/authentication.js';
import { screen, fireEvent } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { handlers } from '../../mocks/handlers.js';
import { renderWithRouterAndStore } from '../../utils/tests/renderWithRouterAndStore.js';
import { LoginPage } from '../../pages/LoginPage.jsx';
import { Header } from '../../components/Header.jsx';

const initialState = {
  isAuthenticated: false,
  token: '',
  remember: undefined,
  loading: 'idle',
  error: '',
};

const authenticatedState = {
  isAuthenticated: true,
  token: 'bestTokenEver',
  remember: false,
  loading: 'idle',
  error: '',
};

const state = {
  accounts: 'some stuff',
  profile: 'some other stuff',
  authentication: authenticatedState,
};

//unit tests
describe('GIVEN the authentication feature', () => {
  describe('WHEN the slice is initialized', () => {
    test('THEN it should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });
  });
  describe('WHEN the resetAuthentication action is fired', () => {
    test('THEN it should reset the state to initial state', () => {
      expect(reducer(authenticatedState, resetAuthentication())).toEqual(
        initialState
      );
    });
  });
  describe('WHEN the selectAuthentication selector is fired', () => {
    test('THEN it should return the accounts slice of the state', () => {
      expect(selectAuthentication(state)).toEqual(authenticatedState);
    });
  });
  describe('WHEN the selectIsAuthenticated selector is fired', () => {
    test('THEN it should return these property value form the state', () => {
      expect(selectIsAuthenticated(state)).toEqual(
        authenticatedState.isAuthenticated
      );
    });
  });

  //integration tests
  const server = setupServer(...handlers);
  beforeAll(() => server.listen()); // start API mocking
  afterEach(() => server.resetHandlers()); //reset request handlers
  afterAll(() => server.close()); // end API mocking

  describe('WHEN the LoginPage component is mounted (while not authenticated)', () => {
    beforeEach(async () => {
      await renderWithRouterAndStore({
        currentContent: <LoginPage />,
        otherRoutes: [{ path: '/profile', content: 'Profile page' }],
      });
    });
    describe('AND WHEN the creditential are correctly filled and submitted', () => {
      test('THEN the submission is successful and user is redirected to profile page', async () => {
        expect(screen.getByRole('button', { name: /Sign in/i })).toBeTruthy();
        fireEvent.change(screen.getByLabelText(/username/i), {
          target: { value: 'john@doe.com' },
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
          target: { value: 'password789' },
        });
        fireEvent.change(screen.getByLabelText(/remember me/i), {
          target: { value: true },
        });
        fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));
        expect(
          screen.queryByRole('button', { name: /Sign in/i })
        ).not.toBeTruthy();
        expect(screen.getByText(/Please wait a moment/i)).toBeTruthy();
        expect(await screen.findByText(/Profile Page/i)).toBeTruthy();
      });
    });
    describe('AND WHEN the creditential are NOT correctly filled and submitted', () => {
      test('THEN the submission is successful and user is redirected to profile page', async () => {
        expect(screen.getByRole('button', { name: /Sign in/i })).toBeTruthy();
        fireEvent.change(screen.getByLabelText(/username/i), {
          target: { value: '' },
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
          target: { value: 'password789' },
        });
        fireEvent.change(screen.getByLabelText(/remember me/i), {
          target: { value: true },
        });
        fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));
        expect(
          screen.queryByRole('button', { name: /Sign in/i })
        ).not.toBeTruthy();
        expect(screen.getByText(/Please wait a moment/i)).toBeTruthy();
        expect(
          await screen.findByText(/Username and\/or password is invalid/i)
        ).toBeTruthy();
      });
    });
  });
  describe('WHEN the Header component is mounted while authenticated', () => {
    describe('AND WHEN the user click on Signout button', () => {
      test('THEN the user is logged out and the app display the home page', async () => {
        await renderWithRouterAndStore({
          currentContent: 'Any page',
          otherRoutes: [{ path: '/', exact: true, content: 'Home page' }],
          outsideSwitch: [<Header />],
          initialActions: [
            login({
              username: 'John',
              password: 'Doe',
              remember: false,
            }),
          ],
        });
        expect(
          await screen.findByRole('button', { name: /Sign out/i })
        ).toBeTruthy();
        fireEvent.click(screen.getByRole('button', { name: /Sign out/i }));
        expect(
          await screen.findByRole('link', { name: /Sign in/i })
        ).toBeTruthy();
        expect(screen.getByText(/Home Page/i)).toBeTruthy();
      });
    });
  });
});
