import type { Dayjs } from 'dayjs';
import type { CalendarActionKind, CalendarViews } from './enums';
import type { TextStyle, ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export type DateType = string | number | Dayjs | Date | null | undefined;

export type CalendarModes = 'datetime' | 'date' | 'time';

export type HeaderButtonPositions = 'around' | 'right' | 'left';

export type CalendarState = {
  calendarView: CalendarViews;
  selectedDate: DateType;
  currentDate: DateType; // used for latest state of calendar based on Month and Year
  currentYear: number; // used for pagination in YearSelector
};

export type CalendarAction = {
  type: CalendarActionKind;
  payload: any;
};

export type CalendarTheme = {
  headerButtonsPosition?: HeaderButtonPositions;
  headerContainerStyle?: ViewStyle;
  headerTextContainerStyle?: ViewStyle;
  headerTextStyle?: TextStyle;
  headerButtonStyle?: ViewStyle;
  headerButtonColor?: string;
  headerButtonSize?: number;
  dayContainerStyle?: ViewStyle;
  todayContainerStyle?: ViewStyle;
  todayTextStyle?: TextStyle;
  monthContainerStyle?: ViewStyle;
  yearContainerStyle?: ViewStyle;
  weekDaysContainerStyle?: ViewStyle;
  weekDaysTextStyle?: TextStyle;
  calendarTextStyle?: TextStyle;
  selectedTextStyle?: TextStyle;
  selectedItemColor?: string;
  timePickerContainerStyle?: ViewStyle;
  timePickerTextStyle?: TextStyle;
};

export type HeaderProps = {
  buttonPrevIcon?: ReactNode;
  buttonNextIcon?: ReactNode;
};

export interface IDayObject {
  text: string;
  day: number;
  date: string;
  disabled: boolean;
  isCurrentMonth: boolean;
}
