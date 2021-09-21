import { createContext, useCallback, useState } from 'react';

export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const initialUserData = {
    isAuthentified: false,
    firstName: '',
    lastName: '',
    accountsData: [],
  };

  const [userData, setUserData] = useState(initialUserData);

  const updateUserData = useCallback((newState) => {
    setUserData((prevState) => ({ ...prevState, ...newState }));
  }, []);

  const resetUserData = () => {
    setUserData(initialUserData);
  };

  return (
    <UserDataContext.Provider
      value={{ userData, updateUserData, resetUserData }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
