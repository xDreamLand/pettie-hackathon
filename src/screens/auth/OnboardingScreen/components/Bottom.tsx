import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { COLORS, SIZES } from '../../../../constants';

interface BottomProps {
  data: any;
  scrollX: any;
  onNextPressed: () => void;
  onSkipPressed: () => void;
}

const Bottom: React.FC<BottomProps> = ({ data, scrollX, onNextPressed, onSkipPressed }) => {
  const { width } = SIZES;
  return (
    <View style={styles.container}>
      {/* Skip */}
      <TouchableOpacity style={styles.child} activeOpacity={0.6} onPress={onSkipPressed}>
        <Text style={styles.skip}>Skip</Text>
      </TouchableOpacity>
      {/* Paginator */}
      <View style={styles.child}>
        <View style={{ flexDirection: 'row' }}>
          {data.map((_: any, i: number) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width]; // prev, curr, next
            const dotWith = scrollX.interpolate({
              inputRange,
              outputRange: [10, 20, 10],
              extrapolate: 'clamp',
            });
            const backgroundColor = scrollX.interpolate({
              inputRange,
              outputRange: [COLORS.gray.medium, COLORS.primary, COLORS.primary],
              extrapolate: 'clamp',
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.6, 1, 0.6],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                style={[styles.dot, { width: dotWith, backgroundColor, opacity }]}
                key={i.toString()}
              />
            );
          })}
        </View>
      </View>
      {/* Next */}
      <View style={styles.child}>
        <TouchableOpacity style={styles.btnContainer} activeOpacity={0.9} onPress={onNextPressed}>
          <Text style={styles.btnText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
    flexDirection: 'row',
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.base,
  },
  child: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 7,
    width: 7,
    borderRadius: 1000,
    marginHorizontal: 3,
  },
  skip: {
    fontSize: SIZES.body3,
    fontFamily: 'light',
    color: COLORS.gray.medium,
  },
  btnContainer: {
    width: (SIZES.width / 3) * 0.9,
    height: SIZES.height * 0.065,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: SIZES.body4,
    fontFamily: 'medium',
    color: COLORS.white,
  },
});

export default Bottom;
