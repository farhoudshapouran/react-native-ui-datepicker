import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DefaultPreview } from '@/components/demo/default/default-preview';

export default function MainPage() {
  const [activeTab, setActiveTab] = useState('preview');

  return (
    <View>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-col">
        <TabsList className="w-full flex-row rounded-none">
          <TabsTrigger value="preview" className="flex-1">
            <Text>Preview</Text>
          </TabsTrigger>
          <TabsTrigger value="code" className="flex-1">
            <Text>Code</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="items-center p-5">
          <DefaultPreview />
        </TabsContent>
        <TabsContent value="code"></TabsContent>
      </Tabs>
      <DefaultPreview />
    </View>
  );
}
