![react-native-ui-datepicker](https://user-images.githubusercontent.com/7857656/227187674-93012672-495d-4955-b4d3-46c3d016684e.jpg)

---

# react-native-ui-datepicker
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

A UI DatePicker component for React Native that allows you creating customizable date and time picker. The component use [Day.js](https://day.js.org/) library and it contains a set of styles props that allows you change every items of calendar based on your own ui design.

## Installation

```sh
npm install react-native-ui-datepicker
```

Or

```sh
yarn add react-native-ui-datepicker
```

## Usage

```js
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

export default function App() {
  const [value, setValue] = useState(dayjs());
  
  return (
    <View style={styles.container}>
      <DateTimePicker
        value={value}
        onValueChange={(date) => setValue(date)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
```

For more, take a look at the `/example` directory.

## Available props

| Name                     | Type            |   Default       | Description                                                                            |
| ------------------------ | --------------- | --------------- | -------------------------------------------------------------------------------------- |
| value                    | `DateType`      | `Dayjs`         | DatePicker value to display selected date                                              |
| onValueChange            | `func`          | `() => {}`      | Called when the new date selected from DatePicker                                      |
| mode                     | `string`        | `'datetime'`    | Defines the DatePicker mode `['datetime', 'date', 'time']`                             |
| locale                   | `string`        | `'en'`          | Defines the DatePicker locale                                                          |
| minimumDate              | `DateType`      | `null`          | Defines DatePicker minimum selectable date                                             |
| maximumDate              | `DateType`      | `null`          | Defines DatePicker maximum selectable date                                             |
| displayFullDays          | `boolean`       | `false`         | Defines show prev and next month days in current calendar view                         |
| calendarTextStyle        | `TextStyle`     | `null`          | Defines all texts styles inside calendar (Days, Months, Years, Hours and Minutes)      |
| selectedTextStyle        | `TextStyle`     | `null`          | Defines selected (Day, Month, Year) text styles                                        |
| selectedItemColor        | `string`        | `'#0047FF'`     | Defines selected (Day, Month, Year) background and border colors                       |
| headerContainerStyle     | `ViewStyle`     | `null`          | Defines calendar header container style                                                |
| headerTextContainerStyle | `ViewStyle`     | `null`          | Defines calendar header texts (Month, Year, Time) containers style                     |
| headerTextStyle          | `ViewStyle`     | `null`          | Defines calendar header texts styles (Month, Year, Time)                               |
| headerButtonStyle        | `ViewStyle`     | `null`          | Defines calendar header "prev and next buttons" containers style                       |
| headerButtonColor        | `string`        | `null`          | Defines calendar header "prev and next buttons" icon color                             |
| headerButtonSize         | `number`        | `18`            | Defines calendar header "prev and next buttons" icon size                              |
| headerButtonsPosition    | `string`        | `'around'`      | Defines calendar header "prev and next buttons" positions `['around', 'right', 'left']`|
| dayContainerStyle        | `ViewStyle`     | `null`          | Defines days containers style  |
| monthContainerStyle      | `ViewStyle`     | `null`          | Defines months containers style  |
| yearContainerStyle       | `ViewStyle`     | `null`          | Defines years containers style  |
| weekDaysContainerStyle   | `ViewStyle`     | `null`          | Defines weekdays container style  |
| weekDaysTextStyle        | `TextStyle`     | `null`          | Defines weekdays texts style  |
| timePickerContainerStyle | `ViewStyle`     | `null`          | Defines time picker container style  |
| timePickerTextStyle      | `TextStyle`     | `null`          | Defines time picker (Hours, Minutes) texts style  |


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
