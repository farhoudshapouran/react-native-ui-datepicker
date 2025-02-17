import { useState } from 'react';
import { View } from 'react-native';
import { Calendar, DateType } from '../ui/calendar';
import dayjs from 'dayjs';
import { DateInput } from '../date-input';

export default function RangeDatePicker() {
  const [range, setRange] = useState<{
    startDate: DateType;
    endDate: DateType;
  }>({ startDate: undefined, endDate: undefined });

  const from = range.startDate
    ? dayjs(range.startDate).format('MMM DD, YYYY')
    : '';
  const to = range.endDate ? dayjs(range.endDate).format('MMM DD, YYYY') : '';

  return (
    <View className="flex-1 gap-4">
      <Calendar
        mode="range"
        startDate={range.startDate}
        endDate={range.endDate}
        onChange={(params) => setRange(params)}
      />
      <DateInput
        value={from || to ? `${from} - ${to}` : null}
        placeholder="Pick a range"
      />
    </View>
  );
}
