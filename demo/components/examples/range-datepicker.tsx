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
import { CustomDay } from '@/components/custom-day';

export default function RangeDatePicker() {
  const [range, setRange] = useState<{
    startDate: DateType;
    endDate: DateType;
  }>({ startDate: undefined, endDate: undefined });

  return (
    <View className="gap-4">
      <Text className="text-foreground text-xl font-medium">
        Date Range Picker
      </Text>
      <View className="border-border/90 items-center rounded-lg border p-5">
        <Calendar
          mode="range"
          startDate={range.startDate}
          endDate={range.endDate}
          onChange={(params) => setRange(params)}
          max={5}
          minDate={dayjs().add(-3, 'day')}
          timezone="Pacific/Kiritimati"
        />
        <Text>
          Start:{' '}
          {range.startDate
            ? dayjs(range.startDate).format('YYYY-MM-DD HH:mm')
            : '---'}
        </Text>
        <Text>
          End:{' '}
          {range.endDate
            ? dayjs(range.endDate).format('YYYY-MM-DD HH:mm')
            : '---'}
        </Text>
      </View>
    </View>
  );
}
