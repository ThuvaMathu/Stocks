import React, { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

const LoginProvider = ({ children }) => {

  const [LoggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [userProfile, setUserProfile] = useState({});
  const [stockData, setStockData] = useState([]);
  return (
    <LoginContext.Provider
      value={{LoggedIn, setLoggedIn, userData, setUserData, userProfile, setUserProfile,stockData, setStockData }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;
