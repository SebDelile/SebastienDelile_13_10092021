import axios from 'axios';
import { ACCOUNTS_DATA } from '../../data/ACCOUNTS_DATA';

const BASE_URL = 'http://localhost:3001';

export const loginRequest = async (creditential) => {
  const response = await axios.post(
    BASE_URL + '/api/v1/user/login',
    creditential
  );
  return response;
};

export const fetchProfileRequest = (token) => {
  return axios.post(
    BASE_URL + '/api/v1/user/profile',
    {},
    { headers: { authorization: 'Bearer ' + token } }
  );
};

export const updateProfileRequest = (token, name) => {
  return axios.put(BASE_URL + '/api/v1/user/profile', name, {
    headers: { authorization: 'Bearer ' + token },
  });
};

export const fetchAccountsRequest = async (token) => {
  // this is a mock as the api has not yet any route to fetch these data
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
