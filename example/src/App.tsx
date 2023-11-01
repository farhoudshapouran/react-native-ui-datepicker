import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import 'dayjs/locale/en';

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

export default function App() {
  const [value, setValue] = useState<DateType>(dayjs());
  const [theme, setTheme] = useState<ITheme | undefined>(Themes[0]);
  const locale = 'en';

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>React Native UI DatePicker</Text>
      </View>
      <View style={styles.themeContainer}>
        {Themes.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.themeButton,
              {
                borderColor: item.activeTextColor,
                backgroundColor: item.mainColor,
              },
            ]}
            onPress={() => setTheme(item)}
          />
        ))}
      </View>
      <View style={styles.datePickerContainer}>
        <View style={styles.datePicker}>
          <DateTimePicker
            value={value}
            //minimumDate={dayjs().startOf('day')}
            //maximumDate={dayjs().add(3, 'day').endOf('day')}
            displayFullDays={true}
            locale={locale}
            onValueChange={(date) => setValue(date)}
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
          <View style={styles.footerContainer}>
            <Text>
              {dayjs(value).locale(locale).format('MMMM, DD, YYYY - HH:mm')}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setValue(dayjs());
              }}
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
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.githubContainer}>
        <TouchableOpacity
          style={styles.githubLink}
          onPress={() =>
            Linking.openURL(
              'https://github.com/farhoudshapouran/react-native-ui-datepicker'
            )
          }
        >
          <Image
            source={require('../assets/github-logo.png')}
            style={styles.githubLogo}
          />
          <Text style={styles.githubText}>Check repository on GitHub</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
  },
  titleContainer: {
    paddingTop: 100,
    paddingBottom: 30,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 30,
    shadowRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 0 },
    width: '100%',
  },
  title: { fontSize: 20, fontWeight: 'bold' },
  themeContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 30,
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
    paddingVertical: 25,
  },
  githubLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  githubLogo: {
    width: 24,
    height: 24,
  },
  githubText: {
    marginLeft: 8,
  },
});
