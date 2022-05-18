import React, {useRef} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {APP_ICON} from '../../assets/images/icons';
import {useTheme} from '../../assets/theme';
import {DefaultButton} from '../../components/buttons';
import {EmailInput, PasswordInput} from '../../components/inputs';
import {Link, Title} from '../../components/texts';
import {TextWrapper} from '../../components/wrappers';
import {DefaultWrapper} from '../../components/wrappers/DefaultWrapper';
import {logIn} from '../../redux/actions/userActions';
import {colors, notificationRef, text} from '../../utils/constants';
import {validateEmail} from '../../utils/functions';
import {LoadingWrapper} from './Components';

const ICON_SIZE = 100;

export const LoginScreen = () => {
  const {mode} = useTheme();

  const dispatch = useDispatch();

  const emailRef = useRef('');
  const passwordRef = useRef('');

  const handlePassword = (s: string) => (passwordRef.current = s);
  const handleEmail = (s: string) => (emailRef.current = s);
  const handleLogin = () => {
    if (emailRef.current === '' || passwordRef.current === '') {
      notificationRef.current?.show('Some fields are empty', 'error');
    } else {
      const isEmailValid = validateEmail(emailRef.current);

      if (isEmailValid) {
        dispatch(logIn(emailRef.current, passwordRef.current));
      } else {
        notificationRef.current?.show('Email is not valid', 'error');
      }
    }
  };

  return (
    <DefaultWrapper>
      <View style={styles.container}>
        <Image source={APP_ICON} style={styles.icon} />
        <Title text={'Welcome to Dogterest'} />

        <View style={styles.form}>
          <EmailInput onChangeText={handleEmail} />
          <PasswordInput onChangeText={handlePassword} />

          <LoadingWrapper>
            <DefaultButton onPress={handleLogin} color={colors.turquoise}>
              <Text style={{...styles.text, color: mode.card}}>Login</Text>
            </DefaultButton>

            <TextWrapper shouldCenterize={true}>
              <Link navigateConfig={{key: 'SignUp'}} text={'Sign in'} />
            </TextWrapper>
          </LoadingWrapper>
        </View>
      </View>
    </DefaultWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 56,
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE,
    marginBottom: 21,
  },
  form: {
    marginTop: 21,
    marginHorizontal: 21,
  },
  text: {
    fontSize: text.s,
    fontWeight: '500',
  },
  buttonWrapper: {
    marginTop: 21,
    marginHorizontal: 21,
  },
  linkContainer: {
    marginVertical: 14,
    alignItems: 'center',
  },
});
