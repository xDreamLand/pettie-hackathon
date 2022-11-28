import { View, ActivityIndicator } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';

const LoadScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar hidden />
      <ActivityIndicator size={'small'} />
    </View>
  );
};

export default LoadScreen;
