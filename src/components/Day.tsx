import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { CalendarThemeProps, IDayObject } from '../types';
import { CALENDAR_HEIGHT } from '../enums';
import { addColorAlpha } from '../utils';
import { isEqual } from 'lodash';

export const daySize = 46;

interface Props extends Omit<IDayObject, 'day'> {
  isToday: boolean;
  isSelected: boolean;
  onSelectDate: (date: string) => void;
  theme: CalendarThemeProps;
  height?: number;
}

export const EmptyDay = React.memo(({ height }: { height?: number }) => (
  <View style={styles(height || CALENDAR_HEIGHT).dayCell} />
));

function Day({
  date,
  text,
  disabled,
  isCurrentMonth,
  isToday,
  isSelected,
  inRange,
  leftCrop,
  rightCrop,
  onSelectDate,
  theme,
  height,
}: Props) {
  const onPress = React.useCallback(
    () => onSelectDate(date),
    [onSelectDate, date]
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

  const style = styles(height || CALENDAR_HEIGHT);
  const rangeBackground =
    selectedRangeBackgroundColor ?? addColorAlpha(selectedItemColor, 0.15);
  const isCrop = inRange && (leftCrop || rightCrop) && !(leftCrop && rightCrop);

  const containerStyle = StyleSheet.flatten([
    style.dayContainer,
    isCurrentMonth || isCrop ? dayContainerStyle : style.disabledDay,
    isToday && {
      borderWidth: 2,
      borderColor: selectedItemColor,
      ...todayContainerStyle,
    },
    isSelected && {
      borderColor: selectedItemColor,
      backgroundColor: selectedItemColor,
    },
    disabled && style.disabledDay,
  ]);

  const textStyle = StyleSheet.flatten([
    isSelected
      ? {
          color: '#fff',
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
        disabled={disabled}
        onPress={onPress}
        style={containerStyle}
        testID={date}
        accessibilityRole="button"
        accessibilityLabel={text}
      >
        <View style={style.dayTextContainer}>
          <Text style={textStyle}>{text}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = (height: number) =>
  StyleSheet.create({
    dayCell: {
      position: 'relative',
      width: '14.25%',
      height: height / 7,
    },
    dayContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 1.5,
      borderRadius: 100,
    },
    dayTextContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    disabledDay: {
      opacity: 0.3,
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
) =>
  Object.is(prevProps.date, nextProps.date) &&
  Object.is(prevProps.text, nextProps.text) &&
  prevProps.disabled === nextProps.disabled &&
  prevProps.isCurrentMonth === nextProps.isCurrentMonth &&
  prevProps.isToday === nextProps.isToday &&
  prevProps.isSelected === nextProps.isSelected &&
  prevProps.inRange === nextProps.inRange &&
  prevProps.leftCrop === nextProps.leftCrop &&
  prevProps.rightCrop === nextProps.rightCrop &&
  prevProps.onSelectDate === nextProps.onSelectDate &&
  prevProps.height === nextProps.height &&
  isEqual(prevProps.theme, nextProps.theme);

export default React.memo(Day, customComparator);
