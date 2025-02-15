import { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text } from 'react-native';
import { Calendar, DateType } from '../ui/calendar';
import dayjs from 'dayjs';
import { Button } from '../ui/button';

export default function SingleDatePicker() {
  const [date, setDate] = useState<DateType>();
  const [month, setMonth] = useState<number>(5);
  const [year, setYear] = useState<number>(2000);

  return (
    <View className="flex-1 gap-4">
      <Calendar
        mode="single"
        date={date}
        onChange={({ date }) => setDate(date)}
        // month={month}
        // onMonthChange={setMonth}
        // year={year}
        // onYearChange={setYear}
        timePicker
        //locale="fa"
        // weekdaysFormat="full"
        // firstDayOfWeek={5}
        timezone="Pacific/Kiritimati"
        // minDate={dayjs().add(-3, 'day')}
        // maxDate={dayjs().add(3, 'day')}
      />
      <Button onPress={() => setYear(2026)}>
        <Text className="text-primary-foreground">2026</Text>
      </Button>
      <Button onPress={() => setYear(1984)}>
        <Text className="text-primary-foreground">1984</Text>
      </Button>
      <View className="flex-row flex-wrap gap-3">
        <Button onPress={() => setMonth(0)}>
          <Text className="text-primary-foreground">0</Text>
        </Button>
        <Button onPress={() => setMonth(1)}>
          <Text className="text-primary-foreground">1</Text>
        </Button>
        <Button onPress={() => setMonth(2)}>
          <Text className="text-primary-foreground">2</Text>
        </Button>
        <Button onPress={() => setMonth(3)}>
          <Text className="text-primary-foreground">3</Text>
        </Button>
        <Button onPress={() => setMonth(4)}>
          <Text className="text-primary-foreground">4</Text>
        </Button>
        <Button onPress={() => setMonth(5)}>
          <Text className="text-primary-foreground">5</Text>
        </Button>
        <Button onPress={() => setMonth(6)}>
          <Text className="text-primary-foreground">6</Text>
        </Button>
        <Button onPress={() => setMonth(7)}>
          <Text className="text-primary-foreground">7</Text>
        </Button>
        <Button onPress={() => setMonth(8)}>
          <Text className="text-primary-foreground">8</Text>
        </Button>
        <Button onPress={() => setMonth(9)}>
          <Text className="text-primary-foreground">9</Text>
        </Button>
        <Button onPress={() => setMonth(10)}>
          <Text className="text-primary-foreground">10</Text>
        </Button>
        <Button onPress={() => setMonth(11)}>
          <Text className="text-primary-foreground">11</Text>
        </Button>
      </View>
    </View>
  );
}
