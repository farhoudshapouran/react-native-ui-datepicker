import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { getWeekdaysMin } from '../utils';
import { Styles, ClassNames, WeekdayName } from '../types';
import { ThemedText, ThemedView } from '../ui';

type WeekdaysProps = {
  locale: string | ILocale;
  firstDayOfWeek: number;
  styles?: Styles;
  classNames?: ClassNames;
  weekdays?: WeekdayName;
};

const Weekdays = ({
  locale,
  firstDayOfWeek,
  styles = {},
  classNames = {},
  weekdays = 'min',
}: WeekdaysProps) => {
  return (
    <ThemedView
      style={[defaultStyles.container, styles.weekdays]}
      className={classNames.weekdays}
      testID="weekdays"
    >
      {getWeekdaysMin(locale, firstDayOfWeek, weekdays)?.map(
        (weekday, index) => (
          <ThemedView
            key={index}
            style={[defaultStyles.weekday, styles.weekday]}
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
