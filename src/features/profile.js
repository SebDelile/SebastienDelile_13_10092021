import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchProfileRequest,
  updateProfileRequest,
} from '../utils/services/apiRequest.js';
import {
  completedActionHandler,
  pendingActionHandler,
} from '../utils/redux/statusActionHandlers.js';
import { unauthorizedErrorHandler } from '../utils/redux/unauthorizedErrorHandler.js';

// init
const sliceName = 'profile';
const initialState = {
  firstName: '',
  lastName: '',
  loading: 'idle',
  error: '',
};

// Thunk functions
export const fetchProfileInfo = createAsyncThunk(
  sliceName + '/fetchProfileInfo',
  async (_, { getState, dispatch }) => {
    if (getState().profile.loading !== 'pending') return;
    try {
      const response = await fetchProfileRequest(
        getState().authentication.token
      );
      return response.data;
    } catch (error) {
      unauthorizedErrorHandler(error, dispatch);
    }
  }
);

export const updateProfileInfo = createAsyncThunk(
  sliceName + '/updateProfileInfo',
  async (name, { getState, dispatch }) => {
    if (getState().profile.loading !== 'pending') return;
    try {
      const response = await updateProfileRequest(
        getState().authentication.token,
        name
      );
      return response.data;
    } catch (error) {
      unauthorizedErrorHandler(error, dispatch);
    }
  }
);

// slice
const profileSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    resetProfile: (state) => (state = initialState),
  },
  extraReducers: (builder) => {
    builder
      //fetch info request
      .addCase(fetchProfileInfo.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.firstName = action.payload.body.firstName;
          state.lastName = action.payload.body.lastName;
        }
      })
      .addCase(fetchProfileInfo.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.error = 'fetching error';
        }
      })
      // update info request
      .addCase(updateProfileInfo.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.firstName = action.payload.body.firstName;
          state.lastName = action.payload.body.lastName;
        }
      })
      .addCase(updateProfileInfo.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.error = 'updating error';
        }
      })
      // loading status management
      .addMatcher(...pendingActionHandler(sliceName))
      .addMatcher(...completedActionHandler(sliceName));
  },
});

// export actions, selectors and the reducer
export const { resetProfile } = profileSlice.actions;
export const selectProfile = (state) => state.profile;
export const selectFirstName = (state) => state.profile.firstName;
export default profileSlice.reducer;
