import { useMemo, useState } from 'react';
import { View } from 'react-native';
import { Text } from '../ui/text';
import { Calendar } from '../ui/calendar';
import {
  DateType,
  CalendarDay,
  CalendarComponents,
} from 'react-native-ui-datepicker';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import Feather from '@expo/vector-icons/Feather';
import { cssInterop } from 'nativewind';
import {
  currentMonthDates,
  nextMonthDates,
  previousMonthDates,
} from '@/lib/generate-dates';
import { Link } from 'expo-router';

cssInterop(Feather, {
  className: {
    target: 'style',
  },
});

const components: CalendarComponents = {
  IconPrev: (
    <Feather name="chevron-left" size={22} className="text-foreground" />
  ),
  IconNext: (
    <Feather name="chevron-right" size={22} className="text-foreground" />
  ),
  Day: (day: CalendarDay) => <Day day={day} />,
};

export default function CustomDatePicker1() {
  const [dates, setDates] = useState<DateType[]>();

  return (
    <View className="flex-1 gap-4">
      <Calendar
        mode="multiple"
        dates={dates}
        onChange={({ dates }) => setDates(dates)}
        containerHeight={320}
        className="bg-card border-muted mb-4 w-[450px] rounded-3xl px-4 pb-4 shadow-xl dark:border-slate-900 dark:bg-slate-950"
        firstDayOfWeek={1}
        weekdaysFormat="short"
        weekdaysHeight={36}
        multiRangeMode
        classNames={{
          day_cell: 'p-[1px]',
          header: 'px-2 mb-2',
          weekdays: 'pb-2',
          month_selector_label: 'font-archivoSemiBold text-foreground text-lg',
          year_selector_label: 'font-archivoSemiBold text-foreground text-lg',
          weekday_label: 'font-archivoLight text-foreground',
          range_fill: 'my-[1px] bg-slate-200 dark:bg-slate-700/60',
          range_fill_weekstart: 'rounded-s-2xl',
          range_fill_weekend: 'rounded-e-2xl',
          outside_label: 'opacity-70',
          month:
            'rounded-2xl web:hover:bg-muted web:dark:hover:bg-slate-700/60',
          month_label: 'text-foreground',
          selected_month: 'bg-slate-500 web:hover:bg-slate-500',
          selected_month_label: 'text-slate-100',
          year: 'rounded-2xl web:hover:bg-muted web:dark:hover:bg-slate-700/60',
          year_label: 'text-foreground',
          active_year: 'bg-slate-700/60',
          selected_year: 'bg-slate-500 web:hover:bg-slate-500',
          selected_year_label: 'text-slate-100',
        }}
        components={components}
      />
      <View className="my-4 items-center">
        <Link
          href="https://dribbble.com/shots/19975079-Calendar-templates-Date-picker-UI-design"
          target="_blank"
        >
          <View className="flex-row items-center gap-2">
            <Feather name="dribbble" size={20} className="text-pink-400" />
            <Text className="text-sm hover:text-blue-500">
              Designed by Roman Kamushken
            </Text>
          </View>
        </Link>
      </View>
    </View>
  );
}

const markedDates = [
  ...previousMonthDates(6),
  ...currentMonthDates(6),
  ...nextMonthDates(6),
];

type DayProps = {
  day: CalendarDay;
};

const Day = ({ day }: DayProps) => {
  const { isSelected, isToday, isCurrentMonth } = day;
  const formatedDate = dayjs(day.date).format('YYYY-MM-DD');
  const isMarked = useMemo(
    () => markedDates.includes(formatedDate),
    [formatedDate]
  );
  const isGreen = day.number % 2 === 0;

  return (
    <View
      className={cn(
        'relative w-full flex-1 items-center justify-center rounded-2xl',
        isSelected && 'bg-slate-500'
      )}
    >
      <Text
        className={cn(
          'font-archivo text-foreground',
          !isCurrentMonth && 'opacity-50',
          isSelected && 'text-slate-100'
        )}
      >
        {day.text}
      </Text>
      {isToday ? (
        <View className="absolute bottom-1 size-1 rounded-full bg-slate-100" />
      ) : isMarked ? (
        <Text
          className={cn(
            'font-archivoSemiBold absolute bottom-1 text-[9px]',
            isGreen ? 'text-green-500' : 'text-red-400'
          )}
        >
          {isGreen ? '1141' : '1610'}
        </Text>
      ) : null}
    </View>
  );
};
