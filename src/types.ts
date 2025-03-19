import type { Dayjs } from 'dayjs';
import type { CalendarActionKind, CalendarViews } from './enums';
import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import {
  UI,
  SelectionState,
  DayFlag,
  MonthState,
  YearState,
  CalenderFlag,
} from './ui';

export type DateType = string | number | Dayjs | Date | null | undefined;

export type CalendarType = 'gregory' | 'jalali';

export type CalendarMode = 'single' | 'range' | 'multiple';

export type NavigationPosition = 'around' | 'right' | 'left';

export type WeekdayFormat = 'min' | 'short' | 'full';

export type MonthFormat = 'short' | 'full';

export type LocalState = {
  date: DateType;
  startDate: DateType;
  endDate: DateType;
  dates?: DateType[];
  calendarView: CalendarViews;
  currentDate: DateType; // used for latest state of calendar based on Month and Year
  currentYear: number;
  isRTL: boolean; // used for jalali or i18n RTL detection
};

export type CalendarAction = {
  type: CalendarActionKind;
  payload: any;
};

export type CalendarDay = {
  number: number;
  text: string;
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

export type CalendarWeek = {
  index: number;
  name: {
    full: string;
    short: string;
    min: string;
  };
};

export type CalendarMonth = {
  index: number;
  name: {
    full: string;
    short: string;
  };
  isSelected: boolean;
};

export type CalendarYear = {
  number: number;
  text: string;
  isSelected: boolean;
  isActivated: boolean;
};

export type SingleChange = (params: { date: DateType }) => void;

export type RangeChange = (params: {
  startDate: DateType;
  endDate: DateType;
}) => void;

export type MultiChange = (params: {
  dates: DateType[];
  datePressed?: DateType;
  change: 'added' | 'removed' | 'updated';
}) => void;

export type ClassNames = Partial<{
  [key in
    | UI
    | SelectionState
    | DayFlag
    | MonthState
    | YearState
    | CalenderFlag]: string;
}>;

export type Styles = Partial<{
  [key in
    | UI
    | SelectionState
    | DayFlag
    | MonthState
    | YearState
    | CalenderFlag]: ViewStyle | TextStyle | ImageStyle;
}>;

export type CalendarComponents = Partial<{
  /** The component containing the day in the days grid */
  Day: (day: CalendarDay) => React.ReactNode;
  /** The component containing the month in the months grid */
  Month: (month: CalendarMonth) => React.ReactNode;
  /** The component containing the year in the years grid */
  Year: (year: CalendarYear) => React.ReactNode;
  /** The component containing the weekday in the header */
  Weekday: (weekday: CalendarWeek) => React.ReactNode;
  /** The previous month/year button icon in the header */
  IconPrev: React.ReactNode;
  /** The next month button/year icon in the header */
  IconNext: React.ReactNode;
}>;

export interface DatePickerBaseProps {
  mode?: CalendarMode;
  calendar?: CalendarType;
  locale?: string;
  numerals?: Numerals;
  timeZone?: string;
  date?: DateType;
  startDate?: DateType;
  endDate?: DateType;
  dates?: DateType[];
  min?: number;
  max?: number;
  onChange?: SingleChange | RangeChange | MultiChange;
  startYear?: number;
  endYear?: number;
  minDate?: DateType;
  maxDate?: DateType;
  enabledDates?: DateType[] | ((date: DateType) => boolean);
  disabledDates?: DateType[] | ((date: DateType) => boolean);
  firstDayOfWeek?: number;
  showOutsideDays?: boolean;
  timePicker?: boolean;
  use12Hours?: boolean;
  initialView?: CalendarViews;
  containerHeight?: number;
  weekdaysHeight?: number;
  style?: ViewStyle;
  className?: string;
  styles?: Styles;
  classNames?: ClassNames;
  navigationPosition?: NavigationPosition;
  weekdaysFormat?: WeekdayFormat;
  monthsFormat?: MonthFormat;
  monthCaptionFormat?: MonthFormat;
  multiRangeMode?: boolean;
  hideHeader?: boolean;
  hideWeekdays?: boolean;
  disableMonthPicker?: boolean;
  disableYearPicker?: boolean;
  components?: CalendarComponents;
  /** use to handle month and year selectors */
  month?: number;
  year?: number;
  onMonthChange?: (month: number) => void;
  onYearChange?: (year: number) => void;
}

export type Numerals =
  | 'latn'
  | 'arab'
  | 'arabext'
  | 'deva'
  | 'beng'
  | 'guru'
  | 'gujr'
  | 'orya'
  | 'tamldec'
  | 'telu'
  | 'knda'
  | 'mlym';

export type PickerOption = {
  value: number | string;
  text: string;
};
