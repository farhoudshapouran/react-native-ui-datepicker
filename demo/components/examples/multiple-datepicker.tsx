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

export default function MultipleDatePicker() {
  const [dates, setDates] = useState<DateType[]>();

  return (
    <View className="gap-4">
      <Text className="text-foreground text-xl font-medium">
        Date Multiple Picker
      </Text>
      <View className="border-border/90 items-center rounded-lg border p-5">
        <Calendar
          mode="multiple"
          dates={dates}
          onChange={({ dates }) => setDates(dates)}
          max={8}
        />
      </View>
    </View>
  );
}
