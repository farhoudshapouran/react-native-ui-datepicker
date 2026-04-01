import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

export default function MultiMonthScreen() {
  const defaultStyles = useDefaultStyles();
  const [range, setRange] = useState<{
    startDate: DateType;
    endDate: DateType;
  }>({ startDate: undefined, endDate: undefined });

  return (
    <View style={styles.container}>
      <View style={styles.selectionInfo}>
        <Text style={styles.infoText}>
          {range.startDate
            ? `Start: ${dayjs(range.startDate as Date).format('DD MMM YYYY')}`
            : 'Select start date'}
        </Text>
        <Text style={styles.separator}>→</Text>
        <Text style={styles.infoText}>
          {range.endDate
            ? `End: ${dayjs(range.endDate as Date).format('DD MMM YYYY')}`
            : 'Select end date'}
        </Text>
      </View>

      <DateTimePicker
        mode="range"
        multiMonth
        styles={defaultStyles}
        startDate={range.startDate}
        endDate={range.endDate}
        onChange={({ startDate, endDate }) =>
          setRange({ startDate, endDate })
        }
        minDate="2025-01-01"
        maxDate="2026-12-31"
        locale="en"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  selectionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
  },
  separator: {
    fontSize: 14,
    color: '#999',
  },
});
