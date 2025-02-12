import { useCallback, useState } from 'react';
import { View, Text } from 'react-native';
import { Calendar } from '../ui/calendar';
import DateTimePicker, {
  DateType,
  CalendarDay,
  getDefaultClassNames,
  getDefaultStyles,
} from 'react-native-ui-datepicker';
import { buttonVariants, buttonTextVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import Feather from '@expo/vector-icons/Feather';
import { CustomDay } from '@/components/custom-day';
import { cssInterop } from 'nativewind';

cssInterop(Feather, {
  className: {
    target: 'style',
  },
});

const components = {
  PrevIcon: <Feather name="moon" size={14} className="text-foreground" />,
  NextIcon: <Feather name="sun" size={14} className="text-foreground" />,
  Day: (day: CalendarDay) => <CustomDay day={day} />,
};

export default function CustomDatePicker() {
  const [date, setDate] = useState<DateType>();

  return (
    <View className="gap-4">
      <Calendar
        mode="single"
        date={date}
        onChange={({ date }) => setDate(date)}
        components={components}
        containerHeight={400}
      />
    </View>
  );
}
