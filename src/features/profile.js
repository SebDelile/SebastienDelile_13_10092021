import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchProfileRequest,
  updateProfileRequest,
} from '../utils/services/apiRequest.js';
import {
  completedActionHandler,
  pendingActionHandler,
} from '../utils/redux/statusActionHandlers.js';
import { apiResponseErrorHandler } from '../utils/redux/apiResponseErrorHandler.js';

/**
 * @namespace reduxFeature_profile
 */

/**
 * name of the feature.
 * @memberof reduxFeature_profile
 */
const sliceName = 'profile';

/**
 * initial state of the feature.
 * @memberof reduxFeature_profile
 */
const initialState = {
  firstName: '',
  lastName: '',
  loading: 'idle',
  error: '',
};

/**
 * thunk to make async call to API and fetch the profile info.
 * @function fetchProfileInfo
 * @async
 * @memberof reduxFeature_profile
 * @return {object} - the API response (containing the profile info on success)
 */
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
      apiResponseErrorHandler(error, dispatch);
    }
  }
);

/**
 * thunk to make async call to API and update the profile info.
 * @function updateProfileInfo
 * @async
 * @memberof reduxFeature_profile
 * @return {object} - the API response (containing the profile info on success)
 */
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
      apiResponseErrorHandler(error, dispatch);
    }
  }
);

/**
 * the slice of the feature, implemented with the readux-toolkit createSlice.
 * @memberof reduxFeature_profile
 */
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

/**
 * Action objects to be called to trigger the reducer.
 * @const {object} sliceActions
 * @property {object} resetProfile - action to reset the profile state
 * @memberof reduxFeature_profile
 */
export const { resetProfile } = profileSlice.actions;

/**
 * select the profile properties in the redux state.
 * @function selectProfile
 * @memberof reduxFeature_profile
 * @returns {object} - profile state value
 */
export const selectProfile = (state) => state.profile;

/**
 * select the firstname properties in the redux profile state.
 * @function selectFirstName
 * @memberof reduxFeature_profile
 * @returns {string} - firstName value
 */
export const selectFirstName = (state) => state.profile.firstName;

/**
 * the slice reducer to be imported in the store.
 * @const {object} sliceReducer
 * @memberof reduxFeature_profile
 */
export default profileSlice.reducer;
