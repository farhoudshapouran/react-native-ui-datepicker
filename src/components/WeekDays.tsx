import React, { memo, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getWeekdays } from '../utils';
import { Styles, ClassNames, WeekdayFormat } from '../types';
import { WEEKDAYS_HEIGHT } from '../enums';

type WeekdaysProps = {
  locale: string | ILocale;
  firstDayOfWeek: number;
  styles?: Styles;
  classNames?: ClassNames;
  weekdaysFormat?: WeekdayFormat;
  weekdaysHeight?: number;
};

const Weekdays = ({
  locale,
  firstDayOfWeek,
  styles = {},
  classNames = {},
  weekdaysFormat = 'min',
  weekdaysHeight = WEEKDAYS_HEIGHT,
}: WeekdaysProps) => {
  const style = useMemo(
    () => createDefaultStyles(weekdaysHeight),
    [weekdaysHeight]
  );

  return (
    <View
      style={[style.container, styles.weekdays]}
      className={classNames.weekdays}
      testID="weekdays"
    >
      {getWeekdays(locale, firstDayOfWeek, weekdaysFormat)?.map(
        (weekday, index) => (
          <View
            key={index}
            style={[style.weekday, styles.weekday]}
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

export default memo(Weekdays);

const createDefaultStyles = (weekdaysHeight: number) =>
  StyleSheet.create({
    container: {
      height: weekdaysHeight,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },
    weekday: {
      width: `${100 / 7}%`,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
