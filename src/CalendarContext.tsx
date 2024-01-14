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
  firstDayOfWeek: number;
  theme?: CalendarTheme;
  setCalendarView: (value: CalendarViews) => void;
  onSelectMonth: (month: number) => void;
  onSelectDate: (date: DateType) => void;
  onSelectDateTo: (date: DateType , from : DateType) => void;
  onSelectYear: (year: number) => void;
  onChangeMonth: (value: number) => void;
  onChangeYear: (value: number) => void;
}

const CalendarContext = createContext({} as CalendarContextType);

export const useCalendarContext = () => useContext(CalendarContext);

export default CalendarContext;
