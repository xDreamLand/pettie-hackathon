import { ImageProps } from 'react-native';

export interface Slide {
  id: string;
  title: string;
  description: string;
  image: ImageProps;
}

const slides: Slide[] = [
  {
    id: 'ob1',
    title: 'Welcome!',
    description:
      'Pettie is the most complete digtal pet-care platform out there. We offer everything you need in order to fully take care of your beloved pets!',
    image: require('../images/onboarding/ob1.png'),
  },
  {
    id: 'ob2',
    title: 'Synchronisation',
    description:
      'Do you find it hard to keep track of who did what in the household? Pettie offers synchronisation between every device in your family.',
    image: require('../images/onboarding/ob2.png'),
  },
  {
    id: 'ob3',
    title: 'Food Tracking',
    description:
      'A consistent diet is very important for a pet, it helps to give your dog a baseline for what to expect in her daily life. We got you covered on that.',
    image: require('../images/onboarding/ob3.png'),
  },
  {
    id: 'ob4',
    title: 'Much more',
    description:
      "We offer many more feature. Too many to talk about. Let's get you started, so you can check it out for yourself!",
    image: require('../images/onboarding/ob4.png'),
  },
];

export default slides;
