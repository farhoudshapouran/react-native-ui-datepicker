import { usePathname } from 'expo-router';

// ----------------------------------------------------------------------

type ReturnType = boolean;

export function useActiveLink(path: string, deep = false): ReturnType {
  const pathname = usePathname();

  const checkPath = path.startsWith('#');

  const currentPath = path === '/' ? '/' : `${path}`;

  const normalActive = !checkPath && pathname === currentPath;

  const rootPath = pathname.split('/')[1] || '/';
  const currentPathPath = currentPath.split('/')[1] || '/';

  const deepActive = !checkPath && currentPathPath === rootPath;

  return deep ? deepActive : normalActive;
}
