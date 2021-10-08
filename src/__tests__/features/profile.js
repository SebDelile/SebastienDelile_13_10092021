import reducer, {
  resetProfile,
  selectProfile,
  selectFirstName,
} from '../../features/profile.js';
import { screen, fireEvent } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { handlers } from '../../mocks/handlers.js';
import { renderWithRouterAndStore } from '../../utils/tests/renderWithRouterAndStore.js';
import { ProfileHeader } from '../../components/ProfileHeader.jsx';
import { login } from '../../features/authentication.js';

const initialState = {
  firstName: '',
  lastName: '',
  loading: 'idle',
  error: '',
};

const randomState = {
  firstName: 'John',
  lastName: 'Doe',
  loading: 'idle',
  error: '',
};

const state = {
  profile: randomState,
  accounts: 'some stuff',
  authentication: 'some other stuff',
};

//unit tests
describe('GIVEN the profile feature', () => {
  describe('WHEN the slice is initialized', () => {
    test('THEN it should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });
  });
  describe('WHEN the resetProfile action is fired', () => {
    test('THEN it should reset the state to initial state', () => {
      expect(reducer(randomState, resetProfile())).toEqual(initialState);
    });
  });
  describe('WHEN the selectProfile selector is fired', () => {
    test('THEN it should return the accounts slice of the state', () => {
      expect(selectProfile(state)).toEqual(randomState);
    });
  });
  describe('WHEN the selectfirstName selector is fired', () => {
    test('THEN it should return the fstName value of slice of the state', () => {
      expect(selectFirstName(state)).toEqual(randomState.firstName);
    });
  });

  //integration tests
  const server = setupServer(...handlers);
  beforeAll(() => server.listen()); // start API mocking
  afterEach(() => server.resetHandlers()); //reset request handlers
  afterAll(() => server.close()); // end API mocking

  describe('WHEN the ProfileHeader component is mounted (while authenticated)', () => {
    beforeEach(async () => {
      await renderWithRouterAndStore({
        currentContent: <ProfileHeader />,
        initialActions: [
          login({
            username: 'John',
            password: 'Doe',
            remember: false,
          }),
        ],
      });
    });
    test('THEN the ProfileHeader component should pass to a loading state and then be filled with data', async () => {
      expect(screen.getByText(/Welcome back/i)).toBeTruthy();
      //useEffect launch the fetch and display loader
      expect(await screen.findByText(/Please wait a moment/i)).toBeTruthy();

      // after some time, the accounts are successfully fetched
      expect(await screen.findByText(/John/i && /Doe/i)).toBeTruthy();
      expect(screen.queryByText(/Please wait a moment/i)).not.toBeTruthy();
    });
    describe('AND the user submit an updated Name', () => {
      test('THEN the ProfileHeader component should pass to a loading state and then be filled with new data', async () => {
        // let the first fetch to go on
        expect(await screen.findByText(/John/i && /Doe/i)).toBeTruthy();
        // set new name and submit
        fireEvent.click(screen.getByRole('button', { name: /Edit/i }));
        fireEvent.change(screen.getByRole('textbox', { name: /Firstname/i }), {
          target: { value: 'Jane' },
        });
        fireEvent.change(screen.getByRole('textbox', { name: /Lastname/i }), {
          target: { value: 'Smith' },
        });
        fireEvent.click(screen.getByRole('button', { name: /Save/i }));
        //display the loader for some time and then display the new name
        expect(await screen.findByText(/Please wait a moment/i)).toBeTruthy();
        expect(screen.queryByText(/John/i || /Jane/i)).not.toBeTruthy();
        expect(await screen.findByText(/Jane/i && /Smith/i)).toBeTruthy();
      });
    });
  });
});
