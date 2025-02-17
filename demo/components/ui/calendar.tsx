import { cn } from '@/lib/utils';
import DateTimePicker, {
  DateType,
  CalendarDay,
  CalendarComponents,
  getDefaultClassNames,
} from 'react-native-ui-datepicker';
import Feather from '@expo/vector-icons/Feather';
import { cssInterop } from 'nativewind';

cssInterop(Feather, {
  className: {
    target: 'style',
  },
});

const icons: CalendarComponents = {
  IconPrev: (
    <Feather name="chevron-left" size={20} className="text-foreground" />
  ),
  IconNext: (
    <Feather name="chevron-right" size={20} className="text-foreground" />
  ),
};

export type CalendarProps = React.ComponentProps<typeof DateTimePicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  containerHeight = 280,
  components,
  ...props
}: React.ComponentProps<typeof DateTimePicker>) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DateTimePicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'border-muted bg-card shadow-muted w-[310] rounded-xl border p-3 shadow-lg dark:shadow-none',
        className
      )}
      containerHeight={containerHeight}
      classNames={{
        ...defaultClassNames,
        day_cell: 'p-1',
        day: cn(defaultClassNames.day, 'rounded-lg'),
        outside_label: 'opacity-50',
        month_selector_label: cn(
          defaultClassNames.month_selector_label,
          'text-base font-medium'
        ),
        year_selector_label: cn(
          defaultClassNames.year_selector_label,
          'text-base font-medium'
        ),
        time_selector_label: cn(
          defaultClassNames.time_selector_label,
          'text-base font-medium'
        ),
        range_end_label: cn(
          defaultClassNames.range_end_label,
          'text-primary-foreground opacity-100'
        ),
        range_start_label: cn(
          defaultClassNames.range_start_label,
          'text-primary-foreground opacity-100'
        ),
        range_fill: 'bg-accent my-0.5',
        range_fill_weekstart: 'rounded-s-md',
        range_fill_weekend: 'rounded-e-md',
        range_middle_label: 'text-accent-foreground',
        time_label: 'text-2xl font-medium text-foreground',
        month: cn(defaultClassNames.month, 'rounded-lg'),
        year: cn(defaultClassNames.year, 'rounded-lg'),
        ...classNames,
      }}
      components={{
        ...icons,
        ...components,
      }}
      {...props}
    />
  );
}

export { Calendar, DateType, CalendarDay };
