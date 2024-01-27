import { createContext, useContext } from 'react';
import { CalendarViews } from './enums';
import type {
  DateType,
  DatePickerBaseProps,
  CalendarThemeProps,
} from './types';

export interface CalendarContextType extends DatePickerBaseProps {
  locale: string | ILocale;
  displayFullDays: boolean;
  firstDayOfWeek: number;
  theme: CalendarThemeProps;
  calendarView: CalendarViews;
  currentDate: DateType; // used for latest state of calendar based on Month and Year
  currentYear: number;
  setCalendarView: (value: CalendarViews) => void;
  onSelectDate: (date: DateType) => void;
  onSelectMonth: (month: number) => void;
  onSelectYear: (year: number) => void;
  onChangeMonth: (value: number) => void;
  onChangeYear: (value: number) => void;
}

const CalendarContext = createContext({} as CalendarContextType);

export const useCalendarContext = () => useContext(CalendarContext);

export default CalendarContext;
