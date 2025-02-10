import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import type { HeaderProps } from './types';
import PrevButton from './PrevButton';
import NextButton from './NextButton';
import Selectors from './Selectors';
import { isEqual } from 'lodash';

const Header = ({
  buttonPrevIcon,
  buttonNextIcon,
  buttonsPosition,
  styles = {},
  classNames = {},
}: HeaderProps) => {
  return (
    <View
      style={[defaultStyles.headerContainer, styles?.header]}
      className={classNames.header}
      accessibilityRole="header"
    >
      {buttonsPosition === 'left' ? (
        <View style={defaultStyles.container}>
          <View style={defaultStyles.row}>
            <PrevButton
              icon={buttonPrevIcon}
              style={styles.button_prev}
              className={classNames.button_prev}
            />
            <NextButton
              icon={buttonNextIcon}
              style={styles.button_next}
              className={classNames.button_next}
            />
          </View>
          <Selectors position="left" />
        </View>
      ) : buttonsPosition === 'right' ? (
        <View style={defaultStyles.container}>
          <Selectors position="right" />
          <View style={defaultStyles.row}>
            <PrevButton
              icon={buttonPrevIcon}
              style={styles.button_prev}
              className={classNames.button_prev}
            />
            <NextButton
              icon={buttonNextIcon}
              style={styles.button_next}
              className={classNames.button_next}
            />
          </View>
        </View>
      ) : (
        <View style={defaultStyles.container}>
          <PrevButton
            icon={buttonPrevIcon}
            style={styles.button_prev}
            className={classNames.button_prev}
          />
          <Selectors position="around" />
          <NextButton
            icon={buttonNextIcon}
            style={styles.button_next}
            className={classNames.button_next}
          />
        </View>
      )}
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 3,
  },
  container: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },
});

const customComparator = (
  prev: Readonly<HeaderProps>,
  next: Readonly<HeaderProps>
) => {
  const areEqual =
    prev.buttonPrevIcon === next.buttonPrevIcon &&
    prev.buttonNextIcon === next.buttonNextIcon &&
    prev.buttonsPosition === next.buttonsPosition &&
    isEqual(prev.styles, next.styles) &&
    isEqual(prev.classNames, next.classNames);

  return areEqual;
};

export default memo(Header, customComparator);
