import { cn } from '@/lib/utils';
import { isEqual } from 'lodash';
import { memo, useMemo } from 'react';
import { View, Text } from 'react-native';
import { DayObject } from 'react-native-ui-datepicker';

const specialDates = ['2025-02-14', '2025-03-08', '2025-04-01'];

function toArabicNumbers(str: string): string {
  return str.replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]);
}

type Props = {
  day: DayObject;
};

export const CustomDay = ({ day }: Props) => {
  const { isSelected, isToday, isCurrentMonth } = day;
  const isSpecial = useMemo(() => specialDates.includes(day.date), [day.date]);

  return (
    <View className="flex items-center justify-center pb-2">
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
          'mb-2 h-16 w-8 items-center justify-between rounded-lg border py-2',
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
