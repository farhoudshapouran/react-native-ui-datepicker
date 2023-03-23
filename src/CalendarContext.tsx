import { createContext, useContext } from 'react';
import calendarUtils from './utils';
import { CalendarViews } from './enums';
import type { DateType, CalendarTheme, CalendarModes } from './types';

export interface CalendarContextType {
  utils: calendarUtils;
  calendarView: CalendarViews;
  selectedDate: DateType;
  currentDate: DateType;
  mode: CalendarModes;
  theme?: CalendarTheme;
  setCalendarView: (value: CalendarViews) => void;
  onSelectDate: (date: DateType) => void;
  onSelectMonth: (month: number) => void;
  onSelectYear: (year: number) => void;
  onChangeMonth: (value: number) => void;
  onChangeYear: (value: number) => void;
}

const CalendarContext = createContext<CalendarContextType>({
  utils: new calendarUtils({
    mode: 'datetime',
    locale: 'en',
    minimumDate: null,
    maximumDate: null,
    displayFullDays: false,
  }),
  calendarView: CalendarViews.day,
  selectedDate: Date.now(),
  currentDate: Date.now(),
  mode: 'datetime',
  setCalendarView: () => {},
  onSelectDate: () => {},
  onSelectMonth: () => {},
  onSelectYear: () => {},
  onChangeMonth: () => {},
  onChangeYear: () => {},
});

export const useCalendarContext = () => useContext(CalendarContext);

export default CalendarContext;
