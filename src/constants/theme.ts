import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
  primary: 'rgb(106,101,192)',
  secondary: '#FA4B00',

  error: '#E53935',
  black: '#000000',
  white: '#ffffff',
  gray: {
    dark: '#434141',
    medium: '#ABA8A8',
    light: '#D9D9D9',
  },
  stock: {
    green: '#00B16A',
    red: '#E53935',
  },
};

export const SIZES = {
  // Global
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // Fonts
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  h5: 12,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 15,
  body5: 12,

  // App dimensions
  width,
  height,
};

export const SHADOWS = StyleSheet.create({
  light: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
});
