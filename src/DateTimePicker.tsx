import React, { useEffect, useReducer } from 'react';
import { getFormated, getDate, getDateYear } from './utils';
import CalendarContext from './CalendarContext';
import { CalendarViews, CalendarActionKind } from './enums';
import type {
  DateType,
  CalendarModes,
  CalendarAction,
  CalendarState,
  CalendarTheme,
  HeaderProps,
} from './types';
import Calendar from './components/Calendar';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localeData);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

interface PropTypes extends CalendarTheme, HeaderProps {
  value: DateType ;
  mode?: CalendarModes;
  locale?: string | ILocale;
  minimumDate?: DateType;
  maximumDate?: DateType;
  firstDayOfWeek?: number;
  onValueChange?: (value: object) => void;
  displayFullDays?: boolean;
}

const DateTimePicker = ({
  value,
  mode = 'datetime',
  locale = 'en',
  minimumDate = null,
  maximumDate = null,
  firstDayOfWeek = 0,
  onValueChange = () => {},
  displayFullDays = false,
  headerButtonsPosition = 'around',
  headerContainerStyle,
  headerTextContainerStyle,
  headerTextStyle,
  headerButtonStyle,
  headerButtonColor,
  headerButtonSize,
  dayContainerStyle,
  todayContainerStyle,
  todayTextStyle,
  monthContainerStyle,
  yearContainerStyle,
  weekDaysContainerStyle,
  weekDaysTextStyle,
  calendarTextStyle,
  selectedTextStyle,
  selectedItemColor,
  timePickerContainerStyle,
  timePickerTextStyle,
  buttonPrevIcon,
  buttonNextIcon,
}: Partial<PropTypes>) => {
  dayjs.locale(locale);

  const theme = {
    headerButtonsPosition,
    headerContainerStyle,
    headerTextContainerStyle,
    headerTextStyle,
    headerButtonStyle,
    headerButtonColor,
    headerButtonSize,
    dayContainerStyle,
    todayContainerStyle,
    todayTextStyle,
    monthContainerStyle,
    yearContainerStyle,
    weekDaysContainerStyle,
    weekDaysTextStyle,
    calendarTextStyle,
    selectedTextStyle,
    selectedItemColor,
    timePickerContainerStyle,
    timePickerTextStyle,
  };

  const [state, dispatch] = useReducer(
    (prevState: CalendarState, action: CalendarAction) => {
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
          return {
            ...prevState,
            selectedDate: action.payload,
          };
        case CalendarActionKind.CHANGE_SELECTED_DATE_TO:
          return {
            ...prevState,
            selectedDateTo: action.payload,
          };
      }
    },
    {
      calendarView: mode === 'time' ? CalendarViews.time : CalendarViews.day,
      selectedDate: null,
      selectedDateTo: null,
      currentDate: value ? getFormated(value) : new Date(),
      currentYear: value ? getDateYear(value) : new Date().getFullYear(),
    }
  );

  // useEffect(() => {
  //   dispatch({
  //     type: CalendarActionKind.CHANGE_SELECTED_DATE,
  //     payload:  twoDaysAgo,
  //   });
  //   dispatch({
  //     type: CalendarActionKind.CHANGE_SELECTED_DATE_TO,
  //     payload: today,
  //   });
  //   dispatch({
  //     type: CalendarActionKind.CHANGE_CURRENT_DATE,
  //     payload: value ? getFormated(value) : new Date(),
  //   });
  //   dispatch({
  //     type: CalendarActionKind.CHANGE_CURRENT_YEAR,
  //     payload: getDateYear(value),
  //   });
  // }, [value]);

  useEffect(() => {
    dispatch({
      type: CalendarActionKind.SET_CALENDAR_VIEW,
      payload: mode === 'time' ? CalendarViews.time : CalendarViews.day,
    });
  }, [mode]);

  const actions = {
    setCalendarView: (view: CalendarViews) =>
      dispatch({ type: CalendarActionKind.SET_CALENDAR_VIEW, payload: view }),
    onSelectDate: (date: DateType) => {
      dispatch({
        type: CalendarActionKind.CHANGE_SELECTED_DATE,
        payload: date,
      });
      // eslint-disable-next-line no-lone-blocks
      {
        date != null &&
          dispatch({
            type: CalendarActionKind.CHANGE_CURRENT_DATE,
            payload: date,
          });
      }
    },
    onSelectDateTo: (date: DateType, from: DateType) => {
      if (from != null) {
        onValueChange({ from, date });
      }
      dispatch({
        type: CalendarActionKind.CHANGE_SELECTED_DATE_TO,
        payload: date,
      });
      // eslint-disable-next-line no-lone-blocks
      {
        date != null &&
          dispatch({
            type: CalendarActionKind.CHANGE_CURRENT_DATE,
            payload: date,
          });
      }
    },
    onSelectMonth: (month: number) => {
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
    onSelectYear: (year: number) => {
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
    onChangeMonth: (month: number) => {
      const newDate = getDate(state.currentDate).add(month, 'month');
      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_DATE,
        payload: getFormated(newDate),
      });
    },
    onChangeYear: (year: number) => {
      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_YEAR,
        payload: year,
      });
    },
  };

  return (
    <CalendarContext.Provider
      value={{
        ...state,
        ...actions,
        locale,
        mode,
        displayFullDays,
        minimumDate,
        maximumDate,
        firstDayOfWeek:
          firstDayOfWeek >= 0 && firstDayOfWeek <= 6 ? firstDayOfWeek : 0,
        theme,
      }}
    >
      <Calendar
        buttonPrevIcon={buttonPrevIcon}
        buttonNextIcon={buttonNextIcon}
      />
    </CalendarContext.Provider>
  );
};

export default DateTimePicker;
