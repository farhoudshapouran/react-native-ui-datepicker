import { useCallback, useState } from 'react';
import { View, Text } from 'react-native';
import { Calendar, DateType } from '../ui/calendar';
import dayjs from 'dayjs';
import { Button } from '../ui/button';

export default function SingleDatePicker() {
  const [date, setDate] = useState<DateType>();
  const [month, setMonth] = useState<number>(0);

  console.log(month);

  return (
    <View className="gap-4">
      <Calendar
        mode="single"
        date={date}
        onChange={({ date }) => setDate(date)}
        currentMonth={month}
        setCurrentMonth={setMonth}
        timePicker
      />
      <Button onPress={() => setMonth(month + 1)}></Button>
      <Button onPress={() => setMonth(1)}></Button>
    </View>
  );
}
