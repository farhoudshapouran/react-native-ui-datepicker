import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import DateTimePicker from '../DateTimePicker';
//import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/de';
import 'dayjs/locale/es';
import 'dayjs/locale/fr';
import 'dayjs/locale/tr';

describe('API TESTS', () => {
  test('should display the passed date', async () => {
    const selectedDate = new Date(2020, 11, 19);
    const month = selectedDate.toLocaleString('en-US', { month: 'long' });
    onChange = jest.fn();

    render(
      <DateTimePicker mode="single" date={selectedDate} onChange={onChange} />
    );
    expect(screen.getByText(month)).toBeVisible();
    expect(screen.getByText('19')).toBeVisible();
    expect(screen.getByText('2020')).toBeVisible();

    await fireEvent.press(screen.getByText('17'));

    expect(onChange).toHaveBeenCalledTimes(1);
    const call = onChange.mock.calls[0];
    expect(call[0].date).toEqual('2020-12-17');
  });

  test('should display the passed date with time in time mode', async () => {
    const selectedDate = new Date(2020, 11, 19, 12, 30);
    const month = selectedDate.toLocaleString('en-US', { month: 'long' });
    onChange = jest.fn();
    render(
      <DateTimePicker
        timePicker={true}
        date={selectedDate}
        onChange={onChange}
      />
    );
    expect(screen.getByText(month)).toBeVisible();
    expect(screen.getByText('19')).toBeVisible();
    expect(screen.getByText('2020')).toBeVisible();

    await fireEvent.press(screen.getByText('17'));

    expect(onChange).toHaveBeenCalledTimes(1);
    const call = onChange.mock.calls[0];
    expect(call[0].date).toEqual('2020-12-17 12:30');
  });

  // test('minDate should be applied after init', () => {
  //   const minDate = new Date();

  //   render(<DateTimePicker minDate={minDate} />);
  //   expect(
  //     screen.getByTestId(dayjs(minDate).add(-1, 'day').format('YYYY/MM/DD'))
  //   ).toBeDisabled();
  // });
});
