import React from 'react';
import {useSelector} from 'react-redux';
import {AuthNavigator, MainNavigator} from '.';
import {getUserStorage} from '../../redux/rootSelector';

const Navigator = () => {
  const {user} = useSelector(getUserStorage);
  const isUserAuthorized =
    !user.loading && user.error === '' && Object.keys(user.data).length > 0;

  return isUserAuthorized ? <MainNavigator /> : <AuthNavigator />;
};

export default Navigator;
