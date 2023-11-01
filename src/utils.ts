import dayjs from 'dayjs';
import type { DateType } from './types';

export interface IDayObject {
  text: string;
  day: number;
  date: string;
  disabled: boolean;
  isCurrentMonth: boolean;
}

const calendarFormat = 'YYYY/MM/DD HH:mm';
const dateFormat = 'YYYY/MM/DD';

export default class utils {
  static getMonths = () => dayjs.months();

  static getMonthName = (month: number) => dayjs.months()[month];

  static getWeekdays = () => dayjs.weekdays();

  static getWeekdaysShort = () => dayjs.weekdaysShort();

  static getWeekdaysMin = () => dayjs.weekdaysMin();

  static getFormated = (date: DateType) => dayjs(date).format(calendarFormat);

  static getNow = () => dayjs().format(calendarFormat);

  static getDateMonth = (date: DateType) => dayjs(date).month();

  static getDateYear = (date: DateType) => dayjs(date).year();

  static getDateHour = (date: DateType) => dayjs(date).hour();

  static getDateMinute = (date: DateType) => dayjs(date).minute();

  static getToday = () => dayjs().format(dateFormat);

  static getFormatedDate = (date: DateType, format: string) =>
    dayjs(date).format(format);

  static getDate = (date: DateType) => dayjs(date, calendarFormat);

  /**
   * Calculate month days array based on current date
   *
   * @param {DateType} datetime - The current date that selected
   * @param {boolean} displayFullDays
   * @param {DateType} minimumDate
   * @param {DateType} maximumDate
   * @returns {IDayObject[]} days array based on current date
   */
  static getMonthDays = (
    datetime: DateType = dayjs(),
    displayFullDays: boolean,
    minimumDate: DateType,
    maximumDate: DateType
  ): IDayObject[] => {
    const date = this.getDate(datetime);
    const currentMonthDays = date.daysInMonth();
    const prevMonthDays = date.add(-1, 'month').daysInMonth();
    const firstDay = date.date(1);
    const dayOfMonth = firstDay.day() % 7;

    const prevDaysArray = Array.from(
      { length: dayOfMonth },
      (_, i) => i + (prevMonthDays - dayOfMonth + 1)
    );
    const monthDaysOffset = dayOfMonth + currentMonthDays;
    const nextMonthDays = displayFullDays
      ? monthDaysOffset > 35
        ? 42 - monthDaysOffset
        : 35 - monthDaysOffset
      : 0;

    const prevDays =
      displayFullDays && prevDaysArray && prevDaysArray.length > 0
        ? prevDaysArray?.map((day) => {
            const thisDay = date.add(-1, 'month').date(day);
            let disabled = false;
            if (minimumDate) {
              disabled = thisDay < this.getDate(minimumDate);
            }
            if (maximumDate && !disabled) {
              disabled = thisDay > this.getDate(maximumDate);
            }
            return {
              text: day.toString(),
              day,
              date: this.getFormatedDate(thisDay, 'YYYY/MM/DD'),
              disabled,
              isCurrentMonth: false,
            };
          })
        : new Array(dayOfMonth);

    const currentDays = Array.from({ length: currentMonthDays }, (_, i) => {
      const thisDay = date.date(i + 1);
      let disabled = false;
      if (minimumDate) {
        disabled = thisDay < this.getDate(minimumDate);
      }
      if (maximumDate && !disabled) {
        disabled = thisDay > this.getDate(maximumDate);
      }
      return {
        text: (i + 1).toString(),
        day: i + 1,
        date: this.getFormatedDate(thisDay, 'YYYY/MM/DD'),
        disabled,
        isCurrentMonth: true,
      };
    });

    const nextDays = Array.from({ length: nextMonthDays }, (_, i) => {
      const thisDay = date.add(1, 'month').date(i + 1);
      let disabled = false;
      if (minimumDate) {
        disabled = thisDay < this.getDate(minimumDate);
      }
      if (maximumDate && !disabled) {
        disabled = thisDay > this.getDate(maximumDate);
      }
      return {
        text: (i + 1).toString(),
        day: i + 1,
        date: this.getFormatedDate(thisDay, 'YYYY/MM/DD'),
        disabled,
        isCurrentMonth: false,
      };
    });

    return [...prevDays, ...currentDays, ...nextDays];
  };
}
