import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import type { HeaderProps } from './types';
import PrevButton from './prev-button';
import NextButton from './next-button';
import Selectors from './selectors';
import { isEqual } from 'lodash';

const Header = ({
  navigationPosition,
  styles = {},
  classNames = {},
}: HeaderProps) => {
  return (
    <View
      style={[defaultStyles.headerContainer, styles?.header]}
      className={classNames.header}
      accessibilityRole="header"
    >
      {navigationPosition === 'left' ? (
        <View style={defaultStyles.container}>
          <View style={defaultStyles.navigation}>
            <PrevButton
              style={styles.button_prev}
              className={classNames.button_prev}
            />
            <NextButton
              style={styles.button_next}
              className={classNames.button_next}
            />
          </View>
          <Selectors position="left" />
        </View>
      ) : navigationPosition === 'right' ? (
        <View style={defaultStyles.container}>
          <Selectors position="right" />
          <View style={defaultStyles.navigation}>
            <PrevButton
              style={styles.button_prev}
              className={classNames.button_prev}
            />
            <NextButton
              style={styles.button_next}
              className={classNames.button_next}
            />
          </View>
        </View>
      ) : (
        <View style={defaultStyles.container}>
          <PrevButton
            style={styles.button_prev}
            className={classNames.button_prev}
          />
          <Selectors position="around" />
          <NextButton
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
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navigation: {
    flexDirection: 'row',
  },
});

const customComparator = (
  prev: Readonly<HeaderProps>,
  next: Readonly<HeaderProps>
) => {
  const areEqual =
    prev.PrevIcon === next.PrevIcon &&
    prev.NextIcon === next.NextIcon &&
    prev.navigationPosition === next.navigationPosition &&
    isEqual(prev.styles, next.styles) &&
    isEqual(prev.classNames, next.classNames);

  return areEqual;
};

export default memo(Header, customComparator);
