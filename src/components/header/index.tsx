import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import type { HeaderProps, NavigationProps } from './types';
import PrevButton from './prev-button';
import NextButton from './next-button';
import Selectors from './selectors';
import { isEqual } from 'lodash';

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

const NavigationButtons = ({ styles, classNames }: NavigationProps) => (
  <View style={defaultStyles.navigation}>
    <PrevButton
      style={styles?.button_prev}
      imageStyle={styles?.button_prev_image}
      className={classNames?.button_prev}
      imageClassName={classNames?.button_prev_image}
    />
    <NextButton
      style={styles?.button_next}
      imageStyle={styles?.button_next_image}
      className={classNames?.button_next}
      imageClassName={classNames?.button_next_image}
    />
  </View>
);

const Header = ({
  navigationPosition = 'around',
  styles = {},
  classNames = {},
}: HeaderProps) => {
  return (
    <View
      style={[defaultStyles.headerContainer, styles?.header]}
      className={classNames?.header}
    >
      <View style={defaultStyles.container}>
        {navigationPosition === 'left' ? (
          <>
            <NavigationButtons styles={styles} classNames={classNames} />
            <Selectors position="left" />
          </>
        ) : navigationPosition === 'right' ? (
          <>
            <Selectors position="right" />
            <NavigationButtons styles={styles} classNames={classNames} />
          </>
        ) : (
          <>
            <PrevButton
              style={styles?.button_prev}
              imageStyle={styles?.button_prev_image}
              className={classNames?.button_prev}
              imageClassName={classNames?.button_prev_image}
            />
            <Selectors position="around" />
            <NextButton
              style={styles?.button_next}
              imageStyle={styles?.button_next_image}
              className={classNames?.button_next}
              imageClassName={classNames?.button_next_image}
            />
          </>
        )}
      </View>
    </View>
  );
};

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
