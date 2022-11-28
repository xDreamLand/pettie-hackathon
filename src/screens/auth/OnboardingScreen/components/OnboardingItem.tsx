import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

import { COLORS, SIZES } from '../../../../constants';
import { Slide } from '../../../../../assets/data/slides';

type OnboardingItemProps = {
  slide: Slide;
};

const OnboardingItem: React.FC<OnboardingItemProps> = ({ slide }) => {
  return (
    <View style={{ width: SIZES.width }}>
      <View style={styles.imageContainer}>
        <Image source={slide.image} style={styles.image} />
      </View>
      <View style={styles.text}>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.description}>{slide.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image: {
    width: SIZES.width * 0.8,
    height: SIZES.width * 0.8 * 0.6,
    resizeMode: 'contain',
  },
  text: {
    flex: 1,
    marginTop: SIZES.padding * 2,
    justifyContent: 'flex-start',
  },
  title: {
    fontFamily: 'extraBold',
    color: COLORS.primary,
    fontSize: 35,
    marginBottom: 15,
    textAlign: 'center',
    paddingHorizontal: SIZES.padding,
    flexWrap: 'wrap',
  },
  description: {
    fontFamily: 'medium',
    fontSize: 18,
    color: COLORS.gray.medium,
    textAlign: 'center',
    paddingHorizontal: SIZES.padding,
  },
});

export default OnboardingItem;
