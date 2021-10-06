/**
 * the middleware to store any change of the store in sessionStorage/localStorage.
 * add a timestamp before saving.
 * @memberof redux
 * @param {object} storeAPI - the redux store
 * @returns {object} - the store after update corresponding to the action
 */
export const saveToStorage = (storeAPI) => (next) => (action) => {
  let result = next(action);
  const state = { ...storeAPI.getState() };
  if (state.authentication.remember === undefined) return result;
  state.timeStamp = Date.now().toString();
  const storage = state.authentication.remember ? localStorage : sessionStorage;
  storage.setItem('userData', JSON.stringify(state));
  return result;
};

/**
 * the function to check for existence of previsouly stored state, and return it if any.
 * check the timestamp if both localStorage and sessionStorage exist and pick the latest.
 * timestamp is removed before loading as redux state.
 * return undefined if no stored state (so initial state of the slices are loaded).
 * @memberof redux
 * @returns {object|undefined} - the stored state if any
 */
export const loadFromStorage = () => {
  const session = JSON.parse(sessionStorage.getItem('userData'));
  const local = JSON.parse(localStorage.getItem('userData'));
  if (!session && !local) return undefined;
  const sessionTimeStamp = session ? +session.timeStamp : 0;
  const localTimeStamp = local ? +local.timeStamp : 0;
  const storedData = localTimeStamp > sessionTimeStamp ? local : session;
  delete storedData.timeStamp;
  return storedData;
};

/**
 * a function to clear both stores on logout.
 * @memberof redux
 */
export const clearStorages = () => {
  sessionStorage.clear();
  localStorage.clear();
};
