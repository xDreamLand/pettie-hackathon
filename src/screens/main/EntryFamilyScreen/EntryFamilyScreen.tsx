import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useContext } from 'react';
import { showMessage } from 'react-native-flash-message';

import { Family, MainContext } from '../../../context/MainContext';
import { getDoc, db, doc, updateDoc, setDoc } from '../../../firebase';
import { COLORS, SHADOWS, SIZES } from '../../../constants';
import { BottomStickyButtons, FormInput } from '../../../components';
import { MainLayout } from '../../../layouts';

const FLASH_MESSAGE_DURATION = 6000;

const EntryFamilyScreen: React.FC<any> = ({ navigation }) => {
  const [familyID, setFamilyID] = useState<string>('');
  const { user, setFamily } = useContext(MainContext);

  const onCreateFamilyPressed = async () => {
    await setDoc(doc(db, 'families', user.uid), {
      family: user.displayName?.split(' ').pop(),
      participants: [user.uid],
    });
  };

  const onJoinFamilyPressed = async () => {
    if (!familyID) {
      showMessage({
        message: 'No PettieFamily ID has been provided',
        type: 'danger',
        duration: FLASH_MESSAGE_DURATION,
      });
      return;
    }

    // Check if family exists
    const family = (await getDoc(doc(db, 'families', familyID))).data();
    if (!family) {
      showMessage({
        message: 'This PettieFamily does not exist',
        type: 'danger',
        duration: FLASH_MESSAGE_DURATION,
      });
      return;
    } else if (Object.values(family.participants).includes(user.uid)) {
      const currentId = await (await getDoc(doc(db, 'users', user.uid))).data()?.familyId;
      if (currentId === familyID) {
        return navigation.replace('Home');
      } else {
        const userRef = doc(db, 'users', user.uid);
        if (!userRef) return;
        await updateDoc(userRef, { familyId: familyID }).then(() => {
          setFamily(family as Family);
          navigation.replace('Home');
        });
        return;
      }
    } else {
      showMessage({
        message: 'You are not a member of this family. Ask the owner to add you.',
        type: 'danger',
        duration: FLASH_MESSAGE_DURATION,
      });
      return;
    }
  };

  return (
    <>
      <MainLayout style={styles.container}>
        <View style={{ marginTop: SIZES.padding }}>
          <Text style={styles.title}>
            Synchronisation<Text style={{ color: COLORS.secondary }}>.</Text>
          </Text>
          <Text style={styles.description}>
            We did not find a PettieFamily linked to your account. {'\n\n'}You're able to
            participate in an already existing PettieFamily, or you're able to create your own
            PettieFamily on which you can start adding pets and relatives.
          </Text>
        </View>
        <FormInput
          placeholder="PettieFamily ID"
          value={familyID}
          onChangeText={(text) => setFamilyID(text)}
        />
      </MainLayout>

      <BottomStickyButtons
        onPrimaryPressed={onJoinFamilyPressed}
        primaryLabel={'Participate'}
        onSecondaryPressed={onCreateFamilyPressed}
        secondaryLabel={'Create my own PettieFamily'}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.padding * 2,
  },
  title: {
    fontFamily: 'extraBold',
    color: COLORS.primary,
    fontSize: SIZES.h1,
  },
  description: {
    marginTop: SIZES.padding,
    marginBottom: SIZES.padding * 1.5,
    fontSize: SIZES.h3,
    fontFamily: 'semiBold',
    color: COLORS.gray.dark,
  },
  btn: {
    borderRadius: SIZES.radius,
    height: SIZES.height * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: SIZES.body3,
    fontFamily: 'medium',
    color: COLORS.gray.dark,
  },
});

export default EntryFamilyScreen;
