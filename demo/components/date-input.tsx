import { View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { cssInterop } from 'nativewind';
import { Text } from './ui/text';
import { cn } from '@/lib/utils';

cssInterop(Feather, {
  className: {
    target: 'style',
  },
});

type Props = {
  value: string | null;
  placeholder: string;
};

export function DateInput({ value, placeholder }: Props) {
  return (
    <View className="border-muted bg-card shadow-muted h-10 w-[310] flex-row items-center gap-2 rounded-lg border px-3 shadow-lg dark:shadow-none">
      <Feather name="calendar" size={20} className="text-foreground" />
      <Text
        numberOfLines={1}
        className={cn(
          'text-muted-foreground overflow-hidden text-ellipsis text-base',
          value && 'text-foreground'
        )}
      >
        {value || placeholder}
      </Text>
    </View>
  );
}
