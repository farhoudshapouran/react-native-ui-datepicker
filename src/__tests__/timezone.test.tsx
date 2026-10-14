import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import dayjs from 'dayjs';
import DateTimePicker from '../datetime-picker';
import type { DateType } from '../types';

process.env.TZ = 'Europe/Paris';

const nativeFormatToParts = Intl.DateTimeFormat.prototype.formatToParts;

const degradeFormatToParts = () => {
  Intl.DateTimeFormat.prototype.formatToParts = function (date) {
    return [{ type: 'literal', value: this.format(date) }];
  };
};

const restoreFormatToParts = () => {
  Intl.DateTimeFormat.prototype.formatToParts = nativeFormatToParts;
};

const toDay = (date: DateType) =>
  date ? dayjs(date).format('YYYY-MM-DD') : undefined;

const ControlledRangePicker = ({
  onChange,
}: {
  onChange: (range: { startDate?: string; endDate?: string }) => void;
}) => {
  const [range, setRange] = useState<{
    startDate?: DateType;
    endDate?: DateType;
  }>({});

  return (
    <DateTimePicker
      mode="range"
      month={9}
      year={2026}
      startDate={range.startDate}
      endDate={range.endDate}
      onChange={({ startDate, endDate }) => {
        setRange({ startDate, endDate });
        onChange({ startDate: toDay(startDate), endDate: toDay(endDate) });
      }}
    />
  );
};

describe('TIMEZONE TESTS', () => {
  afterEach(restoreFormatToParts);

  test.each([
    ['native', () => {}],
    ['degraded (as on some iOS engines)', degradeFormatToParts],
  ])(
    'selects the tapped day without timeZone when formatToParts is %s',
    (_, setUpFormatToParts) => {
      setUpFormatToParts();
      const onChange = jest.fn();

      render(<ControlledRangePicker onChange={onChange} />);
      fireEvent.press(screen.getByText('22'));
      fireEvent.press(screen.getByText('22'));

      expect(onChange).toHaveBeenLastCalledWith({
        startDate: '2026-10-22',
        endDate: '2026-10-22',
      });
    }
  );
});
