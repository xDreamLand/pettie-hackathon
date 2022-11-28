import { Text, StyleSheet } from 'react-native';

import { COLORS, SIZES } from '../../../constants';
import { MainLayout } from '../../../layouts';

type PrivacyPolicyModalProps = {
  navigation: {
    navigate: (route: string) => void;
  };
};

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ navigation: { navigate } }) => {
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

export default PrivacyPolicyModal;
