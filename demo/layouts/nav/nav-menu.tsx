import { View } from 'react-native';
import { navConfig } from './config-navigation';
import { NavItem } from './nav-item';

export function NavMenu() {
  return (
    <View className="w-full flex-1 flex-row gap-4">
      {navConfig.map((item, index) => (
        <NavItem key={index} item={item} />
      ))}
    </View>
  );
}
