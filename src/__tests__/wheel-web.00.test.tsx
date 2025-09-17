/**
 *  - Render the *web* wheel component and simulate a drag that lands on "00".
 *  - Assert the component calls setValue(0) (a number).
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import { PanResponder } from 'react-native';
import WheelWeb from '../components/time-picker/wheel-web';
import type { PickerOption } from '../types';

// Helper to build options that reproduce a web bug where 00 wasn't selectable.
const makeItems = (n = 5): PickerOption[] =>
  Array.from({ length: n }, (_, i) => ({
    value: i === 0 ? '00' : i, // "00", 1, 2, 3, ...
    text: String(i).padStart(2, '0'), // "00", "01", "02", ...
  }));

describe('WheelWeb — selecting 00', () => {
  let panSpec: any | null = null;

  beforeEach(() => {
    panSpec = null;
    jest.spyOn(PanResponder, 'create').mockImplementation((spec: any) => {
      panSpec = spec;
      return { panHandlers: spec } as any;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('emits numeric 0 when landing on "00"', () => {
    // Build the wheel options the component will render (replicate bug condition):
    const items = makeItems(5); // ["00", 1, 2, 3, 4]
    const setValue = jest.fn();

    render(
      <WheelWeb
        value={1} // start on "01"
        items={items}
        setValue={setValue}
        styles={{}}
        classNames={{} as any}
      />
    );

    expect(panSpec).toBeTruthy(); // Sanity: confirm we captured the gesture handlers

    const STEP = 28;
    panSpec.onPanResponderGrant(); // Simulates “finger down” (gesture start).
    panSpec.onPanResponderRelease({}, { dy: STEP }); // Simulates “finger up” after dragging by 1 row.

    expect(setValue).toHaveBeenCalledTimes(1);
    expect(setValue).toHaveBeenCalledWith(0);
  });

  test('no change when releasing on the same value (including "00")', () => {
    const items = makeItems(5);
    const setValue = jest.fn();

    // Start already on 0 (which will match "00" thanks to Number(...))
    render(
      <WheelWeb
        value={0}
        items={items}
        setValue={setValue}
        styles={{}}
        classNames={{} as any}
      />
    );

    expect(panSpec).toBeTruthy();

    // Release without moving (dy = 0) → should not emit anything
    panSpec.onPanResponderGrant();
    panSpec.onPanResponderRelease({}, { dy: 0 });

    expect(setValue).not.toHaveBeenCalled();
  });
});
