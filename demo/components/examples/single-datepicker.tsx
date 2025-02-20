import { useState } from 'react';
import { View } from 'react-native';
import { Calendar, DateType } from '../ui/calendar';
import dayjs from 'dayjs';
import { DateInput } from '../date-input';

export default function SingleDatePicker() {
  const [date, setDate] = useState<DateType>();

  return (
    <View className="flex-1 gap-4">
      <Calendar
        mode="single"
        date={date}
        onChange={({ date }) => setDate(date)}
        timePicker
        // minDate={new Date()}
        // maxDate={new Date(new Date().getFullYear(), 11, 31)} // end of the year
      />
      <DateInput
        value={date ? dayjs(date).format('MMMM DD, YYYY HH:mm') : null}
        placeholder="Pick a date"
      />
    </View>
  );
}
