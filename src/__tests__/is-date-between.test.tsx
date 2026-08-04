import React from 'react';
import { render, screen } from '@testing-library/react-native';
import dayjs from 'dayjs';
import DateTimePicker from '../datetime-picker';
import { isDateBetween } from '../utils';
import 'dayjs/locale/en';

describe('isDateBetween', () => {
  // days.tsx asks isDateBetween about calendar day cells. Those cells inherit
  // currentDate's time of day (getMonthDays builds them via currentDate.date(n)),
  // while range endpoints are stored at start of day (onSelectDate uses
  // getStartOfDay). The answer must therefore be day-granular.
  test('counts the end day when the cell carries a time of day', () => {
    expect(
      isDateBetween(dayjs('2026-08-20 15:22'), {
        startDate: '2026-08-10',
        endDate: '2026-08-20',
      })
    ).toBe(true);
  });

  test('counts the start day when the range bounds carry a time of day', () => {
    expect(
      isDateBetween(dayjs('2026-08-10 09:00'), {
        startDate: '2026-08-10T18:00:00',
        endDate: '2026-08-20',
      })
    ).toBe(true);
  });

  test('still excludes days outside the range', () => {
    const range = { startDate: '2026-08-10', endDate: '2026-08-20' };
    expect(isDateBetween(dayjs('2026-08-09 23:59'), range)).toBe(false);
    expect(isDateBetween(dayjs('2026-08-21 00:00'), range)).toBe(false);
  });

  test('counts middle days', () => {
    const range = { startDate: '2026-08-10', endDate: '2026-08-20' };
    expect(isDateBetween(dayjs('2026-08-15 15:22'), range)).toBe(true);
  });
});

describe('range fill day state', () => {
  // Freeze the clock away from midnight: a picker rendered without a selection
  // anchors currentDate at "now", and every day cell inherits that time of day.
  beforeAll(() => {
    jest.useFakeTimers({ now: new Date('2026-08-04T15:22:00') });
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const rangeStartStyle = { backgroundColor: 'rgb(0, 0, 255)' };
  const rangeEndStyle = { backgroundColor: 'rgb(255, 0, 0)' };
  const rangeMiddleStyle = { backgroundColor: 'rgb(0, 255, 0)' };
  const styles = {
    range_start: rangeStartStyle,
    range_end: rangeEndStyle,
    range_middle: rangeMiddleStyle,
  };

  test('the end day keeps its range_end style when the picker was opened without a selection', () => {
    const { rerender } = render(
      <DateTimePicker mode="range" styles={styles} />
    );

    // A controlled consumer supplies the selection as date-only values.
    rerender(
      <DateTimePicker
        mode="range"
        startDate="2026-08-10"
        endDate="2026-08-20"
        styles={styles}
      />
    );

    expect(screen.getByLabelText('10')).toHaveStyle(rangeStartStyle);
    expect(screen.getByLabelText('15')).toHaveStyle(rangeMiddleStyle);
    expect(screen.getByLabelText('20')).toHaveStyle(rangeEndStyle);
  });
});
