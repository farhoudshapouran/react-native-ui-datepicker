import { Link } from 'expo-router';
import { useActiveLink } from '@/hooks/use-active-link';
import { NavItemProps } from './types';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

type Props = {
  item: NavItemProps;
};

export function NavItem({ item }: Props) {
  const active = useActiveLink(item.path);

  return (
    <Link href={item.path} asChild>
      <Text
        className={cn(
          'text-muted-foreground text-sm',
          active && 'text-foreground'
        )}
      >
        {item.title}
      </Text>
    </Link>
  );
}
