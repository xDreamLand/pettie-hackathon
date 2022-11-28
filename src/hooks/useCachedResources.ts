import { loadAsync } from 'expo-font';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';
import { useEffect, useState } from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setIsLoadingComplete] = useState<boolean>(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        preventAutoHideAsync();

        await loadAsync({
          'montserrat-black': require('../../assets/fonts/Montserrat-Black.ttf'),
          'montserrat-bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
          'montserrat-extraBold': require('../../assets/fonts/Montserrat-ExtraBold.ttf'),
          'montserrat-extralight': require('../../assets/fonts/Montserrat-ExtraLight.ttf'),
          'montserrat-italic': require('../../assets/fonts/Montserrat-Italic.ttf'),
          'montserrat-light': require('../../assets/fonts/Montserrat-Light.ttf'),
          'montserrat-medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
          'montserrat-regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
          'montserrat-semiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf'),
          'montserrat-thin': require('../../assets/fonts/Montserrat-Thin.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setIsLoadingComplete(true);
        hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
