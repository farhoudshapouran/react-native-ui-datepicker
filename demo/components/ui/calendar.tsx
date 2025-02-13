import { View, Text } from 'react-native';
import DateTimePicker, {
  DateType,
  CalendarDay,
  getDefaultClassNames,
  getDefaultStyles,
} from 'react-native-ui-datepicker';

function Calendar(props: React.ComponentProps<typeof DateTimePicker>) {
  const defaultClassNames = getDefaultClassNames();
  const defaultStyles = getDefaultStyles();

  return (
    <View className="border-muted bg-card shadow-muted w-[330] rounded-xl border p-3 shadow-lg dark:shadow-none">
      <DateTimePicker
        classNames={{
          ...defaultClassNames,
          header: 'px-2',
          day_cell: 'p-0.5',
          range_fill: 'bg-accent',
          range_middle_label: 'text-accent-foreground',
          time_label: 'text-2xl font-medium',
        }}
        //weekdaysFormat="short"
        //showOutsideDays
        //styles={{ ...defaultStyles }}
        navigationPosition="right"
        monthCaptionFormat="short"
        timePicker
        // components={{
        //   Month: (month) => (
        //     <View className="h-full bg-slate-600">
        //       <Text>{month.name}</Text>
        //     </View>
        //   ),
        //   Year: (year) => (
        //     <View className="h-full w-full bg-slate-600">
        //       <Text>{year.number}</Text>
        //     </View>
        //   ),
        // }}
        {...props}
      />
    </View>
  );
}

export { Calendar, DateType, CalendarDay };
