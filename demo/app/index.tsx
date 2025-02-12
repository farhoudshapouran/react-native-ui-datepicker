import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  CustomDatePicker,
  MultipleDatePicker,
  RangeDatePicker,
  SingleDatePicker,
} from '@/components/examples';

export default function MainPage() {
  const [activeTab, setActiveTab] = useState('single');

  return (
    <View className="w-full">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="border-border flex-col overflow-hidden rounded-lg border"
      >
        <TabsList className="border-border w-full flex-row justify-start rounded-none border-b px-1.5">
          <TabsTrigger value="single" className="px-2 shadow-none">
            <Text className="text-foreground">Single</Text>
          </TabsTrigger>
          <TabsTrigger value="range" className="px-2 shadow-none">
            <Text className="text-foreground">Range</Text>
          </TabsTrigger>
          <TabsTrigger value="multiple" className="px-2 shadow-none">
            <Text className="text-foreground">Multiple</Text>
          </TabsTrigger>
          <Separator orientation="vertical" className="mx-1.5 h-6" />
          <TabsTrigger value="localization" className="px-2 shadow-none">
            <Text className="text-foreground">Localization</Text>
          </TabsTrigger>
          <TabsTrigger value="custom" className="px-2 shadow-none">
            <Text className="text-foreground">Custom</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="single" className="min-h-[400px] items-center p-5">
          <SingleDatePicker />
        </TabsContent>
        <TabsContent value="range">
          <RangeDatePicker />
        </TabsContent>
        <TabsContent value="multiple">
          <MultipleDatePicker />
        </TabsContent>
        <TabsContent value="custom" className="min-h-[400px] items-center p-5">
          <CustomDatePicker />
        </TabsContent>
      </Tabs>
    </View>
  );
}
