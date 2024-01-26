import React from 'react';
import { render, screen } from '@testing-library/react-native';
import DateTimePicker from '../DateTimePicker';

describe('COMMON TESTS', () => {
  test('should render with default options', () => {
    render(<DateTimePicker mode="single" />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
