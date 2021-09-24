import { createContext, useCallback, useState, useEffect } from 'react';

export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const defaultUserData = {
    isAuthentified: false,
    token: '',
    remember: undefined,
    firstName: '',
    lastName: '',
    accountsData: [],
  };

  const [userData, setUserData] = useState(prevStorage() ?? defaultUserData);

  useEffect(() => {
    if (userData.remember === undefined) {
      //happen on logout or if both local and session storages are empty
      sessionStorage.clear();
      localStorage.clear();
    } else {
      const storage = userData.remember ? localStorage : sessionStorage;
      storage.setItem('userData', JSON.stringify(userData));
      storage.setItem('lastUpdate', Date.now().toString());
    }
  }, [userData]);

  const updateUserData = useCallback((newState) => {
    setUserData((prevState) => ({ ...prevState, ...newState }));
  }, []);

  const resetUserData = () => {
    setUserData(defaultUserData);
  };

  return (
    <UserDataContext.Provider
      value={{ userData, updateUserData, resetUserData }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

const prevStorage = () => {
  const session = parseInt(JSON.parse(sessionStorage.getItem('lastUpdate')));
  const local = parseInt(JSON.parse(localStorage.getItem('lastUpdate')));
  if (!session && !local) return null;
  else if (local > session) return JSON.parse(localStorage.getItem('userData'));
  else return JSON.parse(sessionStorage.getItem('userData'));
};
