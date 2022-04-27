import React, {useRef} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {APP_ICON} from '../../assets/images/icons';
import {useTheme} from '../../assets/theme';
import {DefaultButton} from '../../components/buttons';
import {DefaultInput, PasswordInput} from '../../components/inputs';
import {Link, Title} from '../../components/texts';
import {TextWrapper} from '../../components/wrappers';
import {DefaultWrapper} from '../../components/wrappers/DefaultWrapper';
import {colors, text} from '../../utils/constants';

const ICON_SIZE = 100;

export const SignUpScreen = () => {
  const {mode} = useTheme();

  const emailRef = useRef('');
  const usernameRef = useRef('');
  const passwordRef = useRef('');

  const handlePassword = (s: string) => (passwordRef.current = s);
  const handleEmail = (s: string) => (emailRef.current = s);
  const handleUsername = (s: string) => (usernameRef.current = s);

  const handleSignUp = () => {
    console.log('@signup');
  };

  return (
    <DefaultWrapper>
      <View style={styles.container}>
        <Image source={APP_ICON} style={styles.icon} />
        <Title text={'Sign Up'} />

        <View style={styles.form}>
          <DefaultInput
            onChangeText={handleUsername}
            iconConfig={{name: 'user', type: 'feather'}}
            placeholder={'Name'}
          />
          <DefaultInput
            onChangeText={handleEmail}
            iconConfig={{name: 'mail', type: 'feather'}}
            placeholder={'Email'}
            type={'email-address'}
          />
          <PasswordInput onChangeText={handlePassword} />

          <View style={styles.button}>
            <DefaultButton onPress={handleSignUp} color={colors.turquoise}>
              <Text style={{...styles.text, color: mode.card}}>Sign Up</Text>
            </DefaultButton>

            <TextWrapper shouldCenterize={true}>
              <Text>or you can sign with</Text>
            </TextWrapper>

            <View style={{marginBottom: 14}}>
              <DefaultButton onPress={handleSignUp} color={'#DB4437'}>
                <Text style={{...styles.text, color: mode.card}}>
                  Sign up with Google
                </Text>
              </DefaultButton>
            </View>
            <DefaultButton onPress={handleSignUp} color={'#4267B2'}>
              <Text style={{...styles.text, color: mode.card}}>
                Sign up with Facebook
              </Text>
            </DefaultButton>

            <TextWrapper shouldCenterize={true}>
              <Link navigateConfig={{key: 'Login'}} text={'Back to login'} />
            </TextWrapper>
          </View>
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
  button: {
    marginTop: 21,
    marginHorizontal: 21,
  },
  linkContainer: {
    marginVertical: 14,
    alignItems: 'center',
  },
});
