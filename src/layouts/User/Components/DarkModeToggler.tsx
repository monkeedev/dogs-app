import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Checkbox} from '../../../components/buttons';
import {changeTheme} from '../../../redux/actions/userActions';
import {getUserStorage} from '../../../redux/rootSelector';
import {Setting} from './Setting';

export const DarkModeToggler = () => {
  const {theme} = useSelector(getUserStorage);
  const dispatch = useDispatch();

  const toggleDarkMode = () => {
    dispatch(changeTheme());
  };

  return (
    <Setting
      text={'Dark mode'}
      action={toggleDarkMode}
      iconConfig={{name: 'moon', type: 'feather'}}
      component={<Checkbox state={theme === 'dark'} />}
    />
  );
};
