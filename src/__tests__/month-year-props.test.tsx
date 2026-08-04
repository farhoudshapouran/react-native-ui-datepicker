import React from 'react';
import { render, screen } from '@testing-library/react-native';
import DateTimePicker from '../datetime-picker';
import 'dayjs/locale/en';

describe('month/year props', () => {
  test('should display january when month={0} is passed', () => {
    render(<DateTimePicker mode="single" month={0} year={2026} />);
    expect(screen.getByText('January')).toBeVisible();
    expect(screen.getByText('2026')).toBeVisible();
  });

  test('should apply month and year changing together across a year boundary (backward)', () => {
    const { rerender } = render(
      <DateTimePicker mode="single" month={1} year={2027} />
    );
    expect(screen.getByText('February')).toBeVisible();
    expect(screen.getByText('2027')).toBeVisible();

    // February 2027 -> January 2027 -> December 2026
    rerender(<DateTimePicker mode="single" month={0} year={2027} />);
    rerender(<DateTimePicker mode="single" month={11} year={2026} />);

    expect(screen.getByText('December')).toBeVisible();
    expect(screen.getByText('2026')).toBeVisible();
  });

  test('should apply month and year changing together across a year boundary (forward)', () => {
    const { rerender } = render(
      <DateTimePicker mode="single" month={11} year={2026} />
    );
    expect(screen.getByText('December')).toBeVisible();
    expect(screen.getByText('2026')).toBeVisible();

    // December 2026 -> January 2027
    rerender(<DateTimePicker mode="single" month={0} year={2027} />);

    expect(screen.getByText('January')).toBeVisible();
    expect(screen.getByText('2027')).toBeVisible();
  });
});
