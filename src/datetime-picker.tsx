import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import { I18nManager } from 'react-native';
import {
  dateToUnix,
  getEndOfDay,
  getStartOfDay,
  areDatesOnSameDay,
  removeTime,
} from './utils';
import { CalendarContext } from './calendar-context';
import {
  CalendarViews,
  CalendarActionKind,
  CONTAINER_HEIGHT,
  WEEKDAYS_HEIGHT,
} from './enums';
import type {
  DateType,
  CalendarAction,
  LocalState,
  DatePickerBaseProps,
  SingleChange,
  RangeChange,
  MultiChange,
} from './types';
import Calendar from './components/calendar';
import { useDeepCompareMemo } from './utils';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import duration from 'dayjs/plugin/duration';
import { usePrevious } from './hooks/use-previous';
import jalaliday from 'jalali-plugin-dayjs';

dayjs.extend(localeData);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.extend(jalaliday);

export interface DatePickerSingleProps extends DatePickerBaseProps {
  mode: 'single';
  date?: DateType;
  onChange?: SingleChange;
}

export interface DatePickerRangeProps extends DatePickerBaseProps {
  mode: 'range';
  startDate?: DateType;
  endDate?: DateType;
  onChange?: RangeChange;
}

export interface DatePickerMultipleProps extends DatePickerBaseProps {
  mode: 'multiple';
  dates?: DateType[];
  onChange?: MultiChange;
}

