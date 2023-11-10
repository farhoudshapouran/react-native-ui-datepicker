import dayjs from 'dayjs';
import type { DateType } from './types';

export interface IDayObject {
  text: string;
  day: number;
  date: string;
  disabled: boolean;
  isCurrentMonth: boolean;
}

export const calendarFormat = 'YYYY-MM-DD HH:mm';
export const dateFormat = 'YYYY-MM-DD';

export const getMonths = () => dayjs.months();

export const getMonthName = (month: number) => dayjs.months()[month];

export const getWeekdays = () => dayjs.weekdays();

export const getWeekdaysShort = () => dayjs.weekdaysShort();

export const getWeekdaysMin = () => dayjs.weekdaysMin();

export const getFormated = (date: DateType) =>
  dayjs(date).format(calendarFormat);

export const getNow = () => dayjs().format(calendarFormat);

export const getDateMonth = (date: DateType) => dayjs(date).month();

export const getDateYear = (date: DateType) => dayjs(date).year();

export const getToday = () => dayjs().format(dateFormat);

export const getFormatedDate = (date: DateType, format: string) =>
  dayjs(date).format(format);

export const getDate = (date: DateType) => dayjs(date, calendarFormat);

/**
 * Get detailed date object
 * @param date Get detailed date object
 * @returns
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
 * @param {DateType} datetime - The current date that selected
 * @param {boolean} displayFullDays
 * @param {DateType} minimumDate - min selectable date
 * @param {DateType} maximumDate - max selectable date
 * @returns {IDayObject[]} days array based on current date
 */
export const getMonthDays = (
  datetime: DateType = dayjs(),
  displayFullDays: boolean,
  minimumDate: DateType,
  maximumDate: DateType
): IDayObject[] => {
  const date = getDate(datetime);
  const daysInMonth = date.daysInMonth();
  const prevMonthDays = date.add(-1, 'month').daysInMonth();
  const firstDay = date.date(1);
  const dayOfMonth = firstDay.day() % 7;

  const prevDays = displayFullDays
    ? Array.from({ length: dayOfMonth }, (_, i) => {
        const day = i + (prevMonthDays - dayOfMonth + 1);
        const thisDay = date.add(-1, 'month').date(day);
        return generateDayObject(day, thisDay, minimumDate, maximumDate, false);
      })
    : Array(dayOfMonth).fill(null);

  const monthDaysOffset = dayOfMonth + daysInMonth;
  const nextMonthDays = displayFullDays
    ? monthDaysOffset > 35
      ? 42 - monthDaysOffset
      : 35 - monthDaysOffset
    : 0;

  const currentDays = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const thisDay = date.date(day);
    return generateDayObject(day, thisDay, minimumDate, maximumDate, true);
  });

  const nextDays = Array.from({ length: nextMonthDays }, (_, i) => {
    const day = i + 1;
    const thisDay = date.add(1, 'month').date(day);
    return generateDayObject(day, thisDay, minimumDate, maximumDate, false);
  });

  return [...prevDays, ...currentDays, ...nextDays];
};

/**
 * Generate day object for displaying inside day cell
 *
 * @param {number} day - number of day
 * @param {dayjs.Dayjs} date - calculated date based on day, month, and year
 * @param {DateType} minDate - min selectable date
 * @param {DateType} maxDate - max selectable date
 * @param {boolean} isCurrentMonth - define the day is in the current month
 * @returns {IDayObject} days object based on current date
 */
const generateDayObject = (
  day: number,
  date: dayjs.Dayjs,
  minDate: DateType,
  maxDate: DateType,
  isCurrentMonth: boolean
) => {
  let disabled = false;
  if (minDate) {
    disabled = date < getDate(minDate);
  }
  if (maxDate && !disabled) {
    disabled = date > getDate(maxDate);
  }
  return {
    text: day.toString(),
    day: day,
    date: getFormatedDate(date, dateFormat),
    disabled,
    isCurrentMonth,
  };
};
