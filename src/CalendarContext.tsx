import { createContext, useContext } from 'react';
import { CalendarViews } from './enums';
import type {
  DateType,
  CalendarTheme,
  CalendarModes,
  CalendarState,
} from './types';

export interface CalendarContextType extends CalendarState {
  mode: CalendarModes;
  locale: string | ILocale;
  displayFullDays: boolean;
  minimumDate: DateType;
  maximumDate: DateType;
  theme?: CalendarTheme;
  setCalendarView: (value: CalendarViews) => void;
  onSelectDate: (date: DateType) => void;
  onSelectMonth: (month: number) => void;
  onSelectYear: (year: number) => void;
  onChangeMonth: (value: number) => void;
  onChangeYear: (value: number) => void;
}

const CalendarContext = createContext<CalendarContextType>({
  calendarView: CalendarViews.day,
  selectedDate: new Date(),
  currentDate: new Date(),
  currentYear: new Date().getFullYear(),
  mode: 'datetime',
  locale: 'en',
  minimumDate: null,
  maximumDate: null,
  displayFullDays: false,
  setCalendarView: () => {},
  onSelectDate: () => {},
  onSelectMonth: () => {},
  onSelectYear: () => {},
  onChangeMonth: () => {},
  onChangeYear: () => {},
});

export const useCalendarContext = () => useContext(CalendarContext);

export default CalendarContext;
