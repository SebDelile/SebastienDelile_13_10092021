import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginRequest } from '../utils/services/apiRequest.js';
import { resetProfile } from './profile.js';
import {
  pendingActionHandler,
  completedActionHandler,
} from '../utils/redux/statusActionHandlers.js';
import { resetAccounts } from './accounts.js';
import { clearStorages } from '../utils/services/storageManagement.js';

/**
 * @namespace reduxFeature_authentication
 */

/**
 * name of the feature.
 * @memberof reduxFeature_authentication
 */
const sliceName = 'authentication';
/**
 * initial state of the feature.
 * @memberof reduxFeature_authentication
 */
const initialState = {
  isAuthenticated: false,
  token: '',
  remember: undefined,
  loading: 'idle',
  error: '',
};

/**
 * thunk to make async call to API and try to login and get a JWT token.
 * @function login
 * @async
 * @memberof reduxFeature_authentication
 * @return {object} - the API response (containing a JWT token on success)
 */
export const login = createAsyncThunk(
  sliceName + '/login',
  async (creditential, { getState, rejectWithValue, dispatch }) => {
    if (getState().authentication.loading !== 'pending') return;
    try {
      const response = await loginRequest({
        email: creditential.username,
        password: creditential.password,
      });
      response.data.body.remember = creditential.remember;
      return response.data;
    } catch (error) {
      return rejectWithValue(error.request.status);
    }
  }
);

/**
 * thunk to call several action within one : clear all redux state + clear local/session storages.
 * @function logout
 * @memberof reduxFeature_authentication
 */
export const logout = () => (dispatch) => {
  dispatch(resetAuthentication());
  dispatch(resetProfile());
  dispatch(resetAccounts());
  clearStorages();
};

/**
 * the slice of the feature, implemented with the readux-toolkit createSlice.
 * @memberof reduxFeature_authentication
 */
const authenticationSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    resetAuthentication: (state) => (state = initialState),
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.isAuthenticated = true;
          state.token = action.payload.body.token;
          state.remember = action.payload.body.remember;
        }
      })
      .addCase(login.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.error =
            action.payload === 400
              ? 'Username and/or password is invalid, please check your inputs and try again.'
              : 'There is a network error, please check your connection and/or try again later.';
        }
      })
      .addMatcher(...pendingActionHandler(sliceName))
      .addMatcher(...completedActionHandler(sliceName));
  },
});

/**
 * Action objects to be called to trigger the reducer.
 * @const {object} sliceActions
 * @property {object} resetAuthentication - action to reset the authentication state
 * @memberof reduxFeature_authentication
 */
export const { resetAuthentication } = authenticationSlice.actions;

/**
 * select the authentication properties in the redux state.
 * @function selectAuthentication
 * @memberof reduxFeature_authentication
 * @returns {object} - authentication state value
 */
export const selectAuthentication = (state) => state.authentication;

/**
 * select the isAuthenticated state.
 * @function selectIsAuthenticated
 * @memberof reduxFeature_authentication
 * @returns {boolean} - true id authenticated, false otherwise
 */
export const selectIsAuthenticated = (state) =>
  state.authentication.isAuthenticated;

/**
 * the slice reducer to be imported in the store.
 * @const {object} sliceReducer
 * @memberof reduxFeature_authentication
 */
export default authenticationSlice.reducer;
