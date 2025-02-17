import { View } from 'react-native';
import { Text } from './ui/text';

type Props = {
  title: string;
  description: string;
};

export function FeatureCard({ title, description }: Props) {
  return (
    <View className="border-border flex-1 gap-2 rounded-lg border p-4">
      <Text className="font-semibold">{title}</Text>
      <Text className="text-foreground/80">{description}</Text>
    </View>
  );
}
