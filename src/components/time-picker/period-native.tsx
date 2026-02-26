import React, { memo } from 'react';
import WheelPicker from './wheel-picker';
import { ClassNames, PickerOption, Styles } from '../../types';
import { deepEqual } from '../../utils';

interface PeriodProps {
  value: string;
  setValue?: (value: any) => void;
  styles?: Styles;
  classNames?: ClassNames;
}

const options: PickerOption[] = [
  { value: 'AM', text: 'AM' },
  { value: 'PM', text: 'PM' },
];

const PeriodNative = ({
  value,
  setValue = () => {},
  styles,
  classNames,
}: PeriodProps) => {
  return (
    <WheelPicker
      value={value}
      options={options}
      onChange={setValue}
      //containerStyle={defaultStyles.container}
      itemTextStyle={styles?.time_label}
      itemTextClassName={classNames?.time_label}
      selectedIndicatorClassName={classNames?.time_selected_indicator}
      selectedIndicatorStyle={styles?.time_selected_indicator}
      itemHeight={44}
      decelerationRate="fast"
    />
  );
};

const customComparator = (
  prev: Readonly<PeriodProps>,
  next: Readonly<PeriodProps>
) => {
  const areEqual =
    prev.value === next.value &&
    prev.setValue === next.setValue &&
    deepEqual(prev.styles, next.styles) &&
    deepEqual(prev.classNames, next.classNames);

  return areEqual;
};

export default memo(PeriodNative, customComparator);
