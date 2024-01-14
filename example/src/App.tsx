import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  Linking,
  SafeAreaView,
} from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/de';
import 'dayjs/locale/es';
import 'dayjs/locale/fr';
import 'dayjs/locale/tr';

interface ITheme {
  mainColor: string;
  activeTextColor: string;
}

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

const Locales = ['en', 'de', 'es', 'fr', 'tr'];

export default function App() {
  // const [value, setValue] = useState<DateType >(dayjs());
  const [theme, setTheme] = useState<ITheme | undefined>(Themes[0]);
  const [locale, setLocale] = useState('en');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>React Native UI DatePicker</Text>
        </View>
        <View style={styles.themeContainer}>
          {Themes.map((item, index) => (
            <Pressable
              key={index}
              style={[
                styles.themeButton,
                {
                  borderColor: item.activeTextColor,
                  backgroundColor: item.mainColor,
                },
              ]}
              onPress={() => setTheme(item)}
              accessibilityRole="button"
              accessibilityLabel="Set Active Theme"
            />
          ))}
        </View>
        <View style={styles.localeContainer}>
          {Locales.map((item, index) => (
            <Pressable
              key={index}
              style={[
                styles.localeButton,
                item === locale && {
                  backgroundColor: theme?.mainColor,
                },
              ]}
              onPress={() => setLocale(item)}
              accessibilityRole="button"
              accessibilityLabel={item.toUpperCase()}
            >
              <Text
                style={[
                  styles.localeButtonText,
                  // eslint-disable-next-line react-native/no-inline-styles
                  item === locale && {
                    fontWeight: 'bold',
                    color: theme?.activeTextColor,
                  },
                ]}
              >
                {item.toUpperCase()}
              </Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.datePickerContainer}>
          <View style={styles.datePicker}>
            <DateTimePicker
              value={dayjs()}
              //minimumDate={dayjs().startOf('day')}
              //maximumDate={dayjs().add(3, 'day').endOf('day')}
              //firstDayOfWeek={1}
              headerButtonsPosition="right"
              displayFullDays={true}
              locale={locale}
              onValueChange={(date) => {
                console.log('date range', date);
                // setValue(date);
              }}
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
              mode="datetime"
            />
            {/* <View style={styles.footerContainer}>
              <Text>
                {dayjs(value).locale(locale).format('MMMM, DD, YYYY - HH:mm')}
              </Text>
              <Pressable
                onPress={() => {
                  setValue(dayjs());
                }}
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
            </View> */}
          </View>
        </View>
        <View style={styles.githubContainer}>
          <Pressable
            style={styles.githubLink}
            onPress={() =>
              Linking.openURL(
                'https://github.com/farhoudshapouran/react-native-ui-datepicker'
              )
            }
            accessibilityRole="button"
            accessibilityLabel="Check repository on GitHub"
          >
            <Image
              source={require('../assets/github-logo.png')}
              style={styles.githubLogo}
            />
            <Text style={styles.githubText}>Check repository on GitHub</Text>
          </Pressable>
        </View>
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
  themeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,
    width: 330,
  },
  themeButton: {
    borderWidth: 4,
    width: 32,
    height: 32,
    borderRadius: 32,
    margin: 5,
    shadowRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 0 },
  },
  localeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  localeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    borderRadius: 36,
    margin: 2,
  },
  localeButtonText: {
    fontSize: 15,
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
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  todayButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  todayButtonText: {
    fontWeight: 'bold',
  },
  githubContainer: {
    paddingVertical: 20,
  },
  githubLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  githubLogo: {
    width: 22,
    height: 22,
  },
  githubText: {
    marginLeft: 8,
  },
});
