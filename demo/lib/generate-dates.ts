import dayjs from 'dayjs';

const currentDate = dayjs();
const currentYear = currentDate.year();
const currentMonth = currentDate.month();

export function getRandomDateInMonth(year: number, month: number) {
  const startOfMonth = dayjs().year(year).month(month).startOf('month');
  const endOfMonth = dayjs().year(year).month(month).endOf('month');
  const randomDays = Math.floor(
    Math.random() * endOfMonth.diff(startOfMonth, 'day')
  );
  return startOfMonth.add(randomDays, 'day');
}

export const previousMonthDates = (length: number) => {
  return Array.from({ length }, () =>
    getRandomDateInMonth(currentYear, currentMonth - 1).format('YYYY-MM-DD')
  );
};

export const currentMonthDates = (length: number) => {
  return Array.from({ length }, () =>
    getRandomDateInMonth(currentYear, currentMonth).format('YYYY-MM-DD')
  );
};

export const nextMonthDates = (length: number) => {
  return Array.from({ length }, () =>
    getRandomDateInMonth(currentYear, currentMonth + 1).format('YYYY-MM-DD')
  );
};
