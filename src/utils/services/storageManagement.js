export const saveToStorage = (storeAPI) => (next) => (action) => {
  let result = next(action);
  const state = { ...storeAPI.getState() };
  if (state.authentication.remember === undefined) return result;
  state.timeStamp = Date.now().toString();
  const storage = state.authentication.remember ? localStorage : sessionStorage;
  storage.setItem('userData', JSON.stringify(state));
  return result;
};

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

export const clearStorages = () => {
  sessionStorage.clear();
  localStorage.clear();
};
