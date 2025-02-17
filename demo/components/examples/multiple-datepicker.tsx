import { useState } from 'react';
import { View } from 'react-native';
import { Calendar, DateType } from '../ui/calendar';
import { DateInput } from '../date-input';
import dayjs from 'dayjs';

export default function MultipleDatePicker() {
  const [dates, setDates] = useState<DateType[]>();

  const selectedDates = dates
    ?.map((date) => dayjs(date).format('MMM DD, YYYY'))
    .join(' - ');

  return (
    <View className="flex-1 gap-4">
      <Calendar
        mode="multiple"
        dates={dates}
        onChange={({ dates }) => setDates(dates)}
      />
      <DateInput value={selectedDates || null} placeholder="Pick some dates" />
    </View>
  );
}
