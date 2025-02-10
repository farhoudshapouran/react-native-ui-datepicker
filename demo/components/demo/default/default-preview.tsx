import { useCallback, useState } from 'react';
import { View, Text } from 'react-native';
import DateTimePicker, {
  DateType,
  DayObject,
  getDefaultClassNames,
  getDefaultStyles,
} from 'react-native-ui-datepicker';
import { buttonVariants, buttonTextVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import { CustomDay } from '@/components/custom-day';

export function DefaultPreview() {
  const [date, setDate] = useState<DateType>();
  const [range, setRange] = useState<{
    startDate: DateType;
    endDate: DateType;
  }>({ startDate: undefined, endDate: undefined });
  const [dates, setDates] = useState<DateType[]>();

  const classNames = getDefaultClassNames();

  const renderDay = useCallback(
    (day: DayObject) => <CustomDay day={day} />,
    []
  );

  return (
    <View className="border-muted bg-card w-full rounded-xl border p-3 pb-8 shadow-lg shadow-slate-200">
      <DateTimePicker
        mode="range"
        date={date}
        startDate={range.startDate}
        endDate={range.endDate}
        dates={dates}
        //onChange={({ date }) => setDate(date)}
        onChange={(params) => setRange(params)}
        //onChange={({ dates }) => setDates(dates)}
        //height={400}
        displayFullDays
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
        styles={{ range_line: { top: 4, bottom: 4 } }}
        classNames={{
          ...classNames,
          day_wrapper: 'p-0.5 border-b py-1 border-border',
          weekday_label: 'text-sm uppercase',
          range_line: 'bg-red-200',
          range_line_weekstart: 'rounded-s-full',
          range_line_weekend: 'rounded-e-full',
          //selected: 'bg-red-500',
          //time_label: 'text-2xl text-red-500',
          // day: cn(
          //   buttonVariants({ variant: 'ghost' }),
          //   'native:px-0 native:py-0 native:h-11'
          // ),
          // day_label: cn(
          //   buttonTextVariants({ variant: 'ghost' }),
          //   'font-normal'
          // ),
          // selected: cn(
          //   buttonVariants({ variant: 'default' }),
          //   'native:px-0 native:py-0'
          // ),
          //weekdays: 'border-b mb-2 bg-secondary',
          //today: 'border',
          //year_selector_label: 'text-xl',
          // rangeStart: 'rounded-s-full',
          // rangeEnd: 'rounded-e-full',
        }}
        // styles={{
        //   ...getDefaultStyles('light'),
        // }}
        weekdays="short"
        //multiRangeMode
        timePicker
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
  );
}
