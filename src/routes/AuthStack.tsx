import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import {
  OnboardingScreen,
  EntryScreen,
  SignInScreen,
  SignUpScreen,
  VerificationScreen,
  TermsOfUseModal,
  PrivacyPolicyModal,
  ForgotPasswordScreen,
} from '../screens/auth';

type AuthStackProps = {
  onboarded: boolean;
};

const AuthNativeStack = createNativeStackNavigator();

export const AuthStack: React.FC<AuthStackProps> = ({ onboarded }) => {
  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
  };

  return (
    <AuthNativeStack.Navigator
      initialRouteName={onboarded ? 'Entry' : 'Onboarding'}
      screenOptions={screenOptions}
    >
      <AuthNativeStack.Screen name="Onboarding" component={OnboardingScreen} />
      <AuthNativeStack.Screen name="Entry" component={EntryScreen} />
      <AuthNativeStack.Screen name="SignIn" component={SignInScreen} />
      <AuthNativeStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthNativeStack.Screen name="Verification" component={VerificationScreen} />
      <AuthNativeStack.Group screenOptions={{ presentation: 'modal' }}>
        <AuthNativeStack.Screen name="termsOfUse" component={TermsOfUseModal} />
        <AuthNativeStack.Screen name="privacyPolicy" component={PrivacyPolicyModal} />
      </AuthNativeStack.Group>
      <AuthNativeStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </AuthNativeStack.Navigator>
  );
};
