import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import {
  CustomDatePicker1,
  CustomDatePicker2,
  CustomDatePicker3,
} from '@/components/examples';
import { Separator } from '@/components/ui/separator';

export default function ExamplesPage() {
  return (
    <View className="w-full gap-6">
      <View className="mb-6 flex w-full flex-col-reverse items-start gap-6 md:flex-row md:justify-between">
        <View className="gap-1">
          <Text className="text-3xl font-semibold">Examples</Text>
          <Text className="text-muted-foreground text-lg">
            Inspired by the stunning designs found on Dribbble.
          </Text>
        </View>
      </View>
      <View className="items-center p-6">
        <CustomDatePicker1 />
      </View>
      <Separator />
      <View className="items-center p-6">
        <CustomDatePicker2 />
      </View>
      <Separator />
      <View className="items-center p-6">
        <CustomDatePicker3 />
      </View>
    </View>
  );
}
