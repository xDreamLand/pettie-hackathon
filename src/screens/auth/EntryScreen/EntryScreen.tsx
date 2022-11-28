import { View, Text, StyleSheet, Image } from 'react-native';

import { MainLayout } from '../../../layouts';
import { COLORS, SIZES } from '../../../constants';
import { BottomStickyButtons } from '../../../components';

type EntryScreenProps = {
  navigation: {
    navigate: (route: string) => void;
  };
};

const EntryScreen: React.FC<EntryScreenProps> = ({ navigation: { navigate } }) => {
  const onGetStartedPressed = () => {
    navigate('SignUp');
  };

  const onSignInPressed = () => {
    navigate('SignIn');
  };

  return (
    <>
      <MainLayout>
        <Image
          source={require('../../../../assets/images/signInOrSignUp.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.bottomContainer}>
          <Text style={styles.title}>Hya! Welcome</Text>
          <Text style={styles.description}>
            Pettie helps you provide a fast and smart digital pet solution
          </Text>
        </View>
      </MainLayout>
      <BottomStickyButtons
        primaryLabel="Get Started"
        onPrimaryPressed={onGetStartedPressed}
        secondaryLabel="Already have an account?"
        onSecondaryPressed={onSignInPressed}
      />
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    maxHeight: '40%',
    marginTop: SIZES.padding,
    alignSelf: 'center',
  },
  bottomContainer: {
    paddingTop: SIZES.padding,
  },
  title: {
    fontSize: 25,
    fontFamily: 'extraBold',
    color: COLORS.primary,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    fontFamily: 'medium',
    color: COLORS.gray.medium,
    textAlign: 'center',
    marginTop: SIZES.padding,
    marginBottom: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding,
  },
});

export default EntryScreen;
