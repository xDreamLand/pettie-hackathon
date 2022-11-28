import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import { FormInput, BottomStickyButtons } from '../../../components';
import { COLORS, SIZES } from '../../../constants';
import { auth, firebaseErrors, sendPasswordResetEmail } from '../../../firebase';
import { MainLayout } from '../../../layouts';

type ForgotPasswordScreenProps = {
  navigation: {
    navigate: (route: string) => void;
    goBack: () => void;
  };
};

const FLASH_MESSAGE_DURATION = 6000;

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  navigation: { navigate, goBack },
}) => {
  const [email, setEmail] = useState<string>('');

  const onSubmitPressed = async () => {
    if (email) {
      await sendPasswordResetEmail(auth, email)
        .then(() => {
          showMessage({
            message: 'Reset instructions have been beent sent to your email',
            type: 'success',
            duration: FLASH_MESSAGE_DURATION,
          });
          navigate('SignIn');
        })
        .catch((error) => {
          showMessage({
            message: firebaseErrors[error.code],
            type: 'danger',
            duration: FLASH_MESSAGE_DURATION,
          });
        });
    } else {
      showMessage({
        message: firebaseErrors['all-fields'],
        type: 'danger',
        duration: FLASH_MESSAGE_DURATION,
      });
    }
  };

  return (
    <>
      <MainLayout style={styles.container} withHeader={true} headerRedirect={() => goBack()}>
        <Text style={styles.title}>
          Forgot{'\n'}your password<Text style={{ color: COLORS.secondary }}>?</Text>
        </Text>
        <Text style={styles.description}>Don't worry.{'\n'}It happens to all of us!</Text>
        <View style={styles.form}>
          <FormInput
            placeholder="Email address"
            value={email}
            onChangeText={(email) => setEmail(email)}
            isEmail
          />
        </View>
      </MainLayout>
      <BottomStickyButtons
        primaryLabel="Send reset instructions"
        onPrimaryPressed={onSubmitPressed}
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
    marginTop: SIZES.padding * 2,
  },
  bottom: {
    paddingBottom: SIZES.padding * 1.2,
  },
});

export default ForgotPasswordScreen;
