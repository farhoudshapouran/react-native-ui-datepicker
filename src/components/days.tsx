import React, { useMemo, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import { useCalendarContext } from '../calendar-context';
import Day, { EmptyDay } from './day';
import {
  getParsedDate,
  getMonthDays,
  getDaysInMonth,
  isDateBetween,
  getDate,
} from '../utils';
import Weekdays from './weekdays';
import { DateType } from 'src/types';

const Days = () => {
  const {
    mode,
    calendar,
    locale,
    numerals = 'latn',
    timeZone,
    date,
    startDate,
    endDate,
    dates,
    currentDate,
    onSelectDate,
    showOutsideDays,
    minDate,
    maxDate,
    enabledDates,
    disabledDates,
    firstDayOfWeek,
    containerHeight,
    weekdaysHeight,
    styles,
    classNames,
    weekdaysFormat,
    multiRangeMode,
    hideWeekdays,
    components,
    isRTL,
  } = useCalendarContext();

  const style = useMemo(() => createDefaultStyles(isRTL), [isRTL]);
  const { year, month } = getParsedDate(currentDate);

  const handleSelectDate = useCallback(
    (selectedDate: DateType) => {
      const newDate = dayjs.isDayjs(selectedDate)
        ? selectedDate.startOf('day')
        : timeZone
          ? dayjs(selectedDate).tz(timeZone).startOf('day')
          : getDate(selectedDate).startOf('day');

      onSelectDate(newDate);
    },
    [onSelectDate, timeZone]
  );

  const containerStyle = useMemo(
    () => [style.daysContainer, styles?.days],
    [style.daysContainer, styles?.days]
  );

  const daysGrid = useMemo(() => {
    const todayKey = dayjs().tz(timeZone).format('YYYYMMDD');

    const startDateKey = startDate
      ? dayjs(startDate).tz(timeZone).format('YYYYMMDD')
      : null;

    const endDateKey = endDate
      ? dayjs(endDate).tz(timeZone).format('YYYYMMDD')
      : null;

    const selectedDateKey = date
      ? dayjs(date).tz(timeZone).format('YYYYMMDD')
      : null;

    const selectedDateKeys = new Set(
      dates
        ? (dates as DateType[]).map((d) =>
            dayjs(d).tz(timeZone).format('YYYYMMDD')
          )
        : []
    );

    const {
      fullDaysInMonth,
      prevMonthDays,
      prevMonthOffset,
      daysInCurrentMonth,
      daysInNextMonth,
    } = getDaysInMonth(currentDate, showOutsideDays, firstDayOfWeek, timeZone);

    return getMonthDays(
      currentDate,
      showOutsideDays,
      minDate,
      maxDate,
      firstDayOfWeek,
      enabledDates,
      disabledDates,
      prevMonthDays,
      prevMonthOffset,
      daysInCurrentMonth,
      daysInNextMonth,
      numerals,
      timeZone
    ).map((day, index) => {
      if (!day) return null;

      const dayKey =
        day.dateKey ?? dayjs(day.date).tz(timeZone).format('YYYYMMDD');

      let leftCrop = day.dayOfMonth === 1;
      let rightCrop = day.dayOfMonth === fullDaysInMonth;

      const isFirstDayOfMonth = day.dayOfMonth === 1;
      const isLastDayOfMonth = day.dayOfMonth === fullDaysInMonth;
      const isToday = dayKey === todayKey;

      let inRange = false;
      let isSelected = false;
      let isCrop = false;
      let inMiddle = false;
      let rangeStart = false;
      let rangeEnd = false;

      if (mode === 'range') {
        rightCrop = false;

        const selectedStartDay = dayKey === startDateKey;
        const selectedEndDay = dayKey === endDateKey;

        isSelected = selectedStartDay || selectedEndDay;

        inRange = isDateBetween(day.dayjsDate ?? day.date, {
          startDate,
          endDate,
        });

        if (selectedStartDay) leftCrop = true;
        if (selectedEndDay) rightCrop = true;

        if (index % 7 === 0 && !selectedStartDay) leftCrop = false;
        if (index % 7 === 6 && !selectedEndDay) rightCrop = false;

        if (
          (isFirstDayOfMonth && selectedEndDay) ||
          (isLastDayOfMonth && selectedStartDay) ||
          (startDateKey && endDateKey && startDateKey === endDateKey)
        ) {
          inRange = false;
        }

        isCrop = inRange && (leftCrop || rightCrop) && !(leftCrop && rightCrop);

        inMiddle = inRange && !leftCrop && !rightCrop;
        rangeStart = inRange && leftCrop;
        rangeEnd = inRange && rightCrop;
      } else if (mode === 'multiple') {
        isSelected = selectedDateKeys.has(dayKey);

        if (multiRangeMode) {
          const dayDate = day.dayjsDate ?? dayjs(day.date).tz(timeZone);
          const yesterdayKey = dayDate.subtract(1, 'day').format('YYYYMMDD');
          const tomorrowKey = dayDate.add(1, 'day').format('YYYYMMDD');

          const yesterdaySelected = selectedDateKeys.has(yesterdayKey);
          const tomorrowSelected = selectedDateKeys.has(tomorrowKey);

          inRange = false;
          leftCrop = false;
          rightCrop = false;

          if (isSelected) {
            if (yesterdaySelected && tomorrowSelected) {
              inRange = true;
            } else if (tomorrowSelected) {
              inRange = true;
              leftCrop = true;
            } else if (yesterdaySelected) {
              inRange = true;
              rightCrop = true;
            }

            if (inRange) {
              if (isFirstDayOfMonth && !tomorrowSelected) {
                inRange = false;
              }

              if (isLastDayOfMonth && !yesterdaySelected) {
                inRange = false;
              }
            }
          }

          isCrop = inRange && (leftCrop || rightCrop);
          inMiddle = inRange && !leftCrop && !rightCrop;
          rangeStart = inRange && leftCrop;
          rangeEnd = inRange && rightCrop;
        }
      } else if (mode === 'single') {
        isSelected = dayKey === selectedDateKey;
      }

      return {
        ...day,
        isToday,
        isSelected,
        inRange,
        leftCrop,
        rightCrop,
        isCrop,
        inMiddle,
        rangeStart,
        rangeEnd,
      };
    });
  }, [
    mode,
    calendar,
    numerals,
    timeZone,
    month,
    year,
    showOutsideDays,
    firstDayOfWeek,
    minDate,
    maxDate,
    enabledDates,
    disabledDates,
    date,
    startDate,
    endDate,
    dates,
    multiRangeMode,
    currentDate,
  ]);

  return (
    <View style={style.container} testID="day-selector">
      {!hideWeekdays ? (
        <Weekdays
          locale={locale}
          firstDayOfWeek={firstDayOfWeek}
          styles={styles}
          classNames={classNames}
          weekdaysFormat={weekdaysFormat}
          weekdaysHeight={weekdaysHeight}
          components={components}
          isRTL={isRTL}
        />
      ) : null}
      <View style={containerStyle} className={classNames?.days} testID="days">
        {daysGrid?.map((day, index) => {
          return day ? (
            <Day
              key={index}
              day={day}
              onSelectDate={handleSelectDate}
              containerHeight={containerHeight}
              weekdaysHeight={weekdaysHeight}
              styles={styles}
              classNames={classNames}
              components={components}
            />
          ) : (
            <EmptyDay key={index} />
          );
        })}
      </View>
    </View>
  );
};

const createDefaultStyles = (isRTL: boolean) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
    },
    daysContainer: {
      width: '100%',
      height: '100%',
      flexWrap: 'wrap',
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignContent: 'flex-start',
    },
  });

export default Days;
