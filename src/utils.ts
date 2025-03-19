import dayjs from 'dayjs';
import type {
  DateType,
  CalendarDay,
  CalendarMonth,
  CalendarWeek,
  Numerals,
  CalendarType,
} from './types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useRef } from 'react';
import { isEqual } from 'lodash';
import { numeralSystems } from './numerals';

export const CALENDAR_FORMAT = 'YYYY-MM-DD HH:mm';
export const DATE_FORMAT = 'YYYY-MM-DD';
export const YEAR_PAGE_SIZE = 12;
export const VALID_JALALI_LOCALES = new Set(['fa', 'en']);
export const JALALI_MONTHS = {
  en: [
    'Farvardin',
    'Ordibehesht',
    'Khordad',
    'Tir',
    'Mordad',
    'Shahrivar',
    'Mehr',
    'Aban',
    'Azar',
    'Dey',
    'Bahman',
    'Esfand',
  ],
  fa: [
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند',
  ],
};

export const isValidJalaliLocale = (locale: string): boolean =>
  VALID_JALALI_LOCALES.has(locale);

export const getJalaliMonths = (locale: string) =>
  JALALI_MONTHS[locale as 'fa' | 'en'] || JALALI_MONTHS.en;

export const getMonths = () => dayjs.months();

export const getMonthName = (month: number) => dayjs.months()[month];

/**
 * Get months array
 *
 * @returns months array
 */
export const getMonthsArray = ({
  calendar,
  locale,
}: {
  calendar: CalendarType;
  locale: string;
}): CalendarMonth[] => {
  const monthNames =
    calendar === 'jalali' ? getJalaliMonths(locale) : dayjs.months();
  const monthShortNames =
    calendar === 'jalali' ? getJalaliMonths(locale) : dayjs.monthsShort();

  return monthNames.map((name, index) => ({
    index,
    name: {
      full: name,
      short: monthShortNames[index] || '',
    },
    isSelected: false,
  }));
};

/**
 * Get weekdays
 *
 * @param locale - locale
 * @param firstDayOfWeek - first day of week
 * @param format - format short, min or full
 *
 * @returns weekdays
 */
export const getWeekdays = (
  locale: string,
  firstDayOfWeek: number
): CalendarWeek[] => {
  dayjs.locale(locale);

  const weekdayNames = dayjs.weekdays();
  const weekdayShortNames = dayjs.weekdaysShort();
  const weekdayMinNames = dayjs.weekdaysMin();

  let weekdays: CalendarWeek[] = weekdayNames.map((name, index) => ({
    index,
    name: {
      full: name,
      short: weekdayShortNames[index] || '',
      min: weekdayMinNames[index] || '',
    },
  }));

  if (firstDayOfWeek > 0) {
    weekdays = [
      ...weekdays.slice(firstDayOfWeek, weekdays.length),
      ...weekdays.slice(0, firstDayOfWeek),
    ] as CalendarWeek[];
  }
  return weekdays;
};

export const getFormated = (date: DateType) =>
  dayjs(date).format(CALENDAR_FORMAT);

export const getDateMonth = (date: DateType) => dayjs(date).month();

export const getDateYear = (date: DateType) => dayjs(date).year();

/**
 * Check if two dates are on the same day
 *
 * @param a - date to check
 * @param b - date to check
 *
 * @returns true if dates are on the same day, false otherwise
 */
export function areDatesOnSameDay(a: DateType, b: DateType) {
  if (!a || !b) {
    return false;
  }

  const date_a = dayjs(a).format(DATE_FORMAT);
  const date_b = dayjs(b).format(DATE_FORMAT);

  return date_a === date_b;
}

/**
 * Check if date is between two dates
 *
 * @param date - date to check
 * @param options - options
 *
 * @returns true if date is between two dates, false otherwise
 */
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

/**
 * Check if date is disabled
 *
 * @param date - date to check
 * @param options - options
 *
 * @returns true if date is disabled, false otherwise
 */
