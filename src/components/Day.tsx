import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { CalendarThemeProps, DayObject } from '../types';
import { CALENDAR_HEIGHT } from '../enums';
import { addColorAlpha } from '../utils';
import { isEqual } from 'lodash';

interface Props {
  day: DayObject;
  onSelectDate: (date: string) => void;
  theme: CalendarThemeProps;
  calendarHeight?: number;
  renderDay?: (day: DayObject) => React.ReactNode;
}

export const EmptyDay = React.memo(({ height }: { height?: number }) => (
  <View style={styles(height || CALENDAR_HEIGHT).dayCell} />
));

const Day = ({
  day,
  onSelectDate,
  theme,
  calendarHeight,
  renderDay,
}: Props) => {
  const {
    text,
    date,
    isDisabled,
    isCurrentMonth,
    isToday,
    isSelected,
    inRange,
    leftCrop,
    rightCrop,
  } = day;

  const onPress = React.useCallback(
    () => onSelectDate(day.date),
    [onSelectDate, day.date]
  );

  const {
    calendarTextStyle,
    dayContainerStyle,
    selectedItemColor = '#0047FF',
    selectedTextStyle,
    todayContainerStyle,
    todayTextStyle,
    selectedRangeBackgroundColor,
  } = theme;

  const style = styles(calendarHeight || CALENDAR_HEIGHT);
  const rangeBackground =
    selectedRangeBackgroundColor ?? addColorAlpha(selectedItemColor, 0.15);
  const isCrop = inRange && (leftCrop || rightCrop) && !(leftCrop && rightCrop);

  const containerStyle = StyleSheet.flatten([
    style.dayContainer,
    isCurrentMonth || inRange ? dayContainerStyle : style.disabledDay,
    isToday && {
      borderColor: selectedItemColor,
      ...todayContainerStyle,
    },
    isSelected && {
      borderColor: selectedItemColor,
      backgroundColor: selectedItemColor,
    },
    isDisabled && style.disabledDay,
  ]);

  const textStyle = StyleSheet.flatten([
    isSelected
      ? {
          color: '#fff',
          ...calendarTextStyle,
          ...selectedTextStyle,
        }
      : isToday
      ? {
          ...calendarTextStyle,
          color: selectedItemColor,
          ...todayTextStyle,
        }
      : calendarTextStyle,
  ]);

  return (
    <View style={style.dayCell}>
      {inRange && !isCrop && (
        <View style={[style.rangeRoot, { backgroundColor: rangeBackground }]} />
      )}
      {isCrop && (
        <>
          {leftCrop && (
            <View
              style={[
                style.rangeRoot,
                { left: '50%', backgroundColor: rangeBackground },
              ]}
            />
          )}
          {rightCrop && (
            <View
              style={[
                style.rangeRoot,
                { right: '50%', backgroundColor: rangeBackground },
              ]}
            />
          )}
        </>
      )}
      <Pressable
        disabled={isDisabled}
        onPress={onPress}
        style={style.dayWrapper}
        testID={date}
        accessibilityRole="button"
        accessibilityLabel={text}
      >
        {renderDay ? (
          renderDay(day)
        ) : (
          <View style={containerStyle}>
            <Text style={textStyle}>{text}</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
};

const styles = (calendarHeight: number) =>
  StyleSheet.create({
    dayCell: {
      width: '14.25%',
    },
    dayWrapper: {
      margin: 1.5,
    },
    dayContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: calendarHeight * 0.14,
      borderRadius: 100,
      borderWidth: 1,
      borderColor: 'transparent',
    },
    disabledDay: {
      opacity: 0.5,
    },
    rangeRoot: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 2,
      bottom: 2,
    },
  });

const customComparator = (
  prevProps: Readonly<Props>,
  nextProps: Readonly<Props>
) => {
  return (
    isEqual(prevProps.day, nextProps.day) &&
    prevProps.onSelectDate === nextProps.onSelectDate &&
    prevProps.calendarHeight === nextProps.calendarHeight &&
    prevProps.renderDay === nextProps.renderDay &&
    isEqual(prevProps.theme, nextProps.theme)
  );
};

export default React.memo(Day, customComparator);
