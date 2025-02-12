import React, { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { getWeekdaysMin } from '../utils';
import { Styles, ClassNames, WeekdayName } from '../types';
import { ThemedText, ThemedView } from '../ui';
import { WEEKDAYS_HEIGHT } from '../enums';

type WeekdaysProps = {
  locale: string | ILocale;
  firstDayOfWeek: number;
  styles?: Styles;
  classNames?: ClassNames;
  weekdays?: WeekdayName;
  weekdaysHeight?: number;
};

const Weekdays = ({
  locale,
  firstDayOfWeek,
  styles = {},
  classNames = {},
  weekdays = 'min',
  weekdaysHeight = WEEKDAYS_HEIGHT,
}: WeekdaysProps) => {
  const style = useMemo(
    () => createDefaultStyles(weekdaysHeight),
    [weekdaysHeight]
  );

  return (
    <ThemedView
      style={[style.container, styles.weekdays]}
      className={classNames.weekdays}
      testID="weekdays"
    >
      {getWeekdaysMin(locale, firstDayOfWeek, weekdays)?.map(
        (weekday, index) => (
          <ThemedView
            key={index}
            style={[style.weekday, styles.weekday]}
            className={classNames.weekday}
          >
            <ThemedText
              style={styles?.weekday_label}
              className={classNames.weekday_label}
            >
              {weekday}
            </ThemedText>
          </ThemedView>
        )
      )}
    </ThemedView>
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
