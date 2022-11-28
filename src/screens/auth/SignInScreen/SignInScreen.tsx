import { useRef, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

import {
  auth,
  signInWithEmailAndPassword,
  firebaseErrors,
  sendEmailVerification,
} from '../../../firebase';
import { FormInput, BottomStickyButtons } from '../../../components';
import { COLORS, SIZES } from '../../../constants';
import { showMessage } from 'react-native-flash-message';
import { MainLayout } from '../../../layouts';

type SignInScreenProps = {
  navigation: {
    navigate: any;
    goBack: () => void;
  };
};

const FLASH_MESSAGE_DURATION = 6000;

const SignInScreen: React.FC<SignInScreenProps> = ({ navigation: { navigate, goBack } }) => {
  const [value, setValue] = useState({
    email: '',
    password: '',
    error: '',
  });

  const emailRef = useRef<any>();
  const passwordRef = useRef<any>();

  const onForgotPasswordPressed = () => {
    navigate('privacyPolicy');
  };

  const onSignInPressed = async () => {
    if (!value.email || !value.password) {
      showMessage({
        message: firebaseErrors['all-fields'],
        type: 'danger',
        duration: FLASH_MESSAGE_DURATION,
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password)
        .then(async (cred) => {
          if (!cred.user.emailVerified) {
            await sendEmailVerification(cred.user).then(() => {
              navigate('Verification', { email: value.email, password: value.password });
            });
          } else {
          }
        })
        .catch((error) => {
          showMessage({
            message: firebaseErrors[error.code],
            type: 'danger',
            duration: FLASH_MESSAGE_DURATION,
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

  return (
    <>
      <MainLayout style={styles.container} withHeader={true} headerRedirect={() => goBack()}>
        {/* Header */}
        <Text style={styles.title}>
          Welcome Back<Text style={{ color: COLORS.secondary }}>.</Text>
        </Text>
        <Text style={styles.description}>You've been missed!</Text>
        {/* Form */}
        <View style={styles.form}>
          {/* Input email */}
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
        {/* Forgot Password */}
        <Pressable onPress={onForgotPasswordPressed}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </Pressable>
        {!!value.error && (
          <View style={styles.error}>
            <Text style={styles.errorText}>
              {firebaseErrors[value.error]
                ? 'ERROR:' + ' ' + firebaseErrors[value.error]
                : 'ERROR: An unknown error occured: ' +
                  value.error +
                  '. Please try again later or contact us.'}
            </Text>
          </View>
        )}
      </MainLayout>
      <BottomStickyButtons
        primaryLabel="Sign In"
        onPrimaryPressed={onSignInPressed}
        secondaryLabel="Don't have an account?"
        onSecondaryPressed={() => navigate('SignUp')}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    paddingBottom: SIZES.padding * 1.2,
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
    height: SIZES.height / 4,
    justifyContent: 'space-evenly',
  },
  forgotPassword: {
    fontSize: 15,
    fontFamily: 'semiBold',
    color: COLORS.primary,
    alignSelf: 'flex-end',
  },
  noAccountContainer: {
    marginBottom: SIZES.font,
  },
  noAccount: {
    alignSelf: 'center',
    fontFamily: 'regular',
    color: COLORS.gray.medium,
    fontSize: SIZES.body5,
  },
  noAccountBold: {
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

export default SignInScreen;
