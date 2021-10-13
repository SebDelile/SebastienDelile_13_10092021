import axios from 'axios';
import { ACCOUNTS_DATA } from '../../data/ACCOUNTS_DATA';

/**
 *@namespace apiRequest
 */

/**
 * the base url of the api.
 * @memberof apiRequest
 */
const BASE_URL = 'http://localhost:3001';

/**
 * the login request function (POST). should return the token on success.
 * use axios as depedency, no error handling (done in redux thunk).
 * @memberof apiRequest
 * @function
 * @param {object} creditential - the submitted username, password and remember
 * @returns {object} - api response
 */
export const loginRequest = async (creditential) => {
  const response = await axios.post(
    BASE_URL + '/api/v1/user/login',
    creditential
  );
  return response;
};

/**
 * the fetch profile request function (POST). should return the profile info on success.
 * use axios as depedency, no error handling (done in redux thunk).
 * @memberof apiRequest
 * @function
 * @param {string} token - the authentification token (JWT)
 * @returns {object} - api response
 */
export const fetchProfileRequest = (token) => {
  return axios.post(
    BASE_URL + '/api/v1/user/profile',
    {},
    { headers: { authorization: 'Bearer ' + token } }
  );
};

/**
 * the update profile request function (PUT). should return the profile info on success.
 * use axios as depedency, no error handling (done in redux thunk).
 * @memberof apiRequest
 * @function
 * @param {string} token - the authentification token (JWT)
 * @param {object} name - the firstName and LastName to use for updating
 * @returns {object} - api response
 */
export const updateProfileRequest = (token, name) => {
  return axios.put(BASE_URL + '/api/v1/user/profile', name, {
    headers: { authorization: 'Bearer ' + token },
  });
};

/**
 * the fetch account request function (GET). should return the accounts data on success.
 * THIS IS A MOCK AS THIS ROUTE DOESN'T YET EXIST IN THE API.
 * use a get on the api root to send data only if API is indeed working.
 * @memberof apiRequest
 * @function
 * @param {string} token - the authentification token (JWT)
 * @returns {object} - the mocked accounts data
 */
export const fetchAccountsRequest = async (token) => {
  const testApi = axios.get(BASE_URL + '/');
  const loadMock = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!token)
        reject(Error({ request: { status: 401, message: 'Unauthorized' } }));
      else
        resolve({ status: 200, data: { body: { accounts: ACCOUNTS_DATA } } });
    }, (Math.random() + 1) * 1000);
  });
  const response = await Promise.all([testApi, loadMock]);
  return response[1] ?? response;
};
