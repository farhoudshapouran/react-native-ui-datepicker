import { Link } from 'expo-router';
import { useActiveLink } from '@/hooks/use-active-link';
import { NavItemProps } from './types';
import { Button } from '../ui/button';
import { Text } from '../ui/text';

type Props = {
  item: NavItemProps;
};

export function NavItem({ item }: Props) {
  const active = useActiveLink(item.path);

  return (
    <Link href={item.path} asChild>
      <Button size="sm" variant={active ? 'secondary' : 'ghost'}>
        <Text>{item.title}</Text>
      </Button>
    </Link>
  );
}
