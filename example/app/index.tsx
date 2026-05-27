import { useCallback, useMemo, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import 'dayjs/locale/en';
import 'dayjs/locale/es';
import 'dayjs/locale/fa';
import 'dayjs/locale/fr';
import 'dayjs/locale/tr';
import DateTimePicker, {
  CalendarMode,
  DateType,
  useDefaultStyles,
} from 'react-native-ui-datepicker';

const modes: CalendarMode[] = ['single', 'range', 'multiple'];
const locales = ['en', 'de', 'es', 'fr', 'tr', 'fa'];

type Theme = {
  mainColor: string;
  activeTextColor: string;
};

const themes: Theme[] = [
  { mainColor: '#0047ff', activeTextColor: '#fff' },
  { mainColor: '#00d27a', activeTextColor: '#fff' },
  { mainColor: '#f5803e', activeTextColor: '#fff' },
  { mainColor: '#e63757', activeTextColor: '#fff' },
  { mainColor: '#d8e3ff', activeTextColor: '#0047ff' },
  { mainColor: '#ccf6e4', activeTextColor: '#00864e' },
  { mainColor: '#fde6d8', activeTextColor: '#9d5228' },
  { mainColor: '#fad7dd', activeTextColor: '#932338' },
];

export default function MainPage() {
  const defaultStyles = useDefaultStyles('light');
  const [mode, setMode] = useState<CalendarMode>('single');
  const [timePicker, setTimePicker] = useState(false);
  const [date, setDate] = useState<DateType>();
  const [dates, setDates] = useState<DateType[]>();
  const [range, setRange] = useState<{
    startDate: DateType;
    endDate: DateType;
  }>({ startDate: undefined, endDate: undefined });
  const [theme, setTheme] = useState<Theme>(themes[0]);
  const [locale, setLocale] = useState('en');

  const pickerStyles = useMemo(
    () => ({
      ...defaultStyles,
      button_next_image: {
        tintColor: theme.mainColor,
      },
      button_prev_image: {
        tintColor: theme.mainColor,
      },
      month_selector_label: {
        ...defaultStyles.month_selector_label,
        color: theme.mainColor,
      },
      year_selector_label: {
        ...defaultStyles.year_selector_label,
        color: theme.mainColor,
      },
      time_selector_label: {
        ...defaultStyles.time_selector_label,
        color: theme.mainColor,
      },
      selected: {
        ...defaultStyles.selected,
        backgroundColor: theme.mainColor,
      },
      selected_label: {
        ...defaultStyles.selected_label,
        color: theme.activeTextColor,
      },
      range_start: {
        ...defaultStyles.range_start,
        backgroundColor: theme.mainColor,
      },
      range_start_label: {
        ...defaultStyles.range_start_label,
        color: theme.activeTextColor,
      },
      range_end: {
        ...defaultStyles.range_end,
        backgroundColor: theme.mainColor,
      },
      range_end_label: {
        ...defaultStyles.range_end_label,
        color: theme.activeTextColor,
      },
      range_fill: {
        ...defaultStyles.range_fill,
        backgroundColor: `${theme.mainColor}33`,
      },
      today: {
        ...defaultStyles.today,
        borderColor: theme.mainColor,
        borderWidth: 1,
      },
      today_label: {
        ...defaultStyles.today_label,
        color: theme.mainColor,
      },
      selected_month: {
        ...defaultStyles.selected_month,
        backgroundColor: theme.mainColor,
        borderColor: theme.mainColor,
      },
      selected_month_label: {
        ...defaultStyles.selected_month_label,
        color: theme.activeTextColor,
      },
      selected_year: {
        ...defaultStyles.selected_year,
        backgroundColor: theme.mainColor,
        borderColor: theme.mainColor,
      },
      selected_year_label: {
        ...defaultStyles.selected_year_label,
        color: theme.activeTextColor,
      },
      active_year: {
        ...defaultStyles.active_year,
        backgroundColor: `${theme.mainColor}33`,
        borderColor: theme.mainColor,
      },
      active_year_label: {
        ...defaultStyles.active_year_label,
        color: theme.mainColor,
      },
    }),
    [defaultStyles, theme]
  );

  const onChangeMode = useCallback((nextMode: CalendarMode) => {
    setDate(undefined);
    setDates(undefined);
    setRange({ startDate: undefined, endDate: undefined });
    setMode(nextMode);
  }, []);

  const onChange = useCallback(
    (params: any) => {
      if (mode === 'single') {
        setDate(params.date);
      } else if (mode === 'range') {
        setRange({
          startDate: params.startDate,
          endDate: params.endDate,
        });
      } else {
        setDates(params.dates);
      }
    },
    [mode]
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>React Native UI DatePicker</Text>

        <View style={styles.themeContainer}>
          {themes.map((item) => (
            <Pressable
              key={item.mainColor}
              onPress={() => setTheme(item)}
              accessibilityRole="button"
              accessibilityLabel="Set active theme"
              style={[
                styles.themeButton,
                {
                  backgroundColor: item.mainColor,
                  borderColor: item.activeTextColor,
                },
                theme.mainColor === item.mainColor && styles.activeThemeButton,
              ]}
            />
          ))}
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Locale:</Text>
          {locales.map((item) => (
            <Pressable
              key={item}
              onPress={() => setLocale(item)}
              accessibilityRole="button"
              accessibilityLabel={item.toUpperCase()}
              style={[
                styles.circleButton,
                locale === item && { backgroundColor: theme.mainColor },
              ]}
            >
              <Text
                style={[
                  styles.localeText,
                  locale === item && { color: theme.activeTextColor },
                ]}
              >
                {item.toUpperCase()}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Mode:</Text>
          {modes.map((item) => (
            <Pressable
              key={item}
              onPress={() => onChangeMode(item)}
              style={[
                styles.button,
                mode === item && { backgroundColor: theme.mainColor },
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  mode === item && { color: theme.activeTextColor },
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          onPress={() => setTimePicker((value) => !value)}
          style={[
            styles.toggleButton,
            timePicker && { backgroundColor: theme.mainColor },
            mode !== 'single' && styles.disabledButton,
          ]}
          disabled={mode !== 'single'}
        >
          <Text
            style={[
              styles.buttonText,
              timePicker && { color: theme.activeTextColor },
              mode !== 'single' && styles.disabledButtonText,
            ]}
          >
            Time Picker {mode !== 'single' ? '(single mode only)' : ''}
          </Text>
        </Pressable>

        <View style={styles.pickerContainer}>
          <DateTimePicker
            mode={mode}
            calendar={locale === 'fa' ? 'jalali' : 'gregory'}
            locale={locale}
            date={date}
            dates={dates}
            startDate={range.startDate}
            endDate={range.endDate}
            onChange={onChange}
            timePicker={timePicker}
            showOutsideDays
            styles={pickerStyles}
          />
        </View>

        <View style={styles.selectionContainer}>
          {mode === 'single' ? (
            <Text>
              Selected:{' '}
              {date
                ? dayjs(date)
                    .locale(locale)
                    .format(timePicker ? 'MMMM D, YYYY HH:mm' : 'MMMM D, YYYY')
                : '...'}
            </Text>
          ) : mode === 'range' ? (
            <>
              <Text>
                Start:{' '}
                {range.startDate
                  ? dayjs(range.startDate).locale(locale).format('MMMM D, YYYY')
                  : '...'}
              </Text>
              <Text>
                End:{' '}
                {range.endDate
                  ? dayjs(range.endDate).locale(locale).format('MMMM D, YYYY')
                  : '...'}
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.selectionTitle}>Selected dates:</Text>
              {dates?.length ? (
                dates.map((selectedDate, index) => (
                  <Text key={`${selectedDate}-${index}`}>
                    {dayjs(selectedDate).locale(locale).format('MMMM D, YYYY')}
                  </Text>
                ))
              ) : (
                <Text>...</Text>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcff',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  themeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  themeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 4,
    margin: 5,
  },
  activeThemeButton: {
    transform: [{ scale: 1.15 }],
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 12,
  },
  label: {
    marginRight: 8,
  },
  button: {
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 8,
    margin: 4,
    backgroundColor: '#eef2ff',
  },
  circleButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
    backgroundColor: '#eef2ff',
  },
  localeText: {
    color: '#1f2937',
    fontSize: 13,
    fontWeight: '600',
  },
  buttonText: {
    color: '#1f2937',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  toggleButton: {
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 18,
    backgroundColor: '#eef2ff',
  },
  disabledButton: {
    backgroundColor: '#e5e7eb',
  },
  disabledButtonText: {
    color: '#9ca3af',
  },
  pickerContainer: {
    width: 340,
    borderRadius: 16,
    backgroundColor: '#fff',
    padding: 12,
  },
  selectionContainer: {
    width: 340,
    marginTop: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 12,
  },
  selectionTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
});
