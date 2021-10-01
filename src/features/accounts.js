import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAccountsRequest } from '../utils/services/apiRequest.js';
import {
  completedActionHandler,
  pendingActionHandler,
} from '../utils/redux/statusActionHandlers.js';
import { unauthorizedErrorHandler } from '../utils/redux/unauthorizedErrorHandler.js';

// init
const sliceName = 'accounts';
const initialState = {
  setOfAccounts: [],
  loading: 'idle',
  error: '',
};

// Thunk functions
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
      unauthorizedErrorHandler(error, dispatch);
    }
  }
);

// slice
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

// export actions, selectors and the reducer
export const { resetAccounts } = accountsSlice.actions;
export const selectAccounts = (state) => state.accounts;
export default accountsSlice.reducer;
