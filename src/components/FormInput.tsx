import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { COLORS, SIZES } from '../constants';

type FormInputProps = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  innerRef?: React.RefObject<any>;
  onSubmitEnding?: () => void;
  isPassword?: boolean;
  isEmail?: boolean;
  isSubmit?: boolean;
};

const FormInput: React.FC<FormInputProps> = ({
  placeholder,
  value,
  onChangeText,
  innerRef,
  onSubmitEnding,
  isPassword = false,
  isEmail = false,
  isSubmit = false,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <TextInput
        ref={innerRef}
        returnKeyType={isSubmit ? 'done' : 'next'}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        placeholder={placeholder}
        keyboardType={isPassword || !isEmail ? 'default' : 'email-address'}
        placeholderTextColor={COLORS.gray.medium}
        secureTextEntry={isPassword && !isVisible}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        onSubmitEditing={onSubmitEnding}
      />
      {isPassword && (
        <TouchableOpacity activeOpacity={0.6} onPress={() => setIsVisible((old) => !old)}>
          {isVisible ? (
            <Feather name="eye" size={20} color={COLORS.gray.medium} />
          ) : (
            <Feather name="eye-off" size={20} color={COLORS.gray.medium} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.padding / 1.7,
    paddingHorizontal: SIZES.padding,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontFamily: 'regular',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});

export default FormInput;
