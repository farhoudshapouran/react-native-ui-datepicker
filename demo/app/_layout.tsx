import '@/global.css';

import React, { useEffect } from 'react';
import { View, SafeAreaView, ScrollView, Platform } from 'react-native';
import { ThemeProvider } from '@react-navigation/native';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme } from '@/lib/useColorScheme';
import { LIGHT_THEME, DARK_THEME } from '@/lib/constants';
import { Header } from '@/layouts/header';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import {
  useFonts,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import {
  Archivo_300Light,
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
  Archivo_700Bold,
} from '@expo-google-fonts/archivo';
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isDarkColorScheme } = useColorScheme();

  const [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Archivo_300Light,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
    Archivo_700Bold,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
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
              <Slot />
            </View>
          </ScrollView>
        </SafeAreaView>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
