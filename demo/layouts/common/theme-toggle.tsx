import { cssInterop } from 'nativewind';
import { Button } from '@/components/ui/button';
import { useColorScheme } from '@/lib/useColorScheme';
import Feather from '@expo/vector-icons/Feather';
import { useCallback } from 'react';

cssInterop(Feather, {
  className: {
    target: 'style',
  },
});

export const ThemeToggle = () => {
  const { toggleColorScheme, isDarkColorScheme } = useColorScheme();

  return (
    <Button
      onPress={toggleColorScheme}
      size="icon"
      variant="ghost"
      className="bg-background size-9"
    >
      <Feather
        name={isDarkColorScheme ? 'sun' : 'moon'}
        size={18}
        className="text-foreground"
      />
    </Button>
  );
};
