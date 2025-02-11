import { View } from 'react-native';
import DateTimePicker, {
  DateType,
  CalendarDay,
  getDefaultClassNames,
  getDefaultStyles,
} from 'react-native-ui-datepicker';

function Calendar(props: React.ComponentProps<typeof DateTimePicker>) {
  const classNames = getDefaultClassNames();

  return (
    <View className="border-muted bg-card shadow-muted w-[300] rounded-xl border p-3 shadow-lg dark:shadow-none">
      <DateTimePicker height={270} classNames={{ ...classNames }} {...props} />
    </View>
  );
}

export { Calendar };
