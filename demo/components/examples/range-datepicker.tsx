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
  const [date, setDate] = useState<DateType>();
  const [range, setRange] = useState<{
    startDate: DateType;
    endDate: DateType;
  }>({ startDate: undefined, endDate: undefined });
  const [dates, setDates] = useState<DateType[]>();

  const classNames = getDefaultClassNames();
  const styles = getDefaultStyles();

  const renderDay = useCallback(
    (day: CalendarDay) => <CustomDay day={day} />,
    []
  );

  return (
    <View className="gap-4">
      <Text className="text-foreground text-xl font-medium">
        Date Range Picker
      </Text>
      <View className="border-border/90 items-center rounded-lg border p-5">
        <Calendar
          mode="single"
          date={date}
          // startDate={range.startDate}
          // endDate={range.endDate}
          // dates={dates}
          onChange={({ date }) => setDate(date)}
          //onChange={(params) => setRange(params)}
          //onChange={({ dates }) => setDates(dates)}
          //height={400}
          //showOutsideDays
          //firstDayOfWeek={3}
          //disabledDates={(date) => [0, 6].includes(dayjs(date).day())} // disable weekends
          //styles={{ daysContainer: { backgroundColor: 'red' } }}
          // classNames={{
          //   day: cn(buttonVariants({ variant: 'ghost' })),
          //   dayText: cn(buttonTextVariants({ variant: 'ghost' }), 'font-normal'),
          //   //daysContainer: 'bg-purple-500',
          //   today: 'bg-accent',
          //   todayText: 'text-accent-foreground',
          //   selected: cn(buttonVariants({ variant: 'default' })),
          //   selectedText: cn(buttonTextVariants({ variant: 'default' })),
          //   outsideText: 'text-muted-foreground',
          //   disabledText: 'text-muted-foreground opacity-50',
          //   rangeMiddle: 'bg-accent',
          //   rangeMiddleText: 'text-accent-foreground',
          // }}
          //styles={{ ...styles }}
          //weekdays="short"
          //multiRangeMode
          //timePicker
          //headerButtonsPosition="right"

          //renderDay={renderDay}
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
