import React from 'react';
import {useSelector} from 'react-redux';
import {getUserStorage} from '../../redux/rootSelector';
import {AuthNavigator} from './AuthNavigator';
import MainNavigator from './MainNavigator';

const Navigator = () => {
  const {user} = useSelector(getUserStorage);
  const isUserAuthorized = !user || Object.keys(user)?.length === 0;
  return isUserAuthorized ? <AuthNavigator /> : <MainNavigator />;
};

export default Navigator;
