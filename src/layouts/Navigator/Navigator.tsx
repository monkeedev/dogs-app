import React from 'react';
import {useSelector} from 'react-redux';
import {AuthNavigator, MainNavigator} from '.';
import {getUserStorage} from '../../redux/rootSelector';

const Navigator = () => {
  const {user} = useSelector(getUserStorage);
  // const isUserAuthorized = !user.data || Object.keys(user)?.length === 0;
  const isUserAuthorized = !user.loading && user.error === '' && user.data;

  return isUserAuthorized ? <AuthNavigator /> : <MainNavigator />;
};

export default Navigator;
