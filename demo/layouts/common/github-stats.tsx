import { View } from 'react-native';
import { Link } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { cssInterop } from 'nativewind';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { formatNumber } from '@/lib/utils';

cssInterop(AntDesign, {
  className: {
    target: 'style',
  },
});

cssInterop(Feather, {
  className: {
    target: 'style',
  },
});

type DataType = {
  downloads: number;
  start: string;
  end: string;
  package: string;
};

export function GithubStats() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DataType>();

  const getStats = async () => {
    try {
      const response = await fetch(
        'https://api.npmjs.org/downloads/point/last-month/react-native-ui-datepicker'
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <Link
      href="https://github.com/farhoudshapouran/react-native-ui-datepicker"
      target="_blank"
    >
      <Button
        variant="secondary"
        className="h-9 flex-row items-center gap-2 rounded-xl"
      >
        <View className="flex-row items-center gap-1">
          <Feather name="download" size={18} className="text-foreground" />
          <Text className="text-foreground">
            {!loading && data ? formatNumber(data.downloads) : '...'}/Month
          </Text>
        </View>
        <AntDesign name="github" size={20} className="text-foreground" />
      </Button>
    </Link>
  );
}
