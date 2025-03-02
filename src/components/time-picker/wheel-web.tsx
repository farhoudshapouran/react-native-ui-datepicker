import React, { memo, useMemo, useRef } from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  View,
  Platform,
  Text,
} from 'react-native';
import { sin } from './animated-math';
import { CONTAINER_HEIGHT } from '../../enums';
import { ClassNames, Styles, PickerOption } from '../../types';
import { isEqual } from 'lodash';

interface WheelProps {
  value: number | string;
  setValue?: (value: any) => void;
  items: PickerOption[];
  styles?: Styles;
  classNames?: ClassNames;
}

const ITEM_HEIGHT = 44;

const WheelWeb = ({
  value,
  setValue = () => {},
  items,
  styles = {},
  classNames = {},
}: WheelProps) => {
  const displayCount = 5;
  const translateY = useRef(new Animated.Value(0)).current;
  const renderCount =
    displayCount * 2 < items.length ? displayCount * 8 : displayCount * 2 - 1;
  const circular = items.length >= displayCount;
  const height = 140;
  const radius = height / 2;

  const valueIndex = useMemo(() => {
    return items.findIndex((item) => item.value === value) || 0;
  }, [items, value]);

  const panResponder = useMemo(() => {
    return PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        translateY.setValue(0);
      },
      onPanResponderMove: (evt, gestureState) => {
        translateY.setValue(gestureState.dy);
        evt.stopPropagation();
      },
      onPanResponderRelease: (_, gestureState) => {
        translateY.extractOffset();
        let newValueIndex =
          valueIndex -
          Math.round(gestureState.dy / ((radius * 2) / displayCount));
        if (circular) {
          newValueIndex = (newValueIndex + items.length) % items.length;
        } else {
          if (newValueIndex < 0) {
            newValueIndex = 0;
          } else if (newValueIndex >= items.length) {
            newValueIndex = items.length - 1;
          }
        }
        const newValue = items[newValueIndex];
        if (newValue?.value === value) {
          translateY.setOffset(0);
          translateY.setValue(0);
        } else if (newValue?.value) {
          setValue(newValue.value);
        } else if (items[0]?.value) {
          setValue(items[0].value);
        }
      },
    });
  }, [
    circular,
    displayCount,
    radius,
    setValue,
    value,
    valueIndex,
    items,
    translateY,
  ]);

  const displayValues = useMemo(() => {
    const centerIndex = Math.floor(renderCount / 2);

    return Array.from({ length: renderCount }, (_, index) => {
      let targetIndex = valueIndex + index - centerIndex;
      if (circular) {
        targetIndex =
          ((targetIndex % items.length) + items.length) % items.length;
      } else {
        targetIndex = Math.max(0, Math.min(targetIndex, items.length - 1));
      }
      return items[targetIndex] || items[0];
    });
  }, [renderCount, valueIndex, items, circular]);

  const animatedAngles = useMemo(() => {
    //translateY.setValue(0);
    translateY.setOffset(0);
    const currentIndex = displayValues.findIndex(
      (item) => item?.value === value
    );
    return displayValues && displayValues.length > 0
      ? displayValues.map((_, index) =>
          translateY
            .interpolate({
              inputRange: [-radius, radius],
              outputRange: [
                -radius +
                  ((radius * 2) / displayCount) * (index - currentIndex),
                radius + ((radius * 2) / displayCount) * (index - currentIndex),
              ],
              extrapolate: 'extend',
            })
            .interpolate({
              inputRange: [-radius, radius],
              outputRange: [-Math.PI / 2, Math.PI / 2],
              extrapolate: 'clamp',
            })
        )
      : [];
  }, [displayValues, radius, value, displayCount, translateY]);

  return (
    <View style={[defaultStyles.container]} {...panResponder.panHandlers}>
      <View
        style={[
          styles.time_selected_indicator,
          defaultStyles.selectedIndicator,
          {
            transform: [{ translateY: -ITEM_HEIGHT / 2 }],
            height: ITEM_HEIGHT,
          },
        ]}
        className={classNames.time_selected_indicator}
      />
      {displayValues?.map((displayValue, index) => {
        const animatedAngle = animatedAngles[index];
        return (
          <Animated.View
            key={`${displayValue?.text}-${index}`}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              position: 'absolute',
              height: ITEM_HEIGHT - 10,
              transform: animatedAngle
                ? [
                    {
                      translateY: Animated.multiply(radius, sin(animatedAngle)),
                    },
                    {
                      rotateX: animatedAngle.interpolate({
                        inputRange: [-Math.PI / 2, Math.PI / 2],
                        outputRange: ['-89deg', '89deg'],
                        extrapolate: 'clamp',
                      }),
                    },
                  ]
                : [],
              opacity: displayValue?.value !== value ? 0.3 : 1,
            }}
          >
            <Text style={styles?.time_label} className={classNames?.time_label}>
              {displayValue?.text}
            </Text>
          </Animated.View>
        );
      })}
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    minWidth: 30,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    height: CONTAINER_HEIGHT / 2,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        userSelect: 'none',
      },
    }),
  },
  contentContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedIndicator: {
    position: 'absolute',
    width: '100%',
    top: '50%',
  },
});

const customComparator = (
  prev: Readonly<WheelProps>,
  next: Readonly<WheelProps>
) => {
  const areEqual =
    prev.value === next.value &&
    prev.setValue === next.setValue &&
    isEqual(prev.styles, next.styles) &&
    isEqual(prev.classNames, next.classNames) &&
    isEqual(prev.items, next.items);

  return areEqual;
};

export default memo(WheelWeb, customComparator);
