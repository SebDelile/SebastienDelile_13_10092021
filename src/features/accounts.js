import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAccountsRequest } from '../utils/services/apiRequest.js';
import {
  completedActionHandler,
  pendingActionHandler,
} from '../utils/redux/statusActionHandlers.js';
import { apiResponseErrorHandler } from '../utils/redux/apiResponseErrorHandler.js';

/**
 * @namespace reduxFeature_accounts
 */

/**
 * name of the feature.
 * @memberof reduxFeature_accounts
 */
const sliceName = 'accounts';
/**
 * initial state of the feature.
 * @memberof reduxFeature_accounts
 */
const initialState = {
  setOfAccounts: [],
  loading: 'idle',
  error: '',
};

/**
 * thunk to make async call to API and get accounts data.
 * @function fetchAccounts
 * @async
 * @memberof reduxFeature_accounts
 * @return {object} - the API response (containing accounts data on success)
 */
export const fetchAccounts = createAsyncThunk(
  sliceName + '/fetchAccounts',
  async (_, { getState, dispatch }) => {
    if (getState().profile.loading !== 'pending') return;
    try {
      const response = await fetchAccountsRequest(
        getState().authentication.token
      );
      return response.data;
    } catch (error) {
      apiResponseErrorHandler(error, dispatch);
    }
  }
);

/**
 * the slice of the feature, implemented with the readux-toolkit createSlice.
 * @memberof reduxFeature_accounts
 */
const accountsSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    resetAccounts: (state) => (state = initialState),
  },
  extraReducers: (builder) => {
    builder
      //fetch accounts request
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.setOfAccounts = action.payload.body.accounts;
        }
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.error = 'fetching error';
        }
      })
      // loading status management
      .addMatcher(...pendingActionHandler(sliceName))
      .addMatcher(...completedActionHandler(sliceName));
  },
});

/**
 * Action objects to be called to trigger the reducer.
 * @const {object} sliceActions
 * @property {object} resetAccounts - action to reset the accounts state
 * @memberof reduxFeature_accounts
 */
export const { resetAccounts } = accountsSlice.actions;

/**
 * select the accounts properties in the redux state.
 * @function selectAccounts
 * @memberof reduxFeature_accounts
 * @returns {object} - accounts state value
 */
export const selectAccounts = (state) => state.accounts;

/**
 * the slice reducer to be imported in the store.
 * @const {object} sliceReducer
 * @memberof reduxFeature_accounts
 */
export default accountsSlice.reducer;
