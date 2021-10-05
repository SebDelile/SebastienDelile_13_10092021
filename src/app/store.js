import { configureStore } from '@reduxjs/toolkit';

import authenticationReducer from '../features/authentication.js';
import profileReducer from '../features/profile.js';
import accountsReducer from '../features/accounts.js';
import {
  loadFromStorage,
  saveToStorage,
} from '../utils/services/storageManagement.js';

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
