import { logout } from '../../features/authentication.js';

/**
 * catch the error, if error is code 401, logout the user, else throw an error for the reducer.rejected to handle it.
 * @memberof redux
 * @param {object} error - the error object from the api
 * @param {function} dispatch - the dispatch function from useDispatch
 */
export const apiResponseErrorHandler = (error, dispatch) => {
  if (error.request.status === 401) dispatch(logout());
  throw Error(error);
};
