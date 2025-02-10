import dayjs from 'dayjs';
import type { DateType, DayObject, WeekdayName } from './types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useRef } from 'react';
import { isEqual } from 'lodash';

export const CALENDAR_FORMAT = 'YYYY-MM-DD HH:mm';
export const DATE_FORMAT = 'YYYY-MM-DD';
export const YEAR_PAGE_SIZE = 12;

export const getMonths = () => dayjs.months();

export const getMonthName = (month: number) => dayjs.months()[month];

export const getWeekdays = () => dayjs.weekdays();

export const getWeekdaysShort = () => dayjs.weekdaysShort();

export const getWeekdaysMin = (
  locale: string | ILocale,
  firstDayOfWeek: number,
  weekdays: WeekdayName
) => {
  dayjs().locale(locale);
  let days = weekdays === 'min' ? dayjs.weekdaysMin() : dayjs.weekdaysShort();
  if (firstDayOfWeek > 0) {
    days = [
      ...days.slice(firstDayOfWeek, days.length),
      ...days.slice(0, firstDayOfWeek),
    ] as dayjs.WeekdayNames;
  }
  return days;
};

export const getFormated = (date: DateType) =>
  dayjs(date).format(CALENDAR_FORMAT);

export const getDateMonth = (date: DateType) => dayjs(date).month();

export const getDateYear = (date: DateType) => dayjs(date).year();

export const getToday = () => dayjs().format(DATE_FORMAT);

export function areDatesOnSameDay(a: DateType, b: DateType) {
  if (!a || !b) {
    return false;
  }

  const date_a = dayjs(a).format(DATE_FORMAT);
  const date_b = dayjs(b).format(DATE_FORMAT);

  return date_a === date_b;
}

export function isDateBetween(
  date: DateType,
  {
    startDate,
    endDate,
  }: {
    startDate?: DateType;
    endDate?: DateType;
  }
): boolean {
  if (!startDate || !endDate) {
    return false;
  }

  return dayjs(date) <= endDate && dayjs(date) >= startDate;
}

export function isDateDisabled(
  date: dayjs.Dayjs,
  {
    minDate,
    maxDate,
    disabledDates,
  }: {
    minDate?: DateType;
    maxDate?: DateType;
    disabledDates?: DateType[] | ((date: DateType) => boolean) | undefined;
  }
): boolean {
  if (minDate && date < getDate(minDate)) {
    return true;
  }
  if (maxDate && date > getDate(maxDate)) {
    return true;
  }

  if (disabledDates) {
    if (Array.isArray(disabledDates)) {
      const isDisabled = disabledDates.some((disabledDate) =>
        areDatesOnSameDay(date, disabledDate)
      );
      return isDisabled;
    } else if (disabledDates instanceof Function) {
      return disabledDates(date);
    }
  }

  return false;
}

export const getFormatedDate = (date: DateType, format: string) =>
  dayjs(date).format(format);

export const getDate = (date: DateType) => dayjs(date, DATE_FORMAT);

export const getYearRange = (year: number) => {
  const endYear = YEAR_PAGE_SIZE * Math.ceil(year / YEAR_PAGE_SIZE);
  let startYear = endYear === year ? endYear : endYear - YEAR_PAGE_SIZE;

  if (startYear < 0) {
    startYear = 0;
  }
  return Array.from({ length: YEAR_PAGE_SIZE }, (_, i) => startYear + i);
};

export function getDaysInMonth(
  date: DateType,
  displayFullDays: boolean | undefined,
  firstDayOfWeek: number
) {
  const daysInCurrentMonth = dayjs(date).daysInMonth();

  const prevMonthDays = dayjs(date).add(-1, 'month').daysInMonth();
  const firstDay = dayjs(date).date(1 - firstDayOfWeek);
  const prevMonthOffset = firstDay.day() % 7;
  const daysInPrevMonth = displayFullDays ? prevMonthOffset : 0;
  const monthDaysOffset = prevMonthOffset + daysInCurrentMonth;
  const daysInNextMonth = displayFullDays
    ? monthDaysOffset > 35
      ? 42 - monthDaysOffset
      : 35 - monthDaysOffset
    : 0;

  const fullDaysInMonth =
    daysInPrevMonth + daysInCurrentMonth + daysInNextMonth;

  return {
    prevMonthDays,
    prevMonthOffset,
    daysInCurrentMonth,
    daysInNextMonth,
    fullDaysInMonth,
  };
}

export function getFirstDayOfMonth(
  date: DateType,
  firstDayOfWeek: number
): number {
  const d = getDate(date);
  return d.date(1 - firstDayOfWeek).day();
}

