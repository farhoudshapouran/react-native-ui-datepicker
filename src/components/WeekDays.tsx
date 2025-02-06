import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getWeekdaysMin } from '../utils';
import { CalendarThemeProps } from '../types';

type WeekDaysProps = {
  locale: string | ILocale;
  firstDayOfWeek: number;
  theme: CalendarThemeProps;
};

const WeekDays = ({ locale, firstDayOfWeek, theme }: WeekDaysProps) => {
  return (
    <View
      style={[styles.weekDaysContainer, theme?.weekDaysContainerStyle]}
      testID="week-days"
    >
      {getWeekdaysMin(locale, firstDayOfWeek)?.map((item, index) => (
        <View key={index} style={styles.weekDayCell}>
          <Text style={theme?.weekDaysTextStyle}>{item}</Text>
        </View>
      ))}
    </View>
  );
};

export default memo(WeekDays);

const styles = StyleSheet.create({
  weekDaysContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingBottom: 10,
    paddingTop: 5,
    marginBottom: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
  },
  weekDayCell: {
    width: '14.2%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
