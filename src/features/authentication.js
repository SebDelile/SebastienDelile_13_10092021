import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginRequest } from '../utils/services/apiRequest.js';
import { resetProfile } from './profile.js';
import {
  pendingActionHandler,
  completedActionHandler,
} from '../utils/redux/statusActionHandlers.js';
import { resetAccounts } from './accounts.js';
import { clearStorages } from '../utils/services/storageManagement.js';

// init
const sliceName = 'authentication';
const initialState = {
  isAuthenticated: false,
  token: '',
  remember: undefined,
  loading: 'idle',
  error: '',
};

// Thunk functions
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

export const logout = () => (dispatch) => {
  dispatch(resetAuthentication());
  dispatch(resetProfile());
  dispatch(resetAccounts());
  clearStorages();
};

// slice
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

// export actions, selectors and the reducer
export const { resetAuthentication } = authenticationSlice.actions;
export const selectAuthentication = (state) => state.authentication;
export const selectIsAuthenticated = (state) =>
  state.authentication.isAuthenticated;
export default authenticationSlice.reducer;
