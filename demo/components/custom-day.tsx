import { cn } from '@/lib/utils';
import { useMemo } from 'react';
import { View, Text } from 'react-native';
import { CalendarDay } from 'react-native-ui-datepicker';

const specialDates = ['2025-02-14', '2025-03-08', '2025-04-01'];

function toArabicNumbers(str: string): string {
  return str.replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]);
}

type Props = {
  day: CalendarDay;
};

export const CustomDay = ({ day }: Props) => {
  const { isSelected, isToday, isCurrentMonth } = day;
  const isSpecial = useMemo(() => specialDates.includes(day.date), [day.date]);

  return (
    <View className="flex w-full items-center justify-center">
      <View
        // style={{
        //   height: 50,
        //   width: '80%',
        //   alignItems: 'center',
        //   justifyContent: 'space-between',
        //   paddingVertical: 6,
        //   borderWidth: 1,
        //   backgroundColor: isSelected
        //     ? 'blue'
        //     : isSpecial
        //       ? 'gold'
        //       : 'transparent',
        //   borderRadius: isSpecial ? 10 : 5, // Add rounded corners for special dates
        // }}
        className={cn(
          'h-12 w-full items-center justify-between rounded-lg border py-2',
          isSelected && 'bg-red-500'
        )}
      >
        <Text
          className={cn('font-normal', isSelected && 'text-primary-foreground')}
        >
          {day.text}
        </Text>
        <Text>{isSpecial ? '🎉' : '😍'}</Text>
      </View>
    </View>
  );
};
