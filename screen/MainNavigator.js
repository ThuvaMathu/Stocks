import React, { useContext } from 'react';
import Navigation from '../components/BottomNav';
import { useLogin } from '../context/LoginProvider';
import AuthForm from './main-screen/AuthForm';

const MainNav = () => {
  const { LoggedIn } = useLogin();
  return LoggedIn ? <Navigation/> : <AuthForm/>;
};
export default MainNav;
