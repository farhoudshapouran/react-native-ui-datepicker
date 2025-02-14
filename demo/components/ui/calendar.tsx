import { cn } from '@/lib/utils';
import DateTimePicker, {
  DateType,
  CalendarDay,
  CalendarComponents,
  getDefaultClassNames,
  getDefaultStyles,
} from 'react-native-ui-datepicker';
import Feather from '@expo/vector-icons/Feather';
import { cssInterop } from 'nativewind';

cssInterop(Feather, {
  className: {
    target: 'style',
  },
});

const icons: CalendarComponents = {
  IconPrev: <Feather name="moon" size={14} className="text-foreground" />,
  IconNext: <Feather name="sun" size={14} className="text-foreground" />,
};

export type CalendarProps = React.ComponentProps<typeof DateTimePicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  components,
  ...props
}: React.ComponentProps<typeof DateTimePicker>) {
  const defaultClassNames = getDefaultClassNames();
  const defaultStyles = getDefaultStyles();

  return (
    <DateTimePicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'border-muted bg-card shadow-muted w-[330] rounded-xl border p-3 shadow-lg dark:shadow-none',
        className
      )}
      classNames={{
        ...defaultClassNames,
        header: 'px-2',
        day_cell: 'p-0.5',
        range_fill: 'bg-accent',
        range_middle_label: 'text-accent-foreground',
        time_label: 'text-2xl font-medium text-foreground',
        ...classNames,
      }}
      //weekdaysFormat="short"

      // styles={{ ...defaultStyles, root: { width: 330 } }}
      // navigationPosition="right"
      // monthCaptionFormat="short"
      // timePicker
      components={{
        ...icons,
        ...components,
        // Month: (month) => (
        //   <View className="h-full bg-slate-600">
        //     <Text>{month.name}</Text>
        //   </View>
        // ),
        // Year: (year) => (
        //   <View className="h-full w-full bg-slate-600">
        //     <Text>{year.number}</Text>
        //   </View>
        // ),
      }}
      {...props}
    />
  );
}

export { Calendar, DateType, CalendarDay };
