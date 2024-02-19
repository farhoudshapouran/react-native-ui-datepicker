import React from 'react';
import { render, screen } from '@testing-library/react-native';
import DateTimePicker from '../DateTimePicker';

describe('COMMON TESTS', () => {
  test('should render with default options', () => {
    render(<DateTimePicker mode="single" date={new Date(2024, 2, 19)} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
