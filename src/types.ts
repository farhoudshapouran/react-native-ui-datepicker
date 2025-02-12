import type { Dayjs } from 'dayjs';
import type { CalendarActionKind, CalendarViews } from './enums';
import type { TextStyle, ViewStyle } from 'react-native';
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
  isCrop: boolean;
  inMiddle: boolean;
  rangeStart: boolean;
  rangeEnd: boolean;
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

export type Components = Partial<{
  /** The view containing the day in the day cell.. */
  Day: (day: CalendarDay) => React.ReactNode;
  /** The previous month/year button icon in the header. */
  PrevIcon: React.ReactNode;
  /** The next month button/year icon in the header. */
  NextIcon: React.ReactNode;
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
  containerHeight?: number;
  weekdaysHeight?: number;
  styles?: Styles;
  classNames?: ClassNames;
  headerButtonsPosition?: HeaderButtonPositions;
  weekdays?: WeekdayName;
  multiRangeMode?: boolean;
  hideHeader?: boolean;
  hideWeekdays?: boolean;
  disableMonthPicker?: boolean;
  disableYearPicker?: boolean;
  components?: Components;
}
