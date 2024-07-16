import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import DateTimePicker from '../DateTimePicker';
//import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/de';
import 'dayjs/locale/es';
import 'dayjs/locale/fr';
import 'dayjs/locale/tr';

describe('API TESTS', () => {
  test('should display the passed date', () => {
    const selectedDate = new Date(2020, 11, 19);
    const month = selectedDate.toLocaleString('en-US', { month: 'long' });

    render(<DateTimePicker mode="single" date={selectedDate} />);
    expect(screen.getByText(month)).toBeVisible();
    expect(screen.getByText('19')).toBeVisible();
    expect(screen.getByText('2020')).toBeVisible();
  });

  test('should not allow disabled weekdays to be selected', () => {
    const selectedDate = new Date(2020, 11, 15); // Start with Tuesday
    const changeFn = jest.fn();

    render(
      <DateTimePicker
        mode="single"
        date={selectedDate}
        onChange={changeFn}
        disabledDays={{ monday: true }}
      />
    );

    // 14th is Monday
    fireEvent.press(screen.getByText('14'));
    expect(changeFn).not.toHaveBeenCalled();
  });

  // test('minDate should be applied after init', () => {
  //   const minDate = new Date();

  //   render(<DateTimePicker minDate={minDate} />);
  //   expect(
  //     screen.getByTestId(dayjs(minDate).add(-1, 'day').format('YYYY/MM/DD'))
  //   ).toBeDisabled();
  // });
});