export function getStartOfDay(date: DateType): DateType {
  return dayjs(date).startOf('day');
}

export function getEndOfDay(date: DateType): DateType {
  return dayjs(date).endOf('day');
}

export function dateToUnix(date: DateType): number {
  return dayjs(date).unix();
}

export function removeTime(date: DateType): DateType {
  return date ? dayjs(date).startOf('day') : undefined;
}

/**
 * Get detailed date object
 *
 * @param date Get detailed date object
 *
 * @returns parsed date object
 */
export const getParsedDate = (date: DateType) => {
  return {
    year: dayjs(date).year(),
    month: dayjs(date).month(),
    hour: dayjs(date).hour(),
    minute: dayjs(date).minute(),
  };
};

/**
 * Calculate month days array based on current date
 *
 * @param datetime - The current date that selected
 * @param displayFullDays
 * @param minDate - min selectable date
 * @param maxDate - max selectable date
 * @param firstDayOfWeek - first day of week, number 0-6, 0 – Sunday, 6 – Saturday
 * @param disabledDates - array of disabled dates, or a function that returns true for a given date
 *
 * @returns days array based on current date
 */
export const getMonthDays = (
  datetime: DateType = dayjs(),
  displayFullDays: boolean,
  minDate: DateType,
  maxDate: DateType,
  firstDayOfWeek: number,
  disabledDates: DateType[] | ((date: DateType) => boolean) | undefined
): DayObject[] => {
  const date = getDate(datetime);
  const {
    prevMonthDays,
    prevMonthOffset,
    daysInCurrentMonth,
    daysInNextMonth,
  } = getDaysInMonth(datetime, displayFullDays, firstDayOfWeek);

  const prevDays = displayFullDays
    ? Array.from({ length: prevMonthOffset }, (_, index) => {
        const number = index + (prevMonthDays - prevMonthOffset + 1);
        const thisDay = date.add(-1, 'month').date(number);
        return generateDayObject(
          number,
          thisDay,
          minDate,
          maxDate,
          disabledDates,
          false,
          index + 1,
          firstDayOfWeek
        );
      })
    : Array(prevMonthOffset).fill(null);

  const currentDays = Array.from({ length: daysInCurrentMonth }, (_, index) => {
    const day = index + 1;
    const thisDay = date.date(day);
    return generateDayObject(
      day,
      thisDay,
      minDate,
      maxDate,
      disabledDates,
      true,
      prevMonthOffset + day,
      firstDayOfWeek
    );
  });

  const nextDays = Array.from({ length: daysInNextMonth }, (_, index) => {
    const day = index + 1;
    const thisDay = date.add(1, 'month').date(day);
    return generateDayObject(
      day,
      thisDay,
      minDate,
      maxDate,
      disabledDates,
      false,
      daysInCurrentMonth + prevMonthOffset + day,
      firstDayOfWeek
    );
  });

  return [...prevDays, ...currentDays, ...nextDays];
};

/**
 * Generate day object for displaying inside day cell
 *
 * @param number - number of day
 * @param date - calculated date based on day, month, and year
 * @param minDate - min selectable date
 * @param maxDate - max selectable date
 * @param disabledDates - array of disabled dates, or a function that returns true for a given date
 * @param isCurrentMonth - define the day is in the current month
 * @param dayOfMonth - number the day in the current month
 * @param firstDayOfWeek - first day of week, number 0-6, 0 – Sunday, 6 – Saturday
 *
 * @returns days object based on current date
 */
const generateDayObject = (
  number: number,
  date: dayjs.Dayjs,
  minDate: DateType,
  maxDate: DateType,
  disabledDates: DateType[] | ((date: DateType) => boolean) | undefined,
  isCurrentMonth: boolean,
  dayOfMonth: number,
  firstDayOfWeek: number
) => {
  const startOfWeek = date.startOf('week').add(firstDayOfWeek, 'day');

  return {
    text: number.toString(),
    number,
    date: getFormatedDate(date, DATE_FORMAT),
    isDisabled: isDateDisabled(date, { minDate, maxDate, disabledDates }),
    isCurrentMonth,
    dayOfMonth,
    isStartOfWeek: date.isSame(startOfWeek, 'day'),
    isEndOfWeek: date.day() === (firstDayOfWeek + 6) % 7,
  };
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useDeepCompareMemo<T>(value: T, deps: any[]): T {
  const ref = useRef<T>();
  const depsRef = useRef<any[]>();

  if (
    !depsRef.current ||
    !deps.every((dep, i) => isEqual(dep, depsRef.current![i]))
  ) {
    ref.current = value;
    depsRef.current = deps;
  }

  return ref.current as T;
}
