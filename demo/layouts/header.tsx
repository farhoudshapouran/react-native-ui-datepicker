import { View } from 'react-native';
import { NavMenu } from './nav/nav-menu';
import { ThemeToggle } from './common/theme-toggle';

export const Header = () => {
  return (
    <View className="bg-background border-muted h-14 items-center justify-center border-b">
      <View className="mx-auto w-full max-w-5xl flex-row items-center justify-between px-5">
        <NavMenu />
        <ThemeToggle />
      </View>
    </View>
  );
};
