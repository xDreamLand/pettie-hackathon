import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { ActionSheetProvider, connectActionSheet } from '@expo/react-native-action-sheet';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';
import { loadAsync } from 'expo-font';
import { Asset } from 'expo-asset';

import FlashMessage from 'react-native-flash-message';
import { SHADOWS, SIZES } from './src/constants';
import { MainContextProvider } from './src/context/MainContext';
import { Router } from './src/routes/Router';
import { LoadScreen } from './src/screens/auth';

const App = () => {
  const [isLoadingComplete, setIsLoadingComplete] = useState<boolean>(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        preventAutoHideAsync();

        await loadAsync({
          black: require('./assets/fonts/Montserrat-Black.ttf'),
          bold: require('./assets/fonts/Montserrat-Bold.ttf'),
          extraBold: require('./assets/fonts/Montserrat-ExtraBold.ttf'),
          extralight: require('./assets/fonts/Montserrat-ExtraLight.ttf'),
          italic: require('./assets/fonts/Montserrat-Italic.ttf'),
          light: require('./assets/fonts/Montserrat-Light.ttf'),
          medium: require('./assets/fonts/Montserrat-Medium.ttf'),
          regular: require('./assets/fonts/Montserrat-Regular.ttf'),
          semiBold: require('./assets/fonts/Montserrat-SemiBold.ttf'),
          thin: require('./assets/fonts/Montserrat-Thin.ttf'),
        });

        const images = [
          require('./assets/images/background.png'),
          require('./assets/images/signInOrSignUp.png'),
          require('./assets/images/email.png'),
          require('./assets/images/synchronisation.png'),
        ];

        const cacheImages = images.map((image) => {
          return Asset.fromModule(image).downloadAsync();
        });
        return Promise.all(cacheImages);
      } catch (e) {
        console.warn(e);
      } finally {
        setIsLoadingComplete(true);
        hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete) return <LoadScreen />;

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden />
      <ActionSheetProvider>
        <MainContextProvider>
          <Router />
        </MainContextProvider>
      </ActionSheetProvider>
      <FlashMessage
        position="top"
        hideStatusBar={true}
        titleStyle={{ fontFamily: 'light', textAlign: 'center' }}
        style={SHADOWS.large}
      />
    </View>
  );
};

const ConnectedApp = connectActionSheet(App);

export default ConnectedApp;
