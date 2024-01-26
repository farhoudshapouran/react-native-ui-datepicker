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
}

function EmptyDayPure() {
  return <View style={styles.dayCell} />;
}

export const EmptyDay = React.memo(EmptyDayPure);

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
}: Props) {
  const onPress = React.useCallback(() => {
    onSelectDate(date);
  }, [onSelectDate, date]);

  const {
    calendarTextStyle,
    dayContainerStyle,
    selectedItemColor,
    selectedTextStyle,
    todayContainerStyle,
    todayTextStyle,
  } = theme;

  //const bothWays = inRange && leftCrop && rightCrop;
  const isCrop = inRange && (leftCrop || rightCrop) && !(leftCrop && rightCrop);

  const containerStyle = isCurrentMonth ? dayContainerStyle : { opacity: 0.3 };

  const todayItemStyle = isToday
    ? {
        borderWidth: 2,
        borderColor: selectedItemColor || '#0047FF',
        ...todayContainerStyle,
      }
    : null;

  const activeItemStyle = isSelected
    ? {
        borderColor: selectedItemColor || '#0047FF',
        backgroundColor: selectedItemColor || '#0047FF',
      }
    : null;

  const textStyle = isSelected
    ? { color: '#fff', ...selectedTextStyle }
    : isToday
    ? {
        ...calendarTextStyle,
        color: selectedItemColor || '#0047FF',
        ...todayTextStyle,
      }
    : calendarTextStyle;

  const rangeRootBackground = addColorAlpha(selectedItemColor, 0.15);

  return (
    <View style={styles.dayCell}>
      {inRange && !isCrop ? (
        <View
          style={[styles.rangeRoot, { backgroundColor: rangeRootBackground }]}
        ></View>
      ) : null}

      {isCrop && leftCrop ? (
        <View
          style={[
            styles.rangeRoot,
            {
              left: '50%',
              backgroundColor: rangeRootBackground,
            },
          ]}
        ></View>
      ) : null}

      {isCrop && rightCrop ? (
        <View
          style={[
            styles.rangeRoot,
            {
              right: '50%',
              backgroundColor: rangeRootBackground,
            },
          ]}
        ></View>
      ) : null}

      <Pressable
        disabled={disabled}
        onPress={disabled ? undefined : onPress}
        style={[
          styles.dayContainer,
          containerStyle,
          todayItemStyle,
          activeItemStyle,
          disabled && styles.disabledDay,
        ]}
        testID={date}
        accessibilityRole="button"
        accessibilityLabel={text}
      >
        <View style={[styles.dayTextContainer]}>
          <Text style={[textStyle]}>{text}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  dayCell: {
    position: 'relative',
    width: '14.2%',
    height: CALENDAR_HEIGHT / 7,
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
) => {
  return (
    prevProps.date === nextProps.date &&
    prevProps.text === nextProps.text &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.isCurrentMonth === nextProps.isCurrentMonth &&
    prevProps.isToday === nextProps.isToday &&
    prevProps.isSelected === nextProps.isSelected &&
    prevProps.inRange === nextProps.inRange &&
    prevProps.leftCrop === nextProps.leftCrop &&
    prevProps.rightCrop === nextProps.rightCrop &&
    prevProps.onSelectDate === nextProps.onSelectDate &&
    isEqual(prevProps.theme, nextProps.theme)
  );
};

export default React.memo(Day, customComparator);
