![react-native-ui-datepicker](https://user-images.githubusercontent.com/7857656/227187674-93012672-495d-4955-b4d3-46c3d016684e.jpg)

---

# react-native-ui-datepicker

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

## DateTimePicker Props

| Property                     |           Type           | Description                       |           Default           |
| ---------------------------- | :----------------------: | :-------------------------------- | :-------------------------: |


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
