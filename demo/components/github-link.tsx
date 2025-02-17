import React from 'react';
import { View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { cssInterop } from 'nativewind';
import { Text } from './ui/text';
import { Link } from 'expo-router';

cssInterop(AntDesign, {
  className: {
    target: 'style',
  },
});

export function GithubLink() {
  return (
    <View className="py-6">
      <Link
        href="https://github.com/farhoudshapouran/react-native-ui-datepicker"
        target="_blank"
      >
        <View className="flex-row items-center gap-2">
          <AntDesign name="github" size={20} className="text-foreground" />
          <Text className="text-sm">Check repository on GitHub</Text>
        </View>
      </Link>
    </View>
  );
}
