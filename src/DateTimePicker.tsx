import React, { useEffect, useReducer } from 'react';
import { getFormated, getDate, getDateYear, getDateMonth } from './utils';
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
  value: DateType;
  mode?: CalendarModes;
  locale?: string | ILocale;
  minimumDate?: DateType;
  maximumDate?: DateType;
  firstDayOfWeek?: number;
  onValueChange?: (value: DateType) => void;
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
      }
    },
    {
      calendarView: mode === 'time' ? CalendarViews.time : mode === 'year' ? CalendarViews.year : mode ==='month' ? CalendarViews.month : CalendarViews.day ,
      selectedDate: value ? getFormated(value) : new Date(),
      currentDate: value ? getFormated(value) : new Date(),
      currentYear: value ? getDateYear(value) : new Date().getFullYear(),
    }
  );

  useEffect(() => {
    if( mode === 'month'){
      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_DATE,
        payload: value ? getFormated(value) : new Date(),
      });
      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_YEAR,
        payload: getDateYear(value),
      });
    }else if(mode === 'year'){
      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_DATE,
        payload:  getDateMonth(value) ,
      });
    }
    else{
      dispatch({
        type: CalendarActionKind.CHANGE_SELECTED_DATE,
        payload: value ? getFormated(value) : new Date(),
      });
      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_DATE,
        payload: value ? getFormated(value) : new Date(),
      });
      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_YEAR,
        payload: getDateYear(value),
      });
    }
  }, [value]);

  useEffect(() => {
    dispatch({
      type: CalendarActionKind.SET_CALENDAR_VIEW,
      payload: mode === 'time' ? CalendarViews.time : mode === 'year' ? CalendarViews.year : mode ==='month' ? CalendarViews.month : CalendarViews.day ,
    });
  }, [mode]);

  const actions = {
    setCalendarView: (view: CalendarViews) =>
      dispatch({ type: CalendarActionKind.SET_CALENDAR_VIEW, payload: view }),
    onSelectDate: (date: DateType) => {
      onValueChange(date);
      dispatch({
        type: CalendarActionKind.CHANGE_SELECTED_DATE,
        payload: date,
      });
      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_DATE,
        payload: date,
      });
    },
    onSelectMonth: (month: number, currentYear: number | string) => {
      const date = new Date(currentYear.toString()).setMonth(month)
      const newDate = getDate(date).month(month);
      if(mode === CalendarViews.day){
        dispatch({
          type: CalendarActionKind.CHANGE_CURRENT_DATE,
          payload: getFormated(newDate),
        });
        dispatch({
          type: CalendarActionKind.SET_CALENDAR_VIEW,
          payload: CalendarViews.day,
        });
      }else {  onValueChange(date);
        dispatch({
          type: CalendarActionKind.CHANGE_SELECTED_DATE,
          payload: getFormated(newDate),
        });
        dispatch({
          type: CalendarActionKind.CHANGE_CURRENT_DATE,
          payload: getFormated(newDate),
        });
      }
    },
    onSelectYear: (year: number) => {
      const date = new Date().setYear(year)
      const newDate = getDate(state.currentDate).year(year);
      if(mode === 'month') {
        dispatch({
          type: CalendarActionKind.CHANGE_CURRENT_YEAR,
          payload: year,
        });
        dispatch({
          type: CalendarActionKind.CHANGE_CURRENT_DATE,
          payload: newDate,
        });
        dispatch({
          type: CalendarActionKind.CHANGE_SELECTED_DATE,
          payload: newDate,
        });
        dispatch({
          type: CalendarActionKind.SET_CALENDAR_VIEW,
          payload: CalendarViews.month,
        });
      } else if(mode === CalendarViews.day) {
        dispatch({
          type: CalendarActionKind.CHANGE_CURRENT_YEAR,
          payload: year,
        });
        dispatch({
          type: CalendarActionKind.SET_CALENDAR_VIEW,
          payload: CalendarViews.month,
        });
      } else {
        dispatch({
          type: CalendarActionKind.CHANGE_CURRENT_DATE,
          payload: getFormated(newDate),
        });
        onValueChange(date);
      }
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
