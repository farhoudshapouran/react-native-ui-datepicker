import React, { ReactNode, memo, useMemo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useCalendarContext } from '../CalendarContext';
import type { CalendarViews } from '../enums';
import type { HeaderProps } from '../types';
import Header from './Header';
import Years from './Years';
import Months from './Months';
import Days from './Days';
import TimePicker from './TimePicker';
import { CALENDAR_HEIGHT } from '../enums';

const CalendarView: Record<CalendarViews, ReactNode> = {
  year: <Years />,
  month: <Months />,
  day: <Days />,
  time: <TimePicker />,
};

const defaultStyles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

interface Props extends HeaderProps {
  height?: number;
}

const Calendar = ({ buttonPrevIcon, buttonNextIcon, height }: Props) => {
  const { calendarView, styles, classNames, headerButtonsPosition } =
    useCalendarContext();

  const calendarContainerStyle: ViewStyle = useMemo(
    () => ({
      height: height || CALENDAR_HEIGHT,
      alignItems: 'center',
    }),
    [height]
  );

  return (
    <View style={defaultStyles.container} testID="calendar">
      <Header
        buttonPrevIcon={buttonPrevIcon}
        buttonNextIcon={buttonNextIcon}
        buttonsPosition={headerButtonsPosition}
        styles={styles}
        classNames={classNames}
      />
      <View style={calendarContainerStyle}>{CalendarView[calendarView]}</View>
    </View>
  );
};

const customComparator = (prev: Readonly<Props>, next: Readonly<Props>) => {
  const areEqual =
    prev.buttonPrevIcon === next.buttonPrevIcon &&
    prev.buttonNextIcon === next.buttonNextIcon &&
    prev.height === next.height;

  return areEqual;
};

export default memo(Calendar, customComparator);
