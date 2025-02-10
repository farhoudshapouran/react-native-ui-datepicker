import { View } from 'react-native';
import { navConfig } from './config-navigation';
import { NavItem } from './nav-item';

export function NavMenu() {
  return (
    <View className="flex w-full flex-row gap-1">
      {navConfig.map((item, index) => (
        <NavItem key={index} item={item} />
      ))}
    </View>
  );
}
