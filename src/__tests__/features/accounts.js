import reducer, {
  resetAccounts,
  selectAccounts,
} from '../../features/accounts.js';
import { screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { handlers } from '../../mocks/handlers.js';
import { renderWithRouterAndStore } from '../../utils/tests/renderWithRouterAndStore.js';
import { Accounts } from '../../components/Accounts.jsx';
import { login } from '../../features/authentication.js';

const initialState = {
  setOfAccounts: [],
  loading: 'idle',
  error: '',
};

const randomState = {
  setOfAccounts: 'whatever it is',
  loading: "doesn't matter",
  error: 'no worries',
};

const state = {
  accounts: randomState,
  profile: 'some stuff',
  authentication: 'some other stuff',
};

//unit tests
describe('GIVEN the accounts feature', () => {
  describe('WHEN the slice is initialized', () => {
    test('THEN it should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });
  });
  describe('WHEN the resetAccounts action is fired', () => {
    test('THEN it should reset the state to initial state', () => {
      expect(reducer(randomState, resetAccounts())).toEqual(initialState);
    });
  });
  describe('WHEN the selectAccounts selector is fired', () => {
    test('THEN it should return the accounts slice of the state', () => {
      expect(selectAccounts(state)).toEqual(randomState);
    });
  });

  //integration tests
  const server = setupServer(...handlers);
  beforeAll(() => server.listen()); // start API mocking
  afterEach(() => server.resetHandlers()); //reset request handlers
  afterAll(() => server.close()); // end API mocking

  describe('WHEN the Account component is mounted (while authenticated)', () => {
    test('THEN the Accounts component should pass to a loading state and then be filled with data', async () => {
      await renderWithRouterAndStore({
        currentContent: <Accounts />,
        initialActions: [
          login({
            username: 'John',
            password: 'Doe',
            remember: false,
          }),
        ],
      });
      expect(screen.getByText(/List of accounts/i)).toBeTruthy();
      //useEffect launch the fetch and display loader
      expect(await screen.findByText(/Please wait a moment/i)).toBeTruthy();

      // after some time, the accounts are successfully fetched
      expect(
        await screen.findAllByRole(
          'button',
          {
            name: /View transactions/i,
          },
          { timeout: 2500 } // because there is random time to load data between 1 to 2s
        )
      ).toBeTruthy();
      expect(screen.queryByText(/Please wait a moment/i)).not.toBeTruthy();
    });
  });
});
