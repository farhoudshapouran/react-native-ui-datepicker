import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import ThemeSelector, { ITheme } from './components/ThemeSelector';
import LocaleSelector from './components/LocaleSelector';
import GithubLink from './components/GithubLink';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import DateTimePicker, { DateType, ModeType } from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/de';
import 'dayjs/locale/es';
import 'dayjs/locale/fr';
import 'dayjs/locale/tr';

const Themes: ITheme[] = [
  { mainColor: '#0047FF', activeTextColor: '#fff' },
  { mainColor: '#00D27A', activeTextColor: '#fff' },
  { mainColor: '#F5803E', activeTextColor: '#fff' },
  { mainColor: '#E63757', activeTextColor: '#fff' },
  { mainColor: '#D8E3FF', activeTextColor: '#0047FF' },
  { mainColor: '#CCF6E4', activeTextColor: '#00864E' },
  { mainColor: '#FDE6D8', activeTextColor: '#9D5228' },
  { mainColor: '#FAD7DD', activeTextColor: '#932338' },
];

export default function App() {
  const [mode, setMode] = useState<ModeType>('single');
  const [timePicker, setTimePicker] = useState(false);

  const [date, setDate] = useState<DateType | undefined>();
  const [range, setRange] = React.useState<{
    startDate: DateType;
    endDate: DateType;
  }>({ startDate: undefined, endDate: undefined });
  const [dates, setDates] = useState<DateType[] | undefined>();

  const [theme, setTheme] = useState<ITheme | undefined>(Themes[0]);
  const [locale, setLocale] = useState('en');

  const onChangeMode = useCallback(
    (value: ModeType) => {
      setDate(undefined);
      setRange({ startDate: undefined, endDate: undefined });
      setDates(undefined);
      setMode(value);
    },
    [setMode, setDate, setRange, setDates]
  );

  const onChange = useCallback(
    (params) => {
      if (mode === 'single') {
        setDate(params.date);
      } else if (mode === 'range') {
        setRange(params);
      } else if (mode === 'multiple') {
        setDates(params.dates);
      }
    },
    [mode]
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>React Native UI DatePicker</Text>
        </View>

        <ThemeSelector themes={Themes} setTheme={setTheme} />

        <LocaleSelector
          locale={locale}
          setLocale={setLocale}
          mainColor={theme?.mainColor}
          activeTextColor={theme?.activeTextColor}
        />

        <View style={styles.modesContainer}>
          <Text
            style={{
              // eslint-disable-next-line react-native/no-inline-styles
              marginRight: 8,
            }}
          >
            Mode:
          </Text>
          <TouchableOpacity
            style={[
              styles.modeSelect,
              {
                // eslint-disable-next-line react-native/no-inline-styles
                backgroundColor:
                  mode === 'single' ? theme?.mainColor : undefined,
              },
            ]}
            onPress={() => onChangeMode('single')}
          >
            <Text
              style={[
                styles.modeSelectText,
                mode === 'single' && { color: theme?.activeTextColor },
              ]}
            >
              Single
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.modeSelect,
              // eslint-disable-next-line react-native/no-inline-styles
              {
                backgroundColor:
                  mode === 'range' ? theme?.mainColor : undefined,
              },
            ]}
            onPress={() => onChangeMode('range')}
          >
            <Text
              style={[
                styles.modeSelectText,
                mode === 'range' && { color: theme?.activeTextColor },
              ]}
            >
              Range
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.modeSelect,
              // eslint-disable-next-line react-native/no-inline-styles
              {
                backgroundColor:
                  mode === 'multiple' ? theme?.mainColor : undefined,
              },
            ]}
            onPress={() => onChangeMode('multiple')}
          >
            <Text
              style={[
                styles.modeSelectText,
                mode === 'multiple' && { color: theme?.activeTextColor },
              ]}
            >
              Multiple
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginBottom: 20,
          }}
        >
          <BouncyCheckbox
            size={20}
            text="Time Picker"
            fillColor={theme?.mainColor}
            textStyle={{
              fontSize: 14,
              color: '#000',
              marginLeft: -8,
              textDecorationLine: 'none',
            }}
            useNativeDriver={false}
            isChecked={timePicker}
            disableBuiltInState
            onPress={() => setTimePicker(!timePicker)}
            disabled={mode !== 'single'}
          />
          <Text style={{ fontSize: 13, color: 'gray' }}>
            (Works in Single mode)
          </Text>
        </View>
        <View style={styles.datePickerContainer}>
          <View style={styles.datePicker}>
            <DateTimePicker
              mode={mode}
              date={date}
              locale={locale}
              startDate={range.startDate}
              endDate={range.endDate}
              dates={dates}
              //disabledDays={{ sunday: true, saturday: true }}
              //minDate={dayjs().startOf('day')}
              //maxDate={dayjs().add(3, 'day').endOf('day')}
              //firstDayOfWeek={1}
              displayFullDays
              timePicker={timePicker}
              onChange={onChange}
              headerButtonColor={theme?.mainColor}
              selectedItemColor={theme?.mainColor}
              // eslint-disable-next-line react-native/no-inline-styles
              selectedTextStyle={{
                fontWeight: 'bold',
                color: theme?.activeTextColor,
              }}
              // eslint-disable-next-line react-native/no-inline-styles
              todayContainerStyle={{
                borderWidth: 1,
              }}
            />
            <View style={styles.footer}>
              {mode === 'single' ? (
                <View style={styles.footerContainer}>
                  <Text>
                    {date
                      ? dayjs(date)
                          .locale(locale)
                          .format(
                            timePicker
                              ? 'MMMM, DD, YYYY - HH:mm'
                              : 'MMMM, DD, YYYY'
                          )
                      : '...'}
                  </Text>
                  <Pressable
                    onPress={() => setDate(dayjs())}
                    accessibilityRole="button"
                    accessibilityLabel="Today"
                  >
                    <View
                      style={[
                        styles.todayButton,
                        { backgroundColor: theme?.mainColor },
                      ]}
                    >
                      <Text
                        style={[
                          styles.todayButtonText,
                          { color: theme?.activeTextColor },
                        ]}
                      >
                        Today
                      </Text>
                    </View>
                  </Pressable>
                </View>
              ) : mode === 'range' ? (
                <View style={{ gap: 3 }}>
                  <Text>
                    <Text style={{ marginRight: 5, fontWeight: 'bold' }}>
                      Start Date:
                    </Text>
                    {range.startDate
                      ? dayjs(range.startDate)
                          .locale(locale)
                          .format('MMMM, DD, YYYY')
                      : '...'}
                  </Text>
                  <Text>
                    <Text style={{ marginRight: 5, fontWeight: 'bold' }}>
                      End Date:
                    </Text>
                    {range.endDate
                      ? dayjs(range.endDate)
                          .locale(locale)
                          .format('MMMM, DD, YYYY')
                      : '...'}
                  </Text>
                </View>
              ) : mode === 'multiple' ? (
                <View style={{ gap: 3 }}>
                  <Text style={{ fontWeight: 'bold' }}>Selected Dates:</Text>
                  {dates &&
                    dates.map((d, index) => (
                      <Text key={index}>
                        {dayjs(d).locale(locale).format('MMMM, DD, YYYY')}
                      </Text>
                    ))}
                </View>
              ) : null}
            </View>
          </View>
        </View>

        <GithubLink />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  body: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
  },
  titleContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 20,
    width: '100%',
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  modesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 20,
  },
  modeSelect: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  modeSelectText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  datePickerContainer: {
    alignItems: 'center',
  },
  datePicker: {
    width: 330,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    shadowRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 0 },
  },
  footer: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginTop: 15,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todayButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  todayButtonText: {
    fontWeight: 'bold',
  },
});
