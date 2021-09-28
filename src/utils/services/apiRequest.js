import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/v1';

export const apiRequest = async ({ type, endPoint, token, body }) => {
  if (!type || !endPoint) return;
  const response = { resolved: undefined, rejected: undefined };
  try {
    const resolved = await axios({
      method: type,
      url: BASE_URL + endPoint,
      data: body,
      headers: { authorization: token ? 'Bearer ' + token : '' },
    });
    response.resolved = resolved;
  } catch (error) {
    response.rejected = error.request;
  }
  return response;
};
