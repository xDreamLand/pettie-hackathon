import { Text, ImageBackground, StyleSheet } from 'react-native';
import React from 'react';

import { AuthHeader } from '../../../components';
import { COLORS, SIZES } from '../../../constants';
import { MainLayout } from '../../../layouts';

type TermsOfUseModalProps = {
  navigation: {
    navigate: (route: string) => void;
  };
};

const TermsOfUseModal: React.FC<TermsOfUseModalProps> = ({ navigation: { navigate } }) => {
  return (
    <>
      <MainLayout>
        <Text />
      </MainLayout>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
  },
});

export default TermsOfUseModal;
