import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { DateType, CalendarModes } from './types';

dayjs.extend(localeData);
dayjs.extend(relativeTime);

type PropTypes = {
  mode: CalendarModes;
  locale: string | ILocale;
  minimumDate: DateType;
  maximumDate: DateType;
  displayFullDays: boolean;
};

type ConfigTypes = {
  calendarFormat: string;
  dateFormat: string;
  timeFormat: string;
};

interface IDayObject {
  text: string;
  day: number;
  date: string;
  disabled: boolean;
  isCurrentMonth: boolean;
}

export default class utils {
  mode: CalendarModes;
  minimumDate: DateType;
  maximumDate: DateType;
  displayFullDays: boolean;
  config: ConfigTypes;

  constructor({
    mode,
    locale,
    minimumDate,
    maximumDate,
    displayFullDays,
  }: PropTypes) {
    this.mode = mode;
    this.minimumDate = minimumDate;
    this.maximumDate = maximumDate;
    this.displayFullDays = displayFullDays;
    this.config = {
      calendarFormat: 'YYYY/MM/DD HH:mm',
      dateFormat: 'YYYY/MM/DD',
      timeFormat: 'HH:mm',
    };
    dayjs.locale(locale);
  }

  getMonths = () => dayjs.months();

  getMonthName = (month: number) => dayjs.months()[month];

  getWeekdays = () => dayjs.weekdays();

  getWeekdaysShort = () => dayjs.weekdaysShort();

  getWeekdaysMin = () => dayjs.weekdaysMin();

  getDateFormated = (date: DateType) =>
    dayjs(date).format(this.config.dateFormat);

  getTimeFormated = (date: DateType) =>
    dayjs(date).format(this.config.timeFormat);

  getFormated = (date: DateType) =>
    dayjs(date).format(this.config.calendarFormat);

  getFormatedValue = (date: DateType) => {
    if (this.mode === 'time') {
      const now = dayjs().format('YYYY/MM/DD');
      return dayjs(now + ' ' + date).format(this.config.calendarFormat);
    } else return dayjs(date).format(this.config.calendarFormat);
  };

  getNow = () => {
    if (this.mode !== 'datetime') {
      const now = dayjs().startOf('day');
      return now.format(this.config.calendarFormat);
    } else return dayjs().format(this.config.calendarFormat);
  };

  getDateMonth = (date: DateType) => dayjs(date).month();

  getDateYear = (date: DateType) => dayjs(date).year();

  getDateHour = (date: DateType) => dayjs(date).hour();

  getDateMinute = (date: DateType) => dayjs(date).minute();

  getToday = () => dayjs().format(this.config.dateFormat);

  getFormatedDate = (date: DateType, format: string) =>
    dayjs(date).format(format);

  getDate = (date: DateType) => dayjs(date, this.config.calendarFormat);

  getMonthDays = (datetime: DateType): IDayObject[] => {
    let date = this.getDate(datetime);
    const currentMonthDays = date.daysInMonth();
    const prevMonthDays = date.add(-1, 'month').daysInMonth();
    const firstDay = date.date(1);
    const dayOfMonth = firstDay.day() % 7;

    const prevDaysArray = Array.from(
      { length: dayOfMonth },
      (_, i) => i + (prevMonthDays - dayOfMonth + 1)
    );
    const monthDaysOffset = dayOfMonth + currentMonthDays;
    const nextMonthDays = this.displayFullDays
      ? monthDaysOffset > 35
        ? 42 - monthDaysOffset
        : 35 - monthDaysOffset
      : 0;

    const prevDays = this.displayFullDays
      ? prevDaysArray.map((day) => {
          const thisDay = date.add(-1, 'month').date(day);
          let disabled = false;
          if (this.minimumDate) {
            disabled = thisDay < this.getDate(this.minimumDate);
          }
          if (this.maximumDate && !disabled) {
            disabled = thisDay > this.getDate(this.maximumDate);
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

    return [
      ...prevDays,
      ...Array.from({ length: currentMonthDays }, (_, i) => {
        const thisDay = date.date(i + 1);
        let disabled = false;
        if (this.minimumDate) {
          disabled = thisDay < this.getDate(this.minimumDate);
        }
        if (this.maximumDate && !disabled) {
          disabled = thisDay > this.getDate(this.maximumDate);
        }
        return {
          text: (i + 1).toString(),
          day: i + 1,
          date: this.getFormatedDate(thisDay, 'YYYY/MM/DD'),
          disabled,
          isCurrentMonth: true,
        };
      }),
      ...Array.from({ length: nextMonthDays }, (_, i) => {
        const thisDay = date.add(1, 'month').date(i + 1);
        let disabled = false;
        if (this.minimumDate) {
          disabled = thisDay < this.getDate(this.minimumDate);
        }
        if (this.maximumDate && !disabled) {
          disabled = thisDay > this.getDate(this.maximumDate);
        }
        return {
          text: (i + 1).toString(),
          day: i + 1,
          date: this.getFormatedDate(thisDay, 'YYYY/MM/DD'),
          disabled,
          isCurrentMonth: false,
        };
      }),
    ];
  };
}
