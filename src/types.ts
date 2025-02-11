import type { Dayjs } from 'dayjs';
import type { CalendarActionKind, CalendarViews } from './enums';
import type { TextStyle, ViewStyle } from 'react-native';
import type { ReactNode } from 'react';
import { UI, SelectionState, DayFlag, MonthState, YearState } from './ui';

export type DateType = string | number | Dayjs | Date | null | undefined;

export type CalendarMode = 'single' | 'range' | 'multiple';

export type HeaderButtonPositions = 'around' | 'right' | 'left';

export type LocalState = {
  date: DateType;
  startDate: DateType;
  endDate: DateType;
  dates: DateType[];
  calendarView: CalendarViews;
  currentDate: DateType; // used for latest state of calendar based on Month and Year
  currentYear: number;
};

export type CalendarAction = {
  type: CalendarActionKind;
  payload: any;
};

export type HeaderProps = {
  buttonPrevIcon?: ReactNode;
  buttonNextIcon?: ReactNode;
};

export type CalendarDay = {
  text: string;
  number: number;
  date: string;
  isDisabled: boolean;
  isCurrentMonth: boolean;
  dayOfMonth?: number;
  isToday: boolean;
  isSelected: boolean;
  inRange: boolean;
  leftCrop: boolean;
  rightCrop: boolean;
  isStartOfWeek: boolean;
  isEndOfWeek: boolean;
};

export type SingleChange = (params: { date: DateType }) => void;

export type RangeChange = (params: {
  startDate: DateType;
  endDate: DateType;
}) => void;

export type MultiChange = (params: {
  dates: DateType[];
  datePressed: DateType;
  change: 'added' | 'removed';
}) => void;

export type ClassNames = Partial<{
  [key in UI | SelectionState | DayFlag | MonthState | YearState]: string;
}>;

export type Styles = Partial<{
  [key in UI | SelectionState | DayFlag | MonthState | YearState]:
    | ViewStyle
    | TextStyle;
}>;

export type WeekdayName = 'min' | 'short';

export interface DatePickerBaseProps {
  mode?: CalendarMode;
  locale?: string | ILocale; // If ILocale is required, define it somewhere
  startYear?: number;
  endYear?: number;
  minDate?: DateType;
  maxDate?: DateType;
  disabledDates?: DateType[] | ((date: DateType) => boolean);
  firstDayOfWeek?: number;
  showOutsideDays?: boolean;
  timePicker?: boolean;
  date?: DateType;
  dates?: DateType[];
  startDate?: DateType;
  endDate?: DateType;
  onChange?: SingleChange | RangeChange | MultiChange;
  initialView?: CalendarViews;
  height?: number;
  renderDay?: (day: CalendarDay) => React.ReactNode;
  styles?: Styles;
  classNames?: ClassNames;
  headerButtonsPosition?: HeaderButtonPositions;
  weekdays?: WeekdayName;
  multiRangeMode?: boolean;
  showHeader?: boolean;
  showWeekdays?: boolean;
  enableMonthPicker?: boolean;
  enableYearPicker?: boolean;
}
