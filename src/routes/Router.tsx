import React, { useEffect, useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAuthentication } from '../hooks/useAuthentication';
import { AuthStack } from './AuthStack';
import { KEYS } from '../constants';
import { db, doc, getDoc } from '../firebase';
import { MainContext, Family } from '../context/MainContext';
import Tabs from './BottomNav';
import { EntryFamilyScreen } from '../screens/main';

export const Router = () => {
  const [onboarded, setOnboarded] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const [loaded, setLoaded] = useState(false);

  const { setUser, setFamily, family } = useContext(MainContext);
  const { user } = useAuthentication();

  useEffect(() => {
    getStorage();
  }, []);

  const getStorage = async () => {
    try {
      const value = await AsyncStorage.getItem(KEYS['BOARDING']);
      if (value !== null) {
        setOnboarded(true);
        return;
      }
    } catch (e) {
      // error reading value
    } finally {
      setLoaded(true);
    }
    return;
  };

  const noFamily = () => {
    setFamily({} as Family);
  };

  const putFamily = (family: Family) => {
    setFamily(family);
  };

  const getFamily = async () => {
    if (!user) return;

    const familyId = await (await getDoc(doc(db, 'users', user.uid))).data()?.familyId;
    if (!familyId) return noFamily();

    const family = (await getDoc(doc(db, 'families', familyId))).data();
    if (!family) return noFamily();

    const participants = family.participants;
    if (!participants) return noFamily();

    console.log(participants);
    return Object.values(participants).includes(user.uid)
      ? putFamily(family as Family)
      : noFamily();
  };

  useEffect(() => {
    const func = async () => {
      if (user && user.emailVerified) {
        getFamily()
          .then(() => {
            setUser(user);
            setAuthenticated(true);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setAuthenticated(false);
      }
    };

    func();
  }, [user]);

  // TODO: loader?
  if (!loaded) return null;

  return (
    <NavigationContainer>
      {authenticated ? (
        Object.keys(family).length !== 0 ? (
          <Tabs />
        ) : (
          <EntryFamilyScreen />
        )
      ) : (
        <AuthStack onboarded={onboarded} />
      )}
    </NavigationContainer>
  );
};
