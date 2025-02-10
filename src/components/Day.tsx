import React, { memo, useMemo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ClassNames, DayObject, Styles } from '../types';
import { CALENDAR_HEIGHT } from '../enums';
import { cn } from '../utils';
import { isEqual } from 'lodash';

interface Props {
  day: DayObject;
  onSelectDate: (date: string) => void;
  calendarHeight?: number;
  renderDay?: (day: DayObject) => React.ReactNode;
  styles?: Styles;
  classNames?: ClassNames;
}

export const EmptyDay = React.memo(
  ({ calendarHeight }: { calendarHeight?: number }) => {
    const style = useMemo(
      () => createDefaultStyles(calendarHeight || CALENDAR_HEIGHT),
      [calendarHeight]
    );
    return <View style={style.dayCell} />;
  }
);

const Day = ({
  day,
  onSelectDate,
  calendarHeight,
  renderDay,
  styles = {},
  classNames = {},
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
    isStartOfWeek,
    isEndOfWeek,
  } = day;

  const style = useMemo(
    () => createDefaultStyles(calendarHeight || CALENDAR_HEIGHT),
    [calendarHeight]
  );

  const isCrop = inRange && (leftCrop || rightCrop) && !(leftCrop && rightCrop);
  const inMiddle = inRange && !leftCrop && !rightCrop;
  const rangeStart = inRange && leftCrop;
  const rangeEnd = inRange && rightCrop;

  const containerStyle = StyleSheet.flatten([
    style.dayContainer,
    styles.day,
    isToday && styles.today,
    !isCurrentMonth && styles.outside,
    isSelected && styles.selected,
    isDisabled && styles.disabled,
    inMiddle && styles.range_middle,
    rangeStart && styles.range_start,
    rangeEnd && styles.range_end,
  ]);

  const textStyle = StyleSheet.flatten([
    styles.day_label,
    isToday && styles.today_label,
    !isCurrentMonth && styles.outside_label,
    isSelected && styles.selected_label,
    isDisabled && styles.disabled_label,
    inMiddle && styles.range_middle_label,
    rangeStart && styles.range_start_label,
    rangeEnd && styles.range_end_label,
  ]);

  const containerClassName = cn(
    classNames.day,
    isToday && classNames.today,
    !isCurrentMonth && classNames.outside,
    isSelected && classNames.selected,
    isDisabled && classNames.disabled,
    inMiddle && classNames.range_middle,
    rangeStart && classNames.range_start,
    rangeEnd && classNames.range_end
  );

  const textClassName = cn(
    classNames.day_label,
    isToday && classNames.today_label,
    !isCurrentMonth && classNames.outside_label,
    isSelected && classNames.selected_label,
    isDisabled && classNames.disabled_label,
    inMiddle && classNames.range_middle_label,
    rangeStart && classNames.range_start_label,
    rangeEnd && classNames.range_end_label
  );

  const RangeLine = useMemo(() => {
    if (!inRange) return null;
    if (!isCrop) {
      return (
        <View
          style={[
            style.rangeRoot,
            styles.range_line,
            isEndOfWeek && styles.range_line_weekend,
            isStartOfWeek && styles.range_line_weekstart,
          ]}
          className={cn(
            classNames.range_line,
            isEndOfWeek && classNames.range_line_weekend,
            isStartOfWeek && classNames.range_line_weekstart
          )}
        />
      );
    }
    return (
      <>
        {leftCrop && (
          <View
            style={[style.rangeRoot, { left: '50%' }, styles.range_line]}
            className={classNames.range_line}
          />
        )}
        {rightCrop && (
          <View
            style={[style.rangeRoot, { right: '50%' }, styles.range_line]}
            className={classNames.range_line}
          />
        )}
      </>
    );
  }, [
    inRange,
    isCrop,
    leftCrop,
    rightCrop,
    style.rangeRoot,
    styles.range_line,
    styles.range_line_weekstart,
    styles.range_line_weekend,
    classNames.range_line,
    classNames.range_line_weekstart,
    classNames.range_line_weekend,
  ]);

  return (
    <View style={style.dayCell}>
      <View style={styles.day_wrapper} className={classNames.day_wrapper}>
        {RangeLine}
        {renderDay ? (
          <Pressable
            disabled={isDisabled}
            onPress={() => onSelectDate(date)}
            accessibilityRole="button"
            accessibilityLabel={text}
            style={style.dayContainer}
          >
            {renderDay(day)}
          </Pressable>
        ) : (
          <Pressable
            disabled={isDisabled}
            onPress={() => onSelectDate(date)}
            accessibilityRole="button"
            accessibilityLabel={text}
            style={containerStyle}
            className={containerClassName}
          >
            <Text style={textStyle} className={textClassName}>
              {text}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const createDefaultStyles = (calendarHeight: number) =>
  StyleSheet.create({
    dayCell: {
      width: '14.25%',
    },
    dayContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: calendarHeight / 7,
    },
    rangeWrapper: {
      flex: 1,
    },
    rangeRoot: {
      position: 'absolute',
      top: 4,
      left: 0,
      right: 0,
      bottom: 4,
    },
  });

const customComparator = (prev: Readonly<Props>, next: Readonly<Props>) => {
  const areEqual =
    isEqual(prev.day, next.day) &&
    prev.onSelectDate === next.onSelectDate &&
    prev.calendarHeight === next.calendarHeight &&
    prev.renderDay === next.renderDay &&
    isEqual(prev.styles, next.styles) &&
    isEqual(prev.classNames, next.classNames);
  return areEqual;
};

export default memo(Day, customComparator);
