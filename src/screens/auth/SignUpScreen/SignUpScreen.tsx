import React, { useRef } from 'react';
import { View, Text, Pressable, TouchableOpacity, StyleSheet } from 'react-native';
import { hideMessage, showMessage } from 'react-native-flash-message';

import { FormInput, BottomStickyButtons } from '../../../components';
import { COLORS, SIZES } from '../../../constants';
import { MainLayout } from '../../../layouts';

import {
  createUserWithEmailAndPassword,
  auth,
  firebaseErrors,
  db,
  doc,
  setDoc,
  sendEmailVerification,
  updateProfile,
} from '../../../firebase';

type SignUpScreenProps = { navigation: { navigate: any } };

const FLASH_MESSAGE_DURATION = 6000;

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation: { navigate } }) => {
  const [value, setValue] = React.useState({
    username: '',
    email: '',
    password: '',
    error: '',
  });

  const usernameRef = useRef<any>();
  const emailRef = useRef<any>();
  const passwordRef = useRef<any>();

  const onRegisterPressed = async () => {
    if (value.username === '' || value.email === '' || value.password === '') {
      showMessage({
        message: firebaseErrors['all-fields'],
        type: 'danger',
        duration: FLASH_MESSAGE_DURATION,
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password).then(async (cred) => {
        await sendEmailVerification(cred.user)
          .then(async () => {
            const uid = cred.user.uid;
            const data = {
              id: uid,
              username: value.username,
            };
            await setDoc(doc(db, 'users', uid), data);
            await updateProfile(cred.user, {
              displayName: value.username,
            });
          })
          .catch((error) => {
            showMessage({
              message: firebaseErrors[error.code],
              type: 'danger',
              duration: FLASH_MESSAGE_DURATION,
            });
          })
          .finally(() => {
            navigate('Verification', { email: value.email, password: value.password });
            hideMessage();
          });
      });
    } catch (error: any) {
      showMessage({
        message: firebaseErrors[error.code],
        type: 'danger',
        duration: FLASH_MESSAGE_DURATION,
      });
    }
  };

  const onTermsOfUsePressed = () => {
    navigate('termsOfUse');
  };

  const onPrivacyPolicyPressed = () => {
    navigate('privacyPolicy');
  };

  return (
    <>
      <MainLayout
        style={styles.container}
        withHeader={true}
        headerRedirect={() => navigate('Entry')}
      >
        {/* Header */}
        <Text style={styles.title}>
          Welcome onboard<Text style={{ color: COLORS.secondary }}>.</Text>
        </Text>
        <Text style={styles.description}>Let's get you started!</Text>
        {/* Form */}
        <View style={styles.form}>
          {/* Input email */}
          <FormInput
            placeholder="First and last name"
            value={value.username}
            innerRef={usernameRef}
            onChangeText={(text) => setValue({ ...value, username: text })}
            onSubmitEnding={() => emailRef.current.focus()}
          />
          {/* Input Password */}
          <FormInput
            placeholder="Email address"
            value={value.email}
            onChangeText={(text) => setValue({ ...value, email: text })}
            innerRef={emailRef}
            onSubmitEnding={() => passwordRef.current.focus()}
            isEmail
          />
          {/* Input Password */}
          <FormInput
            placeholder="Password"
            value={value.password}
            onChangeText={(text) => setValue({ ...value, password: text })}
            innerRef={passwordRef}
            isPassword
            isSubmit
          />
        </View>
        {/* Terms of Service */}
        <Text style={styles.tos}>
          By signing up, you agree to our{' '}
          <Text style={styles.tosBold} onPress={onTermsOfUsePressed}>
            Terms of Use
          </Text>{' '}
          and{' '}
          <Text style={styles.tosBold} onPress={onPrivacyPolicyPressed}>
            Privacy Policy
          </Text>
          .
        </Text>
      </MainLayout>
      <BottomStickyButtons
        primaryLabel="Register"
        onPrimaryPressed={onRegisterPressed}
        secondaryLabel="Already have an account?"
        onSecondaryPressed={() => navigate('SignIn')}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.padding * 1.5,
  },
  title: {
    fontSize: SIZES.h1,
    fontFamily: 'extraBold',
    color: COLORS.primary,
  },
  description: {
    marginTop: SIZES.base,
    fontSize: SIZES.h2,
    fontFamily: 'semiBold',
    color: COLORS.gray.dark,
  },
  form: {
    marginTop: SIZES.base,
    height: SIZES.height / 3,
    justifyContent: 'space-evenly',
  },
  tos: {
    fontFamily: 'regular',
    color: COLORS.gray.medium,
    fontSize: 15,
  },
  tosBold: {
    fontFamily: 'bold',
    color: COLORS.primary,
  },
  error: {
    marginTop: SIZES.base * 2,
  },
  errorText: {
    fontFamily: 'regular',
    fontSize: SIZES.body5,
    color: COLORS.error,
  },
});

export default SignUpScreen;
