import { logout } from '../../features/authentication.js';

export const unauthorizedErrorHandler = (error, dispatch) => {
  if (error.request.status === 401) dispatch(logout());
  throw Error(error);
};
