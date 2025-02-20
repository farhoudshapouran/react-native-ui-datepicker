import { useState } from 'react';
import { View } from 'react-native';
import { Text } from '../ui/text';
import { Calendar } from '../ui/calendar';
import {
  DateType,
  CalendarWeek,
  CalendarComponents,
} from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import Feather from '@expo/vector-icons/Feather';
import { cssInterop } from 'nativewind';
import { Link } from 'expo-router';
import { Button } from '../ui/button';

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
  Weekday: (weekday: CalendarWeek) => <Weekday weekday={weekday} />,
};

export default function CustomDatePicker2() {
  const [date, setDate] = useState<DateType>();

  return (
    <View className="flex-1 gap-4">
      <View className="bg-card shadow-muted border-muted mb-4 w-[360px] rounded-2xl border px-6 pb-6 shadow-xl dark:border-none dark:bg-slate-900 dark:shadow-none">
        <Calendar
          mode="single"
          date={date}
          onChange={({ date }) => setDate(date)}
          containerHeight={305}
          className="w-full border-none bg-transparent px-0 shadow-none"
          firstDayOfWeek={1}
          weekdaysHeight={36}
          showOutsideDays={false}
          navigationPosition="right"
          classNames={{
            day_cell: 'p-1.5',
            day: 'rounded-full',
            day_label: 'font-poppinsMedium text-foreground',
            today: 'bg-blue-500/10',
            today_label: 'text-blue-500',
            selected: 'bg-blue-500 shadow-lg shadow-blue-500',
            selected_label: 'text-white',
            header: 'px-2.5 -me-3',
            weekdays: 'pb-2',
            month_selector_label: 'font-poppinsMedium text-foreground text-xl',
            year_selector_label: 'font-poppinsMedium text-foreground text-xl',
            range_fill: 'my-[1px] bg-slate-700/60',
            range_fill_weekstart: 'rounded-s-2xl',
            range_fill_weekend: 'rounded-e-2xl',
            outside_label: 'opacity-70',
            month: 'rounded-full web:hover:bg-slate-400/60',
            month_label: 'font-poppinsMedium text-foreground',
            selected_month: 'bg-blue-500 web:hover:bg-blue-500/80',
            selected_month_label: 'text-white',
            year: 'rounded-full web:hover:bg-slate-400/60',
            year_label: 'font-poppinsMedium text-foreground',
            selected_year: 'bg-blue-500 web:hover:bg-blue-500/80',
            selected_year_label: 'text-white',
          }}
          components={components}
        />
        <View className="flex-row gap-3">
          <Button
            className="flex-1 rounded-full bg-slate-400 dark:bg-slate-600"
            onPress={() => setDate(undefined)}
          >
            <Text className="font-poppins text-white">Remove</Text>
          </Button>
          <Button
            className="flex-1 rounded-full bg-blue-500"
            onPress={() => setDate(new Date())}
          >
            <Text className="font-poppins text-white">Today</Text>
          </Button>
        </View>
      </View>
      <View className="my-4 items-center">
        <Link
          href="https://dribbble.com/shots/16520269-Day-Time-Picker-Anywhere-DS"
          target="_blank"
        >
          <View className="flex-row items-center gap-2">
            <Feather name="dribbble" size={20} className="text-pink-400" />
            <Text className="text-sm hover:text-blue-500">
              Designed by Michał Masiak
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
    <Text className="font-poppinsMedium text-sm">{weekday.name.min[0]}</Text>
  );
};
