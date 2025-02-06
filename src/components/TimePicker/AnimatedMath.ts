import { Animated } from 'react-native';

const FACTORIAL_3 = 3 * 2;
const FACTORIAL_5 = 5 * 4 * FACTORIAL_3;
const FACTORIAL_7 = 7 * 6 * FACTORIAL_5;

function sin(animated: Animated.Animated) {
  const normalized = normalize(animated);
  const square = Animated.multiply(normalized, normalized);
  const pow3 = Animated.multiply(normalized, square);
  const pow5 = Animated.multiply(pow3, square);
  const pow7 = Animated.multiply(pow5, square);

  return Animated.add(
    Animated.add(normalized, Animated.multiply(pow3, -1 / FACTORIAL_3)),
    Animated.add(
      Animated.multiply(pow5, 1 / FACTORIAL_5),
      Animated.multiply(pow7, -1 / FACTORIAL_7)
    )
  );
}

function normalize(animated: Animated.Animated): Animated.Animated {
  return Animated.add(
    Animated.modulo(Animated.add(animated, Math.PI), Math.PI * 2),
    -Math.PI
  ).interpolate({
    inputRange: [-Math.PI, -Math.PI / 2, Math.PI / 2, Math.PI],
    outputRange: [0, -Math.PI / 2, Math.PI / 2, 0],
  });
}

export { sin, normalize };
