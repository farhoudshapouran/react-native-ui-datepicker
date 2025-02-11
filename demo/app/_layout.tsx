import '@/global.css';

import React, { useEffect } from 'react';
import { View, SafeAreaView, ScrollView, Platform } from 'react-native';
import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme } from '@/lib/useColorScheme';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { NavMenu } from '@/layouts/nav/nav-menu';
import { GithubLink } from '@/components/github-link';
import { LIGHT_THEME, DARK_THEME } from '@/lib/constants';
import { ReactScan } from 'react-scan/native';
import { Header } from '@/layouts/header';
import 'react-native-gesture-handler';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isDarkColorScheme } = useColorScheme();

  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView className="bg-background min-h-screen flex-1">
          <Header />
          <ScrollView>
            <View className="mx-auto flex w-full max-w-2xl flex-col items-center gap-8 p-6">
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
              <Slot />
              <GithubLink />
            </View>
          </ScrollView>
        </SafeAreaView>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined'
    ? React.useEffect
    : React.useLayoutEffect;
