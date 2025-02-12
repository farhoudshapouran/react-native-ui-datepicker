import { useCallback, useState } from 'react';
import { View, Text } from 'react-native';
import { Calendar, DateType } from '../ui/calendar';
import dayjs from 'dayjs';

export default function SingleDatePicker() {
  const [date, setDate] = useState<DateType>();

  return (
    <View className="gap-4">
      <Calendar
        mode="single"
        date={date}
        onChange={({ date }) => setDate(date)}
      />
    </View>
  );
}
