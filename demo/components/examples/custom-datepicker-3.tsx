import { useMemo, useState } from 'react';
import { View } from 'react-native';
import { Text } from '../ui/text';
import { Calendar } from '../ui/calendar';
import {
  DateType,
  CalendarDay,
  CalendarWeek,
  CalendarComponents,
} from 'react-native-ui-datepicker';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
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

cssInterop(Entypo, {
  className: {
    target: 'style',
  },
});

const components: CalendarComponents = {
  IconPrev: (
    <Feather name="chevron-left" size={22} className="text-muted-foreground" />
  ),
  IconNext: (
    <Feather name="chevron-right" size={22} className="text-muted-foreground" />
  ),
  Weekday: (weekday: CalendarWeek) => <Weekday weekday={weekday} />,
  Day: (day: CalendarDay) => <Day day={day} />,
};

export default function CustomDatePicker3() {
  const [date, setDate] = useState<DateType>();

  return (
    <View className="gap-4">
      <View className="bg-card shadow-muted border-muted mb-4 w-[360px] rounded border px-5 py-4 shadow-xl dark:border-none dark:bg-slate-900 dark:shadow-none">
        <View className="flex-row items-center justify-between">
          <Text className="font-archivoMedium text-muted-foreground text-xl">
            Calendar
          </Text>
          <Entypo
            name="dots-three-vertical"
            size={16}
            className="text-muted-foreground"
          />
        </View>

        <Calendar
          mode="single"
          date={date}
          onChange={({ date }) => setDate(date)}
          containerHeight={400}
          weekdaysHeight={44}
          className="w-full border-none bg-transparent px-0 pb-2 pt-0 shadow-none"
          firstDayOfWeek={1}
          monthCaptionFormat="short"
          multiRangeMode
          classNames={{
            day_cell: 'p-1',
            header: 'px-[65px] mb-2',
            weekdays: 'py-2 mx-1 bg-blue-500/10 rounded dark:bg-slate-800',
            month_selector_label:
              'font-archivoMedium text-muted-foreground text-lg',
            year_selector_label:
              'font-archivoMedium text-muted-foreground text-lg',
            month: 'rounded web:hover:bg-muted web:dark:hover:bg-slate-700/60',
            month_label: 'font-archivo text-lg text-foreground',
            selected_month: 'bg-slate-500 web:hover:bg-slate-500',
            selected_month_label: 'text-slate-100',
            year: 'rounded web:hover:bg-muted web:dark:hover:bg-slate-700/60',
            year_label: 'font-archivo text-lg text-foreground',
            active_year: 'bg-slate-700/60',
            selected_year: 'bg-slate-500 web:hover:bg-slate-500',
            selected_year_label: 'text-slate-100',
          }}
          components={components}
        />
      </View>
      <View className="my-4 items-center">
        <Link
          href="https://dribbble.com/shots/19650420-Figma-dashboard-template-Datepicker-UI-design"
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

type WeekdayProps = {
  weekday: CalendarWeek;
};

const Weekday = ({ weekday }: WeekdayProps) => {
  return (
    <Text className="font-poppinsMedium text-base">{weekday.name.min[0]}</Text>
  );
};

type DayProps = {
  day: CalendarDay;
};

const Day = ({ day }: DayProps) => {
  const { isSelected, isToday, isCurrentMonth } = day;
  const length =
    day.number % 3 === 0
      ? 1
      : day.number % 4 === 2
        ? 2
        : day.number % 5 === 0
          ? 3
          : 0;

  const dots = useMemo(() => <Dots length={length} />, [length]);

  return (
    <View
      className={cn(
        'relative w-full flex-1 items-center justify-center rounded border border-transparent pb-2',
        isSelected &&
          'border-dashed border-pink-200 bg-pink-50 dark:border-solid dark:border-slate-800 dark:bg-slate-800'
      )}
    >
      <Text
        className={cn(
          'font-archivo text-foreground',
          !isCurrentMonth && 'opacity-30',
          isSelected && 'text-slate-950 dark:text-slate-100'
        )}
      >
        {day.text}
      </Text>
      {dots}
    </View>
  );
};

const colors = ['bg-green-500', 'bg-red-500', 'bg-yellow-500'];

const Dots = ({ length }: { length: number }) => {
  const shuffledColors = shuffleArray(colors);

  return (
    <View className="absolute bottom-2 flex-row gap-0.5">
      {Array.from({ length }, (_, index) => (
        <View
          key={index}
          className={cn('size-1.5 rounded-full', shuffledColors[index])}
        />
      ))}
    </View>
  );
};

function shuffleArray(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
