import React, { useState } from 'react';
import { View } from 'react-native';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';
import {
  MultipleDatePicker,
  RangeDatePicker,
  SingleDatePicker,
} from '@/components/examples';
import { PackageManager } from '@/components/package-manager';
import { FeatureCard } from '@/components/feature-card';
import { GithubLink } from '@/components/github-link';

export default function MainPage() {
  const [exampleTab, setExampleTab] = useState('single');
  const [packageTab, setPackageTab] = useState('npm');

  return (
    <View className="w-full gap-6">
      <View className="flex w-full flex-col-reverse items-start gap-6 md:flex-row md:justify-between">
        <View className="gap-1">
          <Text className="text-3xl font-semibold">
            React Native UI DatePicker
          </Text>
          <Text className="text-muted-foreground text-lg">
            Customizable date picker for React Native
          </Text>
        </View>
      </View>
      <View>
        <Tabs
          value={exampleTab}
          onValueChange={setExampleTab}
          className="border-border flex-col overflow-hidden rounded-lg border"
        >
          <TabsList className="border-border w-full flex-row justify-start rounded-none border-b px-1.5">
            <TabsTrigger value="single" className="px-2 shadow-none">
              <Text>Single</Text>
            </TabsTrigger>
            <TabsTrigger value="range" className="px-2 shadow-none">
              <Text>Range</Text>
            </TabsTrigger>
            <TabsTrigger value="multiple" className="px-2 shadow-none">
              <Text>Multiple</Text>
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="single"
            className="min-h-[400px] items-center p-5"
          >
            <SingleDatePicker />
          </TabsContent>
          <TabsContent value="range" className="min-h-[400px] items-center p-5">
            <RangeDatePicker />
          </TabsContent>
          <TabsContent
            value="multiple"
            className="min-h-[400px] items-center p-5"
          >
            <MultipleDatePicker />
          </TabsContent>
        </Tabs>
      </View>
      <View className="gap-3">
        <Text className="text-2xl font-semibold">Installation</Text>
        <Tabs
          value={packageTab}
          onValueChange={setPackageTab}
          className="border-border flex-col overflow-hidden rounded-lg border"
        >
          <TabsList className="border-border w-full flex-row justify-start rounded-none border-b px-1.5">
            <TabsTrigger value="npm" className="px-3 shadow-none">
              <Text>npm</Text>
            </TabsTrigger>
            <TabsTrigger value="yarn" className="px-3 shadow-none">
              <Text>yarn</Text>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="npm" className="p-5">
            <PackageManager command="npm install react-native-ui-datepicker" />
          </TabsContent>
          <TabsContent value="yarn" className="p-5">
            <PackageManager command="yarn add react-native-ui-datepicker" />
          </TabsContent>
        </Tabs>
      </View>
      <View className="gap-3">
        <Text className="text-2xl font-semibold">Features</Text>
        <View className="gap-4">
          <View className="gap-4 md:flex-row">
            <FeatureCard
              title="📅  Selection Modes"
              description="Choose from single, range, or multiple selection to fit your needs."
            />
            <FeatureCard
              title="🌿  Unstyled & Composable"
              description="Ships with minimal styling by default, allowing full control over the UI."
            />
          </View>
          <View className="gap-4 md:flex-row">
            <FeatureCard
              title="🛠️  Extensive Props"
              description="Fine-tune behavior, appearance, and interactions with a rich set of props."
            />
            <FeatureCard
              title="🎨  NativeWind Compatible"
              description="Easily style the calendar using NativeWind for a smooth experience."
            />
          </View>
          <View className="gap-4 md:flex-row">
            <FeatureCard
              title="🌎  Fully Localizable"
              description="Supports multiple languages and date formats for a global audience."
            />
            <FeatureCard
              title="🕗  Time Zone Support"
              description="Ensures accurate date selection across different time zones."
            />
          </View>
          <View className="gap-4 md:flex-row">
            <FeatureCard
              title="⚙️  Customizable Components"
              description="Replace or modify built-in elements to match your specific requirements."
            />
            <FeatureCard
              title="⚡  Fast & Lightweight"
              description="Optimized rendering methods, to keeping performance smooth."
            />
          </View>
        </View>
      </View>
      <View className="items-center">
        <GithubLink />
      </View>
    </View>
  );
}
