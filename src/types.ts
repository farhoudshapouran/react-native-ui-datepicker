import type { Dayjs } from 'dayjs';
import type { CalendarActionKind, CalendarViews } from './enums';
import type { TextStyle, ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export type DateType = string | number | Date | Dayjs | null;

export type CalendarModes = 'datetime' | 'date' | 'time';

export type HeaderButtonPositions = 'around' | 'right' | 'left';

export type CalendarState = {
  calendarView: CalendarViews;
  selectedDate: DateType;
  currentDate: DateType;
  mode: CalendarModes;
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
  buttonLeftIcon?: ReactNode;
  buttonRightIcon?: ReactNode;
};
