import {
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';

import { COLORS, SHADOWS, SIZES } from '../../../constants';
import { AuthHeader } from '../../../components';
import { auth, signOut, signInWithEmailAndPassword } from '../../../firebase';
import { MainLayout } from '../../../layouts';

type VerificationScreenProps = {
  navigation: {
    navigate: (route: string) => void;
  };
  route: any;
};

const FLASH_MESSAGE_DURATION = 7000;

const VerificationScreen: React.FC<VerificationScreenProps> = ({
  navigation: { navigate },
  route,
}) => {
  const { email, password } = route.params;

  const onVerifyPressed = async () => {
    const user = auth.currentUser;
    if (!user) return;
    await user.reload();
    if (user.emailVerified) {
      await signOut(auth)
        .then(async () => {
          await signInWithEmailAndPassword(auth, email, password).catch(() => {
            navigate('Entry');
          });
        })
        .catch((e) => {
          console.log(e);
          navigate('Entry');
        });
    } else {
      showMessage({
        message: 'This account has not been verified yet.',
        type: 'danger',
        duration: FLASH_MESSAGE_DURATION,
      });
    }
  };

  return (
    <>
      <MainLayout
        style={styles.container}
        withHeader={true}
        headerRedirect={() => navigate('Entry')}
      >
        <Text style={styles.title}>
          Email verification<Text style={{ color: COLORS.secondary }}>.</Text>
        </Text>
        {email ? (
          <Text style={styles.text}>
            We have sent a verification code to <Text style={styles.underlined}>{email}</Text>.
          </Text>
        ) : (
          <Text style={styles.text}>We have sent you a verification code.</Text>
        )}
      </MainLayout>
      <TouchableOpacity
        style={[styles.btn, SHADOWS.medium, { backgroundColor: COLORS.primary }]}
        activeOpacity={0.85}
        onPress={onVerifyPressed}
      >
        <Text style={[styles.btnText, { color: COLORS.white }]}>Verify</Text>
      </TouchableOpacity>
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
  text: {
    marginTop: SIZES.padding,
    fontSize: SIZES.h3,
    fontFamily: 'semiBold',
    color: COLORS.gray.dark,
  },
  underlined: {
    letterSpacing: 0.8,
    textDecorationLine: 'underline',
    fontFamily: 'semiBold',
    color: COLORS.primary,
  },
  btn: {
    position: 'absolute',
    bottom: SIZES.padding,
    width: '90%',
    height: SIZES.height * 0.075,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  btnText: {
    fontFamily: 'semiBold',
    fontSize: 18,
    color: COLORS.gray.medium,
    textAlign: 'center',
  },
});

export default VerificationScreen;
