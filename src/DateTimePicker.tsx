import React, { memo, useCallback, useEffect, useReducer } from 'react';
import {
  getFormated,
  getDate,
  dateToUnix,
  getEndOfDay,
  getStartOfDay,
} from './utils';
import CalendarContext from './CalendarContext';
import { CalendarViews, CalendarActionKind } from './enums';
import type {
  DateType,
  CalendarAction,
  LocalState,
  DatePickerBaseProps,
  CalendarThemeProps,
  HeaderProps,
} from './types';
import Calendar from './components/Calendar';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { SingleChange, RangeChange, MultiChange } from './types';

dayjs.extend(localeData);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export interface DatePickerSingleProps
  extends CalendarThemeProps,
    HeaderProps,
    DatePickerBaseProps {
  mode: 'single';
  date?: DateType;
  onChange?: SingleChange;
}

export interface DatePickerRangeProps
  extends CalendarThemeProps,
    HeaderProps,
    DatePickerBaseProps {
  mode: 'range';
  startDate?: DateType;
  endDate?: DateType;
  onChange?: RangeChange;
}

export interface DatePickeMultipleProps
  extends CalendarThemeProps,
    HeaderProps,
    DatePickerBaseProps {
  mode: 'multiple';
  dates?: DateType[];
  onChange?: MultiChange;
}

const DateTimePicker = (
  props: DatePickerSingleProps | DatePickerRangeProps | DatePickeMultipleProps
) => {
  const {
    mode,
    locale = 'en',
    displayFullDays = false,
    firstDayOfWeek,
    buttonPrevIcon,
    buttonNextIcon,
    // startYear,
    // endYear,
    minDate,
    maxDate,
    date,
    startDate,
    endDate,
    // dates,
    onChange,
    ...rest
  } = props;

  const firstDay =
    firstDayOfWeek && firstDayOfWeek > 0 && firstDayOfWeek <= 6
      ? firstDayOfWeek
      : 0;

  dayjs.locale(locale);

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
          const { date } = action.payload;
          return {
            ...prevState,
            date,
            currentDate: date,
          };
        case CalendarActionKind.CHANGE_SELECTED_RANGE:
          const { startDate, endDate } = action.payload;
          return {
            ...prevState,
            startDate,
            endDate,
          };
      }
    },
    {
      date: undefined,
      startDate: undefined,
      endDate: undefined,
      dates: [],
      calendarView: CalendarViews.day,
      currentDate: new Date(),
      currentYear: new Date().getFullYear(),
    }
  );

  useEffect(() => {
    if (mode === 'single') {
      dispatch({
        type: CalendarActionKind.CHANGE_SELECTED_DATE,
        payload: { date },
      });
    } else if (mode === 'range') {
      dispatch({
        type: CalendarActionKind.CHANGE_SELECTED_RANGE,
        payload: { startDate, endDate },
      });
    }
  }, [mode, date, startDate, endDate]);

  const setCalendarView = useCallback((view: CalendarViews) => {
    dispatch({ type: CalendarActionKind.SET_CALENDAR_VIEW, payload: view });
  }, []);

  const onSelectDate = useCallback(
    (date: DateType) => {
      if (onChange) {
        dispatch({
          type: CalendarActionKind.CHANGE_CURRENT_DATE,
          payload: date,
        });
        if (mode === 'single') {
          (onChange as SingleChange)({
            date,
          });
        } else if (mode === 'range') {
          const sd = state.startDate;
          const ed = state.endDate;
          let isStart: boolean = true;

          if (sd && !ed && dateToUnix(date) >= dateToUnix(sd!)) {
            isStart = false;
          }

          (onChange as RangeChange)({
            startDate: isStart ? getStartOfDay(date) : sd,
            endDate: !isStart ? getEndOfDay(date) : undefined,
          });
        } else if (mode === 'multiple') {
          // (onChange as MultiChange)({
          //   dates: [date],
          // });
        }
      }
    },
    [onChange, mode, state.startDate, state.endDate]
  );

  const onSelectMonth = useCallback(
    (month: number) => {
      const newDate = getDate(state.currentDate).month(month);
      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_DATE,
        payload: getFormated(newDate),
      });
      dispatch({
        type: CalendarActionKind.SET_CALENDAR_VIEW,
        payload: CalendarViews.day,
      });
    },
    [state.currentDate]
  );

  const onSelectYear = useCallback(
    (year: number) => {
      const newDate = getDate(state.currentDate).year(year);
      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_DATE,
        payload: getFormated(newDate),
      });
      dispatch({
        type: CalendarActionKind.SET_CALENDAR_VIEW,
        payload: CalendarViews.day,
      });
    },
    [state.currentDate]
  );

  const onChangeMonth = useCallback(
    (month: number) => {
      const newDate = getDate(state.currentDate).add(month, 'month');
      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_DATE,
        payload: getFormated(newDate),
      });
    },
    [state.currentDate]
  );

  const onChangeYear = useCallback((year: number) => {
    dispatch({
      type: CalendarActionKind.CHANGE_CURRENT_YEAR,
      payload: year,
    });
  }, []);

  return (
    <CalendarContext.Provider
      value={{
        ...state,
        startDate,
        endDate,
        locale,
        mode,
        displayFullDays,
        minDate,
        maxDate,
        firstDayOfWeek: firstDay,
        theme: rest,
        setCalendarView,
        onSelectDate,
        onSelectMonth,
        onSelectYear,
        onChangeMonth,
        onChangeYear,
      }}
    >
      <Calendar
        buttonPrevIcon={buttonPrevIcon}
        buttonNextIcon={buttonNextIcon}
      />
    </CalendarContext.Provider>
  );
};

export default memo(DateTimePicker);
