import { useCallback, useRef, useState } from 'react';
import { Button, StyleSheet, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import DateTimePicker, {
  DateType,
  CalendarDay,
  CalendarComponents,
  useDefaultStyles,
} from 'react-native-ui-datepicker';

export default function BottomSheetScreen() {
  const defaultStyles = useDefaultStyles();
  const [date, setDate] = useState<DateType>();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [dates, setDates] = useState<DateType[]>();
  const [range, setRange] = useState<{
    startDate: DateType;
    endDate: DateType;
  }>({ startDate: undefined, endDate: undefined });

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <Button onPress={handlePresentModalPress} title="Present Modal" />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          onChange={handleSheetChanges}
        >
          <BottomSheetView style={styles.contentContainer}>
            <DateTimePicker
              styles={defaultStyles}
              mode="multiple"
              dates={dates}
              onChange={({ dates }) => setDates(dates)}
              firstDayOfWeek={1}
              multiRangeMode
            />
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 30,
    height: 400,
  },
});
