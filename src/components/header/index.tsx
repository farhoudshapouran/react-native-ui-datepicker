import React, { memo, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import type { HeaderProps, NavigationProps } from './types';
import PrevButton from './prev-button';
import NextButton from './next-button';
import Selectors from './selectors';
import { isEqual } from 'lodash';

const createDefaultStyles = (isRTL: boolean) =>
  StyleSheet.create({
    headerContainer: {
      paddingVertical: 3,
    },
    container: {
      padding: 5,
      gap: 20,
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    navigation: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
    },
  });

const NavigationButtons = ({ styles, classNames, isRTL }: NavigationProps) => {
  const style = useMemo(() => createDefaultStyles(isRTL), [isRTL]);

  return (
    <View style={style.navigation}>
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
};

const Header = ({
  navigationPosition = 'around',
  styles = {},
  classNames = {},
  isRTL,
}: HeaderProps) => {
  const style = useMemo(() => createDefaultStyles(isRTL), [isRTL]);

  return (
    <View
      style={[style.headerContainer, styles?.header]}
      className={classNames?.header}
    >
      <View style={style.container}>
        {navigationPosition === 'left' ? (
          <>
            <NavigationButtons
              styles={styles}
              classNames={classNames}
              isRTL={isRTL}
            />
            <Selectors position="left" />
          </>
        ) : navigationPosition === 'right' ? (
          <>
            <Selectors position="right" />
            <NavigationButtons
              styles={styles}
              classNames={classNames}
              isRTL={isRTL}
            />
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
    prev.isRTL === next.isRTL &&
    isEqual(prev.styles, next.styles) &&
    isEqual(prev.classNames, next.classNames);

  return areEqual;
};

export default memo(Header, customComparator);
