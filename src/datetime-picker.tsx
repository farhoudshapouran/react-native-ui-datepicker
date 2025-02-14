import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import {
  getFormated,
  getDate,
  dateToUnix,
  getEndOfDay,
  getStartOfDay,
  areDatesOnSameDay,
  removeTime,
  //getDateMonth,
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
import './locales';

dayjs.extend(localeData);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

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

export interface DatePickeMultipleProps extends DatePickerBaseProps {
  mode: 'multiple';
  dates?: DateType[];
  onChange?: MultiChange;
}

const DateTimePicker = (
  props: DatePickerSingleProps | DatePickerRangeProps | DatePickeMultipleProps
) => {
  const {
    mode = 'single',
    locale = 'en',
    showOutsideDays = false,
    timePicker = false,
    firstDayOfWeek,
    // startYear,
    // endYear,
    minDate,
    maxDate,
    disabledDates,
    date,
    startDate,
    endDate,
    dates,
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
  } = props;

  dayjs.locale(locale);

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

  const initialState = useMemo(() => {
    let initialDate = dayjs();

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

    return {
      date,
      startDate,
      endDate,
      dates,
      calendarView: initialCalendarView,
      currentDate: initialDate,
      currentYear: initialDate.year(),
    };
  }, [mode, date, startDate, dates, minDate, month, year]);

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
            currentDate: date,
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
      }
    },
    initialState
  );

  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    if (mode === 'single') {
      const newDate =
        (date && (timePicker ? date : getStartOfDay(date))) ?? minDate;

      dispatch({
        type: CalendarActionKind.CHANGE_SELECTED_DATE,
        payload: { date: newDate },
      });
    } else if (mode === 'range') {
      dispatch({
        type: CalendarActionKind.CHANGE_SELECTED_RANGE,
        payload: { startDate, endDate },
      });
    } else if (mode === 'multiple') {
      dispatch({
        type: CalendarActionKind.CHANGE_SELECTED_MULTIPLE,
        payload: { dates },
      });
    }
  }, [mode, date, startDate, endDate, dates, minDate, timePicker]);

  const setCalendarView = useCallback((view: CalendarViews) => {
    dispatch({ type: CalendarActionKind.SET_CALENDAR_VIEW, payload: view });
  }, []);

  const onSelectDate = useCallback(
    (selectedDate: DateType) => {
      if (onChange) {
        if (mode === 'single') {
          const newDate = timePicker
            ? selectedDate
            : getStartOfDay(selectedDate);

          dispatch({
            type: CalendarActionKind.CHANGE_CURRENT_DATE,
            payload: newDate,
          });

          (onChange as SingleChange)({
            date: newDate,
          });
        } else if (mode === 'range') {
          // set time to 00:00:00
          let sd = removeTime(stateRef.current.startDate);
          let ed = removeTime(stateRef.current.endDate);
          const selected = removeTime(selectedDate);
          let isStart: boolean = true;
          let isReset: boolean = false;

          if (
            dateToUnix(selected) !== dateToUnix(ed) &&
            dateToUnix(selected) >= dateToUnix(sd) &&
            dateToUnix(sd) !== dateToUnix(ed)
          ) {
            isStart = false;
          } else if (sd && dateToUnix(selected) === dateToUnix(sd)) {
            isReset = true;
          }

          if (sd && ed) {
            if (
              dateToUnix(sd) === dateToUnix(ed) &&
              dateToUnix(selected) > dateToUnix(sd)
            ) {
              isStart = false;
            }

            if (
              dateToUnix(selected) > dateToUnix(sd) &&
              dateToUnix(selected) === dateToUnix(ed)
            ) {
              ed = undefined;
            }
          }

          if (sd && !ed && dateToUnix(selected) < dateToUnix(sd)) {
            ed = sd;
          }

          if (isReset) {
            (onChange as RangeChange)({
              startDate: undefined,
              endDate: undefined,
            });
          } else {
            (onChange as RangeChange)({
              startDate: isStart ? getStartOfDay(selectedDate) : sd,
              endDate: !isStart
                ? getEndOfDay(selectedDate)
                : ed
                  ? getEndOfDay(ed)
                  : ed,
            });
          }
        } else if (mode === 'multiple') {
          const safeDates = (stateRef.current.dates as DateType[]) || [];
          const newDate = getStartOfDay(selectedDate);

          const exists = safeDates.some((ed) => areDatesOnSameDay(ed, newDate));

          const newDates = exists
            ? safeDates.filter((ed) => !areDatesOnSameDay(ed, newDate))
            : [...safeDates, newDate];

          newDates.sort((a, b) => (dayjs(a).isAfter(dayjs(b)) ? 1 : -1));

          (onChange as MultiChange)({
            dates: newDates,
            datePressed: newDate,
            change: exists ? 'removed' : 'added',
          });
        }
      }
    },
    [mode, timePicker, stateRef]
  );

  // set the active displayed month
  const onSelectMonth = useCallback(
    (value: number) => {
      const currentMonth = dayjs(stateRef.current.currentDate).month();
      const newDate = getDate(stateRef.current.currentDate).month(value);

      // Only call onMonthChange if the month actually changed
      if (value !== currentMonth) {
        onMonthChange(value);
      }

      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_DATE,
        payload: getFormated(newDate),
      });
      setCalendarView('day');
    },
    [setCalendarView, onMonthChange]
  );

  // set the active displayed year
  const onSelectYear = useCallback(
    (value: number) => {
      const currentYear = dayjs(stateRef.current.currentDate).year();
      const newDate = getDate(stateRef.current.currentDate).year(value);

      // Only call onYearChange if the year actually changed
      if (value !== currentYear) {
        onYearChange(value);
      }

      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_DATE,
        payload: getFormated(newDate),
      });
      setCalendarView('day');
    },
    [setCalendarView, onYearChange]
  );

  const onChangeMonth = useCallback(
    (value: number) => {
      const newDate = getDate(stateRef.current.currentDate).add(value, 'month');
      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_DATE,
        payload: getFormated(newDate),
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
    [stateRef, dispatch]
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
      locale,
      mode,
      showOutsideDays,
      timePicker,
      minDate,
      maxDate,
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
    }),
    [
      locale,
      mode,
      showOutsideDays,
      timePicker,
      minDate,
      maxDate,
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
