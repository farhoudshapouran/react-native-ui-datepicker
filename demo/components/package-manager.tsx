import { View } from 'react-native';
import { Text } from './ui/text';
import { Button } from './ui/button';
import Feather from '@expo/vector-icons/Feather';
import { cssInterop } from 'nativewind';
import * as Clipboard from 'expo-clipboard';

cssInterop(Feather, {
  className: {
    target: 'style',
  },
});

type Props = {
  command: string;
};

export function PackageManager({ command }: Props) {
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(command);
  };

  return (
    <View className="flex-row items-center justify-between">
      <Text className="font-mono text-sm">{command}</Text>
      <Button
        variant="ghost"
        size="icon"
        className="size-8"
        onPress={copyToClipboard}
      >
        <Feather name="copy" size={15} className="text-foreground" />
      </Button>
    </View>
  );
}
