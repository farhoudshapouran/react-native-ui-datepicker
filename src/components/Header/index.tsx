import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import type { HeaderProps } from './types';
import PrevButton from './PrevButton';
import NextButton from './NextButton';
import Selectors from './Selectors';

const Header = ({ buttonPrevIcon, buttonNextIcon, theme }: HeaderProps) => {
  return (
    <View
      style={[styles.headerContainer, theme?.headerContainerStyle]}
      accessibilityRole="header"
    >
      {theme?.headerButtonsPosition === 'left' ? (
        <View style={styles.container}>
          <View style={styles.row}>
            <PrevButton icon={buttonPrevIcon} theme={theme} />
            <NextButton icon={buttonNextIcon} />
          </View>
          <Selectors />
        </View>
      ) : theme?.headerButtonsPosition === 'right' ? (
        <View style={styles.container}>
          <Selectors />
          <View style={styles.row}>
            <PrevButton icon={buttonPrevIcon} theme={theme} />
            <NextButton icon={buttonNextIcon} />
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <PrevButton icon={buttonPrevIcon} theme={theme} />
          <Selectors />
          <NextButton icon={buttonNextIcon} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 5,
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

export default memo(Header);