const DateTimePicker = (
  props: DatePickerSingleProps | DatePickerRangeProps | DatePickerMultipleProps
) => {
  const {
    mode = 'single',
    calendar = 'gregory',
    locale = 'en',
    numerals = 'latn',
    timeZone,
    showOutsideDays = false,
    timePicker = false,
    firstDayOfWeek,
    // startYear,
    // endYear,
    minDate,
    maxDate,
    enabledDates,
    disabledDates,
    date,
    startDate,
    endDate,
    dates,
    min,
    max,
    onChange,
    initialView = 'day',
    containerHeight = CONTAINER_HEIGHT,
    weekdaysHeight = WEEKDAYS_HEIGHT,
    style = {},
    className = '',
    classNames = {},
    styles = {},
    navigationPosition,
    weekdaysFormat = 'min',
    monthsFormat = 'full',
    monthCaptionFormat = 'full',
    multiRangeMode,
    hideHeader,
    hideWeekdays,
    disableMonthPicker,
    disableYearPicker,
    components = {},
    month,
    year,
    onMonthChange = () => {},
    onYearChange = () => {},
    use12Hours,
  } = props;

  dayjs.tz.setDefault(timeZone);
  dayjs.calendar(calendar);
  dayjs.locale(locale);

  const prevTimezone = usePrevious(timeZone);

  const initialCalendarView: CalendarViews = useMemo(
    () => (mode !== 'single' && initialView === 'time' ? 'day' : initialView),
    [mode, initialView]
  );

  const firstDay = useMemo(
    () =>
      firstDayOfWeek && firstDayOfWeek > 0 && firstDayOfWeek <= 6
        ? firstDayOfWeek
        : 0,
    [firstDayOfWeek]
  );

  const initialState: LocalState = useMemo(() => {
    let initialDate = dayjs().tz(timeZone);

    if (mode === 'single' && date) {
      initialDate = dayjs(date);
    }

    if (mode === 'range' && startDate) {
      initialDate = dayjs(startDate);
    }

    if (mode === 'multiple' && dates && dates.length > 0) {
      initialDate = dayjs(dates[0]);
    }

    if (minDate && initialDate.isBefore(minDate)) {
      initialDate = dayjs(minDate);
    }

    if (month !== undefined && month && month >= 0 && month <= 11) {
      initialDate = initialDate.month(month);
    }

    if (year !== undefined && year >= 0) {
      initialDate = initialDate.year(year);
    }

    let _date = (date ? dayjs(date) : date) as DateType;

    if (_date && maxDate && dayjs(_date).isAfter(maxDate)) {
      _date = dayjs(maxDate);
    }

    if (_date && minDate && dayjs(_date).isBefore(minDate)) {
      _date = dayjs(minDate);
    }

    let start = (startDate ? dayjs(startDate) : startDate) as DateType;

    if (start && maxDate && dayjs(start).isAfter(maxDate)) {
      start = dayjs(maxDate);
    }

    if (start && minDate && dayjs(start).isBefore(minDate)) {
      start = dayjs(minDate);
    }

    let end = (endDate ? dayjs(endDate) : endDate) as DateType;

    if (end && maxDate && dayjs(end).isAfter(maxDate)) {
      end = dayjs(maxDate);
    }

    if (end && minDate && dayjs(end).isBefore(minDate)) {
      end = dayjs(minDate);
    }

    return {
      date: _date,
      startDate: start,
      endDate: end,
      dates,
      calendarView: initialCalendarView,
      currentDate: initialDate,
      currentYear: initialDate.year(),
      isRTL: calendar === 'jalali' || I18nManager.isRTL,
    };
  }, [
    mode,
    calendar,
    date,
    startDate,
    endDate,
    dates,
    minDate,
    maxDate,
    month,
    year,
    timeZone,
    initialCalendarView,
  ]);

  const [state, dispatch] = useReducer(
    (prevState: LocalState, action: CalendarAction) => {
      switch (action.type) {
        case CalendarActionKind.SET_CALENDAR_VIEW:
          return {
            ...prevState,
            calendarView: action.payload,
          };
        case CalendarActionKind.CHANGE_CURRENT_DATE:
          return {
            ...prevState,
            currentDate: action.payload,
          };
        case CalendarActionKind.CHANGE_CURRENT_YEAR:
          return {
            ...prevState,
            currentYear: action.payload,
          };
        case CalendarActionKind.CHANGE_SELECTED_DATE:
          const { date: selectedDate } = action.payload;
          return {
            ...prevState,
            date: selectedDate,
            currentDate: selectedDate,
          };
        case CalendarActionKind.CHANGE_SELECTED_RANGE:
          const { startDate: start, endDate: end } = action.payload;
          return {
            ...prevState,
            startDate: start,
            endDate: end,
          };
        case CalendarActionKind.CHANGE_SELECTED_MULTIPLE:
          const { dates: selectedDates } = action.payload;
          return {
            ...prevState,
            dates: selectedDates,
          };
        case CalendarActionKind.SET_IS_RTL:
          return {
            ...prevState,
            isRTL: action.payload,
          };
        case CalendarActionKind.RESET_STATE:
          return action.payload;
        default:
          return prevState;
      }
    },
    initialState
  );

  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    const newState = {
      ...initialState,
      isRTL: calendar === 'jalali' || I18nManager.isRTL,
    };

    dispatch({ type: CalendarActionKind.RESET_STATE, payload: newState });
  }, [calendar]);

  useEffect(() => {
    if (prevTimezone !== timeZone) {
      const newDate = dayjs().tz(timeZone);
      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_DATE,
        payload: newDate,
      });
    }
  }, [timeZone, prevTimezone]);

  useEffect(() => {
    if (mode === 'single') {
      let _date =
        (date &&
          (timePicker
            ? dayjs.tz(date, timeZone)
            : getStartOfDay(dayjs.tz(date, timeZone)))) ??
        date;

      if (_date && maxDate && dayjs.tz(_date, timeZone).isAfter(maxDate)) {
        _date = dayjs.tz(maxDate, timeZone);
      }

      if (_date && minDate && dayjs.tz(_date, timeZone).isBefore(minDate)) {
        _date = dayjs.tz(minDate, timeZone);
      }

      dispatch({
        type: CalendarActionKind.CHANGE_SELECTED_DATE,
        payload: { date: _date },
      });

      if (prevTimezone !== timeZone) {
        (onChange as SingleChange)({
          date: _date ? dayjs(_date).toDate() : _date,
        });
      }
    } else if (mode === 'range') {
      let start = (
        startDate ? dayjs.tz(startDate, timeZone) : startDate
      ) as DateType;

      if (start && maxDate && dayjs.tz(start, timeZone).isAfter(maxDate)) {
        start = dayjs.tz(maxDate, timeZone);
      }

      if (start && minDate && dayjs.tz(start, timeZone).isBefore(minDate)) {
        start = dayjs.tz(minDate, timeZone);
      }

      let end = (endDate ? dayjs.tz(endDate, timeZone) : endDate) as DateType;

      if (end && maxDate && dayjs.tz(end, timeZone).isAfter(maxDate)) {
        end = dayjs.tz(maxDate, timeZone);
      }

      if (end && minDate && dayjs.tz(end, timeZone).isBefore(minDate)) {
        end = dayjs.tz(minDate, timeZone);
      }

      dispatch({
        type: CalendarActionKind.CHANGE_SELECTED_RANGE,
        payload: {
          startDate: start,
          endDate: end,
        },
      });

      if (prevTimezone !== timeZone) {
        (onChange as RangeChange)({
          startDate: start ? dayjs(start).toDate() : start,
          endDate: end ? dayjs(end).toDate() : end,
        });
      }
    } else if (mode === 'multiple') {
      const _dates = dates?.map((date) =>
        dayjs(date).tz(timeZone)
      ) as DateType[];

      dispatch({
        type: CalendarActionKind.CHANGE_SELECTED_MULTIPLE,
        payload: { dates: _dates },
      });

      if (prevTimezone !== timeZone) {
        (onChange as MultiChange)({
          dates: _dates.map((item) => dayjs(item).toDate()),
          change: 'updated',
        });
      }
    }
  }, [
    mode,
    date,
    startDate,
    endDate,
    dates,
    minDate,
    maxDate,
    timePicker,
    prevTimezone,
    timeZone,
    calendar,
  ]);

  const setCalendarView = useCallback((view: CalendarViews) => {
    dispatch({ type: CalendarActionKind.SET_CALENDAR_VIEW, payload: view });
  }, []);

  const onSelectDate = useCallback(
    (selectedDate: DateType) => {
      if (onChange) {
        if (mode === 'single') {
          const newDate = timePicker
            ? dayjs.tz(selectedDate, timeZone)
            : dayjs.tz(getStartOfDay(selectedDate), timeZone);

          dispatch({
            type: CalendarActionKind.CHANGE_CURRENT_DATE,
            payload: newDate,
          });

          (onChange as SingleChange)({
            date: newDate ? dayjs(newDate).toDate() : newDate,
          });
        } else if (mode === 'range') {
          // set time to 00:00:00
          let start = removeTime(stateRef.current.startDate, timeZone);
          let end = removeTime(stateRef.current.endDate, timeZone);
          const selected = removeTime(selectedDate, timeZone);
          let isStart: boolean = true;
          let isReset: boolean = false;

          if (
            dateToUnix(selected) !== dateToUnix(end) &&
            dateToUnix(selected) >= dateToUnix(start) &&
            dateToUnix(start) !== dateToUnix(end)
          ) {
            isStart = false;
          } else if (start && dateToUnix(selected) === dateToUnix(start)) {
            isReset = true;
          }

          if (start && end) {
            if (
              dateToUnix(start) === dateToUnix(end) &&
              dateToUnix(selected) > dateToUnix(start)
            ) {
              isStart = false;
            }

            if (
              dateToUnix(selected) > dateToUnix(start) &&
              dateToUnix(selected) === dateToUnix(end)
            ) {
              end = undefined;
            }
          }

          if (start && !end && dateToUnix(selected) < dateToUnix(start)) {
            end = start;
          }

          if (isStart && end && (min || max)) {
            const numberOfDays = dayjs(end).diff(selected, 'day');

            if ((max && numberOfDays > max) || (min && numberOfDays < min)) {
              isStart = true;
              end = undefined;
            }
          }

          if (!isStart && start && (min || max)) {
            const numberOfDays = dayjs(selected).diff(start, 'day');

            if (dateToUnix(selected) === dateToUnix(start)) {
              isReset = true;
            } else if (
              (max && numberOfDays > max) ||
              (min && numberOfDays < min)
            ) {
              isStart = true;
              end = undefined;
            }
          }

          if (isReset) {
            (onChange as RangeChange)({
              startDate: undefined,
              endDate: undefined,
            });
          } else {
            (onChange as RangeChange)({
              startDate: isStart
                ? dayjs(selected).toDate()
                : start
                  ? dayjs.tz(start).toDate()
                  : start,
              endDate: !isStart
                ? dayjs.tz(getEndOfDay(selected), timeZone).toDate()
                : end
                  ? dayjs.tz(getEndOfDay(end), timeZone).toDate()
                  : end,
            });
          }
        } else if (mode === 'multiple') {
          const safeDates = (stateRef.current.dates as DateType[]) || [];
          const newDate = dayjs(selectedDate, timeZone).startOf('day');

          const exists = safeDates.some((ed) => areDatesOnSameDay(ed, newDate));

          const newDates = exists
            ? safeDates.filter((ed) => !areDatesOnSameDay(ed, newDate))
            : [...safeDates, newDate];

          if (max && newDates.length > max) {
            return;
          }

          newDates.sort((a, b) => (dayjs(a).isAfter(dayjs(b)) ? 1 : -1));

          const _dates = newDates.map((date) =>
            dayjs(date).tz(timeZone)
          ) as DateType[];

          (onChange as MultiChange)({
            dates: _dates.map((item) => dayjs(item).toDate()),
            datePressed: newDate ? dayjs(newDate).toDate() : newDate,
            change: exists ? 'removed' : 'added',
          });
        }
      }
    },
    [mode, timePicker, min, max, timeZone]
  );

  // set the active displayed month
  const onSelectMonth = useCallback(
    (value: number) => {
      const currentMonth = dayjs(stateRef.current.currentDate).month();
      const newDate = dayjs(stateRef.current.currentDate).month(value);

      // Only call onMonthChange if the month actually changed
      if (value !== currentMonth) {
        onMonthChange(value);
      }

      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_DATE,
        payload: newDate,
      });
      setCalendarView('day');
    },
    [setCalendarView, onMonthChange]
  );

  // set the active displayed year
  const onSelectYear = useCallback(
    (value: number) => {
      const currentYear = dayjs(stateRef.current.currentDate).year();
      const newDate = dayjs(stateRef.current.currentDate).year(value);

      // Only call onYearChange if the year actually changed
      if (value !== currentYear) {
        onYearChange(value);
      }

      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_DATE,
        payload: newDate,
      });
      setCalendarView('day');
    },
    [setCalendarView, onYearChange]
  );

  const onChangeMonth = useCallback(
    (value: number) => {
      const newDate = dayjs(stateRef.current.currentDate).add(value, 'month');
      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_DATE,
        payload: dayjs(newDate),
      });
    },
    [stateRef, dispatch]
  );

  const onChangeYear = useCallback(
    (value: number) => {
      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_YEAR,
        payload: value,
      });
    },
    [dispatch]
  );

  useEffect(() => {
    if (month !== undefined && month >= 0 && month <= 11) {
      onSelectMonth(month);
    }
  }, [month]);

  useEffect(() => {
    if (year !== undefined && year >= 0) {
      onSelectYear(year);
    }
  }, [year]);

  const memoizedStyles = useDeepCompareMemo({ ...styles }, [styles]);

  const memoizedClassNames = useDeepCompareMemo({ ...classNames }, [
    classNames,
  ]);

  const memoizedComponents = useMemo(
    () => ({
      ...components,
    }),
    [components]
  );

  const baseContextValue = useMemo(
    () => ({
      mode,
      calendar,
      locale,
      numerals,
      timeZone,
      showOutsideDays,
      timePicker,
      minDate,
      maxDate,
      min,
      max,
      enabledDates,
      disabledDates,
      firstDayOfWeek: firstDay,
      containerHeight,
      weekdaysHeight,
      navigationPosition,
      weekdaysFormat,
      monthsFormat,
      monthCaptionFormat,
      multiRangeMode,
      hideHeader,
      hideWeekdays,
      disableMonthPicker,
      disableYearPicker,
      style,
      className,
      use12Hours,
    }),
    [
      mode,
      calendar,
      locale,
      numerals,
      timeZone,
      showOutsideDays,
      timePicker,
      minDate,
      maxDate,
      min,
      max,
      enabledDates,
      disabledDates,
      firstDay,
      containerHeight,
      weekdaysHeight,
      navigationPosition,
      weekdaysFormat,
      monthsFormat,
      monthCaptionFormat,
      multiRangeMode,
      hideHeader,
      hideWeekdays,
      disableMonthPicker,
      disableYearPicker,
      style,
      className,
      use12Hours,
    ]
  );

  const handlerContextValue = useMemo(
    () => ({
      setCalendarView,
      onSelectDate,
      onSelectMonth,
      onSelectYear,
      onChangeMonth,
      onChangeYear,
    }),
    [
      setCalendarView,
      onSelectDate,
      onSelectMonth,
      onSelectYear,
      onChangeMonth,
      onChangeYear,
    ]
  );

  const styleContextValue = useMemo(
    () => ({
      classNames: memoizedClassNames,
      styles: memoizedStyles,
    }),
    [memoizedClassNames, memoizedStyles]
  );

  const memoizedValue = useMemo(
    () => ({
      ...state,
      ...baseContextValue,
      ...handlerContextValue,
      ...styleContextValue,
      components: memoizedComponents,
    }),
    [
      state,
      baseContextValue,
      handlerContextValue,
      styleContextValue,
      memoizedComponents,
    ]
  );

  return (
    <CalendarContext.Provider value={memoizedValue}>
      <Calendar />
    </CalendarContext.Provider>
  );
};

export default DateTimePicker;