export function isDateDisabled(
  date: dayjs.Dayjs,
  {
    minDate,
    maxDate,
    enabledDates,
    disabledDates,
  }: {
    minDate?: DateType;
    maxDate?: DateType;
    enabledDates?: DateType[] | ((date: DateType) => boolean) | undefined;
    disabledDates?: DateType[] | ((date: DateType) => boolean) | undefined;
  }
): boolean {
  if (minDate && date.isBefore(dayjs(minDate).startOf('day'))) {
    return true;
  }
  if (maxDate && date.isAfter(dayjs(maxDate).endOf('day'))) {
    return true;
  }

  if (enabledDates) {
    if (Array.isArray(enabledDates)) {
      const isEnabled = enabledDates.some((enabledDate) =>
        areDatesOnSameDay(date, enabledDate)
      );
      return !isEnabled;
    } else if (enabledDates instanceof Function) {
      return !enabledDates(date);
    }
  } else if (disabledDates) {
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

/**
 * Check if year is disabled
 *
 * @param year - year to check
 * @param options - options
 *
 * @returns true if year is disabled, false otherwise
 */
export function isYearDisabled(
  year: number,
  {
    minDate,
    maxDate,
  }: {
    minDate?: DateType;
    maxDate?: DateType;
  }
): boolean {
  if (minDate && year < getDateYear(minDate)) return true;
  if (maxDate && year > getDateYear(maxDate)) return true;

  return false;
}

/**
 * Check if month is disabled
 *
 * @param month - month to check
 * @param date - date to check
 * @param options - options
 *
 * @returns true if month is disabled, false otherwise
 */
export function isMonthDisabled(
  month: number,
  date: DateType,
  {
    minDate,
    maxDate,
  }: {
    minDate?: DateType;
    maxDate?: DateType;
  }
): boolean {
  if (
    minDate &&
    month < getDateMonth(minDate) &&
    getDateYear(date) === getDateYear(minDate)
  )
    return true;
  if (
    maxDate &&
    month > getDateMonth(maxDate) &&
    getDateYear(date) === getDateYear(maxDate)
  )
    return true;

  return false;
}

/**
 * Get formated date
 *
 * @param date - date to get formated date from
 * @param format - format to get formated date from
 *
 * @returns formated date
 */
export const getFormatedDate = (date: DateType, format: string) =>
  dayjs(date).format(format);

/**
 * Get date
 *
 * @param date - date to get
 *
 * @returns date
 */
export const getDate = (date: DateType) => dayjs(date);

/**
 * Get year range
 *
 * @param year - year to get year range from
 *
 * @returns year range
 */
export const getYearRange = (year: number) => {
  const endYear = YEAR_PAGE_SIZE * Math.ceil(year / YEAR_PAGE_SIZE);
  let startYear = endYear === year ? endYear : endYear - YEAR_PAGE_SIZE;

  if (startYear < 0) {
    startYear = 0;
  }
  return Array.from({ length: YEAR_PAGE_SIZE }, (_, i) => startYear + i);
};

/**
 * Get days in month
 *
 * @param date - date to get days in month from
 * @param showOutsideDays - whether to show outside days
 * @param firstDayOfWeek - first day of week, number 0-6, 0 – Sunday, 6 – Saturday
 *
 * @returns days in month
 */
export function getDaysInMonth(
  date: DateType,
  showOutsideDays: boolean | undefined,
  firstDayOfWeek: number
) {
  const daysInCurrentMonth = dayjs(date).daysInMonth();

  const prevMonthDays = dayjs(date).add(-1, 'month').daysInMonth();
  const firstDay = dayjs(date).date(1 - firstDayOfWeek);
  const prevMonthOffset = firstDay.day() % 7;
  const daysInPrevMonth = showOutsideDays ? prevMonthOffset : 0;
  const monthDaysOffset = prevMonthOffset + daysInCurrentMonth;
  const daysInNextMonth = showOutsideDays
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

/**
 * Get first day of month
 *
 * @param date - date to get first day of month from
 * @param firstDayOfWeek - first day of week, number 0-6, 0 – Sunday, 6 – Saturday
 *
 * @returns first day of month
 */
export function getFirstDayOfMonth(
  date: DateType,
  firstDayOfWeek: number
): number {
  const d = getDate(date);
  return d.date(1 - firstDayOfWeek).day();
}

/**
 * Get start of day
 *
 * @param date - date to get start of day from
 *
 * @returns start of day
 */
export function getStartOfDay(date: DateType): DateType {
  return dayjs(date).startOf('day');
}

/**
 * Get end of day
 *
 * @param date - date to get end of day from
 *
 * @returns end of day
 */
export function getEndOfDay(date: DateType): DateType {
  return dayjs(date).endOf('day');
}

/**
 * Convert date to unix timestamp
 *
 * @param date - date to convert
 *
 * @returns unix timestamp
 */
export function dateToUnix(date: DateType): number {
  return dayjs(date).unix();
}

/**
 * Remove time from date
 *
 * @param date - date to remove time from
 *
 * @returns date with time removed
 */
export function removeTime(
  date: DateType,
  timeZone: string | undefined
): DateType {
  return date ? dayjs.tz(date, timeZone).startOf('day') : undefined;
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
    hour12: parseInt(dayjs(date).format('hh')),
    minute: dayjs(date).minute(),
    period: dayjs(date).format('A'),
  };
};

/**
 * Calculate month days array based on current date
 *
 * @param datetime - The current date that selected
 * @param showOutsideDays
 * @param minDate - min selectable date
 * @param maxDate - max selectable date
 * @param firstDayOfWeek - first day of week, number 0-6, 0 – Sunday, 6 – Saturday
 * @param enabledDates - array of enabled dates, or a function that returns true for a given date (takes precedence over disabledDates)
 * @param disabledDates - array of disabled dates, or a function that returns true for a given date
 * @param prevMonthDays - number of days in the previous month
 * @param prevMonthOffset - number of days to offset the previous month
 * @param daysInCurrentMonth - number of days in the current month
 * @param daysInNextMonth - number of days in the next month
 *
 * @returns days array based on current date
 */
export const getMonthDays = (
  datetime: DateType,
  showOutsideDays: boolean,
  minDate: DateType,
  maxDate: DateType,
  firstDayOfWeek: number,
  enabledDates: DateType[] | ((date: DateType) => boolean) | undefined,
  disabledDates: DateType[] | ((date: DateType) => boolean) | undefined,
  prevMonthDays: number,
  prevMonthOffset: number,
  daysInCurrentMonth: number,
  daysInNextMonth: number,
  numerals: Numerals
): CalendarDay[] => {
  const date = dayjs(datetime);

  const prevDays = showOutsideDays
    ? Array.from({ length: prevMonthOffset }, (_, index) => {
        const number = index + (prevMonthDays - prevMonthOffset + 1);
        const thisDay = date.add(-1, 'month').date(number);
        return generateCalendarDay(
          number,
          thisDay,
          minDate,
          maxDate,
          enabledDates,
          disabledDates,
          false,
          index + 1,
          firstDayOfWeek,
          numerals
        );
      })
    : Array(prevMonthOffset).fill(null);

  const currentDays = Array.from({ length: daysInCurrentMonth }, (_, index) => {
    const day = index + 1;
    const thisDay = date.date(day);
    return generateCalendarDay(
      day,
      thisDay,
      minDate,
      maxDate,
      enabledDates,
      disabledDates,
      true,
      prevMonthOffset + day,
      firstDayOfWeek,
      numerals
    );
  });

  const nextDays = Array.from({ length: daysInNextMonth }, (_, index) => {
    const day = index + 1;
    const thisDay = date.add(1, 'month').date(day);
    return generateCalendarDay(
      day,
      thisDay,
      minDate,
      maxDate,
      enabledDates,
      disabledDates,
      false,
      daysInCurrentMonth + prevMonthOffset + day,
      firstDayOfWeek,
      numerals
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
 * @param enabledDates - array of enabled dates, or a function that returns true for a given date (takes precedence over disabledDates)
 * @param disabledDates - array of disabled dates, or a function that returns true for a given date
 * @param isCurrentMonth - define the day is in the current month
 * @param dayOfMonth - number the day in the current month
 * @param firstDayOfWeek - first day of week, number 0-6, 0 – Sunday, 6 – Saturday
 *
 * @returns days object based on current date
 */
const generateCalendarDay = (
  number: number,
  date: dayjs.Dayjs,
  minDate: DateType,
  maxDate: DateType,
  enabledDates: DateType[] | ((date: DateType) => boolean) | undefined,
  disabledDates: DateType[] | ((date: DateType) => boolean) | undefined,
  isCurrentMonth: boolean,
  dayOfMonth: number,
  firstDayOfWeek: number,
  numerals: Numerals
) => {
  const startOfWeek = dayjs(date).startOf('week').add(firstDayOfWeek, 'day');

  return {
    text: formatNumber(number, numerals),
    number,
    date: date,
    isDisabled: isDateDisabled(date, {
      minDate,
      maxDate,
      enabledDates,
      disabledDates,
    }),
    isCurrentMonth,
    dayOfMonth,
    isStartOfWeek: date.isSame(startOfWeek, 'day'),
    isEndOfWeek: date.day() === (firstDayOfWeek + 6) % 7,
  };
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Deep compare memo
 *
 * @param value - value to compare
 * @param deps - dependencies
 *
 * @returns memoized value
 */
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

function getDigitMap(numerals: Numerals): Record<string, string> {
  const digitMap: Record<string, string> = {};
  const numeralDigits = numeralSystems[numerals];

  for (let i = 0; i < 10; i++) {
    digitMap[i.toString()] = numeralDigits[i]!;
  }

  return digitMap;
}

function replaceDigits(input: string, numerals: Numerals): string {
  const digitMap = getDigitMap(numerals);
  return input.replace(/\d/g, (digit) => digitMap[digit] || digit);
}

export function formatNumber(value: number, numerals: Numerals): string {
  return replaceDigits(value.toString(), numerals);
}
