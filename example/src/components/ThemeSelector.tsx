import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';

export interface ITheme {
  mainColor: string;
  activeTextColor: string;
}

type Props = {
  themes: ITheme[];
  setTheme: (theme: ITheme) => void;
};

export default function ThemeSelector({ themes = [], setTheme }: Props) {
  return (
    <View style={styles.themeContainer}>
      {themes.map((item, index) => (
        <Pressable
          key={index}
          style={[
            styles.themeButton,
            {
              borderColor: item.activeTextColor,
              backgroundColor: item.mainColor,
            },
          ]}
          onPress={() => setTheme(item)}
          accessibilityRole="button"
          accessibilityLabel="Set Active Theme"
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  themeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,
    width: 330,
  },
  themeButton: {
    borderWidth: 4,
    width: 32,
    height: 32,
    borderRadius: 32,
    margin: 5,
    shadowRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 0 },
  },
});
