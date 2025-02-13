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

let currentDate = dayjs();

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

  const currentYear = useMemo(() => {
    if (mode === 'single' && date) {
      currentDate = dayjs(date);
    }

    if (mode === 'range' && startDate) {
      currentDate = dayjs(startDate);
    }

    if (mode === 'multiple' && dates && dates.length > 0) {
      currentDate = dayjs(dates[0]);
    }

    if (minDate && currentDate.isBefore(minDate)) {
      currentDate = dayjs(minDate);
    }

    return currentDate.year();
  }, [mode, date, startDate, dates, minDate]);

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
    {
      date,
      startDate,
      endDate,
      dates,
      calendarView: initialCalendarView,
      currentDate,
      currentYear,
    }
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

  const onSelectMonth = useCallback(
    (month: number) => {
      const newDate = getDate(stateRef.current.currentDate).month(month);
      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_DATE,
        payload: getFormated(newDate),
      });
      setCalendarView('day');
    },
    [setCalendarView, stateRef]
  );

  const onSelectYear = useCallback(
    (year: number) => {
      const newDate = getDate(stateRef.current.currentDate).year(year);
      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_DATE,
        payload: getFormated(newDate),
      });
      setCalendarView('day');
    },
    [setCalendarView, stateRef, dispatch]
  );

  const onChangeMonth = useCallback(
    (month: number) => {
      const newDate = getDate(stateRef.current.currentDate).add(month, 'month');
      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_DATE,
        payload: getFormated(newDate),
      });
    },
    [stateRef, dispatch]
  );

  const onChangeYear = useCallback(
    (year: number) => {
      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_YEAR,
        payload: year,
      });
    },
    [stateRef, dispatch]
  );

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
