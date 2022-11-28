import React, { useState, useRef } from 'react';
import { View, FlatList, Animated, ListRenderItemInfo } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { KEYS } from '../../../constants';
import slides, { Slide } from '../../../../assets/data/slides';
import OnboardingItem from './components/OnboardingItem';
import Bottom from './components/Bottom';

type OnboardingProps = {
  navigation: {
    replace: (route: string) => void;
  };
};

const Onboarding: React.FC<OnboardingProps> = ({ navigation: { replace } }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<any>(null);

  const viewableItemsChanged = useRef<any>(({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const onNextPressed = async () => {
    if (currentIndex < slides.length - 1) {
      slidesRef?.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      finishOnBoarding();
    }
  };

  const finishOnBoarding = async () => {
    try {
      await AsyncStorage.setItem(KEYS['BOARDING'], 'true');
    } catch (err) {
      //TODO: error handling
    } finally {
      replace('Entry');
    }
  };

  return (
    <>
      <View style={{ flex: 3 }}>
        <FlatList
          data={slides}
          renderItem={({ item }: ListRenderItemInfo<Slide>) => <OnboardingItem slide={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <Bottom
        data={slides}
        scrollX={scrollX}
        onNextPressed={onNextPressed}
        onSkipPressed={finishOnBoarding}
      />
    </>
  );
};

export default Onboarding;
