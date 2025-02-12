import { View } from 'react-native';
import DateTimePicker, {
  DateType,
  CalendarDay,
  getDefaultClassNames,
} from 'react-native-ui-datepicker';

function Calendar(props: React.ComponentProps<typeof DateTimePicker>) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <View className="border-muted bg-card shadow-muted w-[330] rounded-xl border p-3 shadow-lg dark:shadow-none">
      <DateTimePicker
        classNames={{
          ...defaultClassNames,
          day_cell: 'p-0.5',
          range_fill: 'bg-accent',
          range_middle_label: 'text-accent-foreground',
        }}
        //showOutsideDays
        {...props}
      />
    </View>
  );
}

export { Calendar, DateType, CalendarDay };
