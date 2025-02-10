import '../global.css';
import { useEffect } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Link, Slot, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import 'react-native-reanimated';

import { useColorScheme } from '@/lib/useColorScheme';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { NavMenu } from '@/components/nav/nav-menu';
import { GithubLink } from '@/components/github-link';
import { LIGHT_THEME, DARK_THEME } from '@/lib/constants';
import { ReactScan } from 'react-scan/native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    setColorScheme('system');
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ReactScan
      options={{
        enabled: true,
        log: true,
        animationWhenFlashing: false,
      }}
    >
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <ScrollView>
          <SafeAreaView className="bg-background min-h-screen py-8">
            <View className="flex w-full max-w-2xl flex-col items-center gap-8">
              <View className="flex w-full flex-col-reverse items-start gap-6 md:flex-row md:justify-between">
                <View className="gap-1">
                  <Text className="text-3xl font-semibold">
                    React Native UI DatePicker
                  </Text>
                  <Text className="text-muted-foreground text-lg">
                    Customizable date picker for React Native
                  </Text>
                </View>
                <Text>123</Text>
              </View>
              <View className="border-secondary mn-h-[400px] w-full rounded-lg border">
                <View className="p-2">
                  <NavMenu />
                </View>
                <Slot />
              </View>
              <GithubLink />
            </View>
          </SafeAreaView>
        </ScrollView>
        <StatusBar style="auto" />
      </ThemeProvider>
    </ReactScan>
  );
}
