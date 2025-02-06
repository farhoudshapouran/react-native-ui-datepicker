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
  const isSpecial = specialDates.includes(day.date);

  return (
    <View style={{ alignItems: 'center' }}>
      <View
        style={{
          height: 50,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 6,
          borderWidth: 1,
          backgroundColor: isSelected
            ? 'blue'
            : isSpecial
            ? 'gold'
            : 'transparent',
          borderRadius: isSpecial ? 10 : 5, // Add rounded corners for special dates
        }}
      >
        <Text style={{ fontWeight: isSpecial ? 'bold' : 'normal' }}>
          {day.text}
        </Text>
        <Text>{isSpecial ? '🎉' : '😍'}</Text>
      </View>
    </View>
  );
};
