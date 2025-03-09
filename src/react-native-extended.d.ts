import 'react-native';

declare module 'react-native' {
  interface ViewProps {
    className?: string;
  }

  interface TextProps {
    className?: string;
  }

  interface PressableProps {
    className?: string;
  }

  interface ImageProps {
    className?: string;
  }
}
