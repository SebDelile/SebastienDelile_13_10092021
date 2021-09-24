import { createContext, useCallback, useState, useEffect } from 'react';

export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const defaultUserData = {
    isAuthentified: false,
    token: '',
    remember: false,
    firstName: '',
    lastName: '',
    accountsData: [],
  };

  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem('userData')) ?? defaultUserData
  );

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData));
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
