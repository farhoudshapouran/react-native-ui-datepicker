import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getWeekdaysMin } from '../utils';
import { Styles, ClassNames, WeekdayName } from '../types';

type WeekDaysProps = {
  locale: string | ILocale;
  firstDayOfWeek: number;
  styles?: Styles;
  classNames?: ClassNames;
  weekdays?: WeekdayName;
};

const WeekDays = ({
  locale,
  firstDayOfWeek,
  styles = {},
  classNames = {},
  weekdays = 'min',
}: WeekDaysProps) => {
  return (
    <View
      style={[defaultStyles.container, styles.weekdays]}
      className={classNames.weekdays}
      testID="weekdays"
    >
      {getWeekdaysMin(locale, firstDayOfWeek, weekdays)?.map(
        (weekday, index) => (
          <View
            key={index}
            style={[defaultStyles.weekday, styles.weekday]}
            className={classNames.weekday}
          >
            <Text
              style={styles?.weekday_label}
              className={classNames.weekday_label}
            >
              {weekday}
            </Text>
          </View>
        )
      )}
    </View>
  );
};

export default memo(WeekDays);

const defaultStyles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 6,
    alignItems: 'center',
  },
  weekday: {
    width: '14.25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
