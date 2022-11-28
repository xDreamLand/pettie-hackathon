import {
  View,
  TouchableOpacity,
  ViewStyle,
  ImageBackground,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { COLORS, SIZES } from '../constants';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
  withScroll?: boolean;
} & (
  | {
      // withHeader = true? -> require headerRedirect function
      withHeader: true;
      headerRedirect: () => void;
    }
  | {
      // withHeader = false? -> don't require headerRedirect function
      withHeader?: false;
      headerRedirect?: () => void;
    }
);

const HITSLOP_SIZE = { top: 30, bottom: 30, left: 30, right: 30 };

const MainLayout: React.FC<Props> = ({
  children,
  style,
  withScroll = true,
  withHeader = false,
  headerRedirect,
}) => {
  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      resizeMode="contain"
      style={{ ...styles.container, ...style }}
    >
      {withHeader && (
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={headerRedirect} hitSlop={HITSLOP_SIZE}>
            <AntDesign name="arrowleft" size={24} color={COLORS.gray.dark} />
          </TouchableOpacity>
        </View>
      )}
      {withScroll ? (
        <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ flex: 1 }}>
          {children}
        </ScrollView>
      ) : (
        children
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: SIZES.padding * 1.5,
    paddingTop: 35,
  },
  headerContainer: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
});

export default MainLayout;
