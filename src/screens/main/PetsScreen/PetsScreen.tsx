import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Entypo, Octicons } from '@expo/vector-icons';

import { COLORS, SHADOWS, SIZES } from '../../../constants';
import { MainLayout } from '../../../layouts';

const days: DayType[] = [
  { day: 'Mon', date: 21, active: false },
  { day: 'Tue', date: 22, active: false },
  { day: 'Wed', date: 23, active: false },
  { day: 'Thu', date: 24, active: false },
  { day: 'Fri', date: 25, active: false },
  { day: 'Sat', date: 26, active: false },
  { day: 'Sun', date: 27, active: true },
];

interface DayType {
  day: string;
  date: number;
  active: boolean;
}

const PetsScreen = () => {
  return (
    <MainLayout style={styles.container} withScroll={false}>
      <View style={styles.inner}>
        <View style={{ marginBottom: 30 }}>
          <Text style={styles.title}>Diet Tracking</Text>
          <Text style={styles.subtitle}>You have 1 pet</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Octicons
            name="triangle-down"
            size={25}
            style={{ marginRight: 10 }}
            color={COLORS.primary}
          />
          <Text style={styles.innerTitle}>Bruno's Weekly Diet Plan</Text>
        </View>
        <FlatList
          data={Object.values(days)}
          contentContainerStyle={{ alignItems: 'center', marginTop: SIZES.padding }}
          ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
          scrollEnabled={false}
          horizontal={true}
          renderItem={({ item }) => <Day day={item.day} date={item.date} active={item.active} />}
        />

        <View style={styles.progress}>
          <Text style={styles.progressTitle}>Today's Progress</Text>
          <View style={styles.progressInner}>
            <View style={styles.progressItem}>
              <Text style={styles.progressItemTitle}>Morning</Text>
              <Text style={styles.progressItemTime}>8:00 AM</Text>
              <Entypo name="check" size={20} color="#52BE80" />
            </View>
            <View style={styles.progressItem}>
              <Text style={styles.progressItemTitle}>Afternoon</Text>
              <Text style={styles.progressItemTime}>3:00 PM</Text>
              <Entypo name="time-slot" size={20} color="#E59866" />
            </View>
            <View style={styles.progressItem}>
              <Text style={styles.progressItemTitle}>Evening</Text>
              <Text style={styles.progressItemTime}>7:00 PM</Text>
              <Entypo name="block" size={20} color={COLORS.gray.dark} />
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.btn} activeOpacity={0.7}>
          <Text style={styles.btnText}>Register Afternoon Meal</Text>
          <Text style={{ fontFamily: 'italic', color: COLORS.white, fontSize: 12 }}>
            500gr of dog food
          </Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
};

const Day: React.FC<DayType> = ({ day, date, active }) => {
  return (
    <View
      style={[
        styles.dayContainer,
        active && { backgroundColor: COLORS.primary },
        (day === 'Mon' ||
          day === 'Tue' ||
          day === 'Wed' ||
          day === 'Thu' ||
          day === 'Fri' ||
          day === 'Sat') && { backgroundColor: '#D2B4DE' },
      ]}
    >
      <Text style={[styles.day, active && { color: COLORS.white }]}>{day}</Text>
      <Text style={[styles.date, active && { color: COLORS.white }]}>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  inner: {},
  title: {
    color: COLORS.gray.dark,
    fontFamily: 'semiBold',
    fontSize: SIZES.h3 + 2,
  },
  subtitle: {
    color: COLORS.gray.dark,
    fontFamily: 'regular',
    fontSize: SIZES.h3,
  },
  innerTitle: {
    alignSelf: 'flex-start',
    color: COLORS.gray.dark,
    fontFamily: 'semiBold',
    fontSize: SIZES.h2,
    textAlign: 'center',
  },
  dayContainer: {
    width: SIZES.width / 10,
    height: SIZES.width / 7.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.gray.light,
    borderRadius: 10,
  },
  day: {
    color: COLORS.gray.dark,
    fontFamily: 'semiBold',
    fontSize: SIZES.h4,
  },
  date: {
    color: COLORS.gray.dark,
    fontFamily: 'medium',
    fontSize: SIZES.h4,
  },
  btn: {
    marginTop: SIZES.padding * 2,
    width: '100%',
    height: SIZES.width / 6,
    backgroundColor: '#E59866',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  btnText: {
    color: COLORS.white,
    fontFamily: 'bold',
    fontSize: SIZES.h3,
    marginRight: 10,
  },
  progress: {
    marginTop: SIZES.padding,
    width: '100%',
    height: SIZES.width / 3.5,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  progressTitle: {
    color: COLORS.primary,
    fontFamily: 'black',
    fontSize: SIZES.h4,
  },
  progressInner: {
    marginTop: SIZES.padding,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  progressItem: {
    width: SIZES.width / 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressItemTitle: {
    color: COLORS.gray.dark,
    fontFamily: 'semiBold',
    fontSize: SIZES.h4,
  },
  progressItemTime: {
    color: COLORS.gray.medium,
    fontFamily: 'medium',
    fontSize: SIZES.h4,
    marginBottom: 3,
  },
  progressItemStatus: {
    marginTop: 3,
    fontFamily: 'medium',
    fontSize: SIZES.h4,
  },
});

export default PetsScreen;
