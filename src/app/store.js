import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../features/authentication.js';
import profileReducer from '../features/profile.js';
import accountsReducer from '../features/accounts.js';
import {
  loadFromStorage,
  saveToStorage,
} from '../utils/services/storageManagement.js';

/**
 * @namespace redux
 */

/**
 * The Redux store initialization. It is created from redux-toolkit configureStore.
 * @memberof redux
 */
export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    profile: profileReducer,
    accounts: accountsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveToStorage),
  preloadedState: loadFromStorage(),
});
