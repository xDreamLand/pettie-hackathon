import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS, SHADOWS, SIZES } from '../constants';

interface BottomProps {
  primaryLabel: string;
  onPrimaryPressed: () => void;
  secondaryLabel: string;
  onSecondaryPressed: () => void;
}

const BottomStickyButtons: React.FC<BottomProps> = ({
  primaryLabel,
  onPrimaryPressed,
  secondaryLabel,
  onSecondaryPressed,
}) => {
  return (
    <View style={styles.container}>
      {/* Primary */}
      <TouchableOpacity
        style={[styles.btn, SHADOWS.medium, { backgroundColor: COLORS.primary }]}
        activeOpacity={0.85}
        onPress={onPrimaryPressed}
      >
        <Text style={[styles.text, { color: COLORS.white }]}>{primaryLabel}</Text>
      </TouchableOpacity>
      {/* Secondary */}
      <TouchableOpacity style={styles.btn} activeOpacity={0.5} onPress={onSecondaryPressed}>
        <Text style={[styles.text, { fontFamily: 'medium' }]}>{secondaryLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: SIZES.padding,
    width: '100%',
    alignItems: 'center',
  },
  btn: {
    width: '90%',
    height: SIZES.height * 0.075,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'semiBold',
    fontSize: 18,
    color: COLORS.gray.medium,
  },
});

export default BottomStickyButtons;
