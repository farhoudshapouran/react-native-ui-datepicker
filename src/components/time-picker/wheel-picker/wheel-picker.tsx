import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  StyleProp,
  TextStyle,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Animated,
  ViewStyle,
  View,
  ViewProps,
  FlatListProps,
  FlatList,
  Platform,
} from 'react-native';
import styles from './wheel-picker.style';
import WheelPickerItem from './wheel-picker-item';

interface Props {
  selectedIndex: number;
  options: string[];
  onChange: (index: number) => void;
  selectedIndicatorStyle?: StyleProp<ViewStyle>;
  itemTextStyle?: TextStyle;
  itemTextClassName?: string;
  itemStyle?: ViewStyle;
  selectedIndicatorClassName?: string;
  itemHeight?: number;
  containerStyle?: ViewStyle;
  containerProps?: Omit<ViewProps, 'style'>;
  scaleFunction?: (x: number) => number;
  rotationFunction?: (x: number) => number;
  opacityFunction?: (x: number) => number;
  visibleRest?: number;
  decelerationRate?: 'normal' | 'fast' | number;
  flatListProps?: Omit<FlatListProps<string | null>, 'data' | 'renderItem'>;
}

const WheelPicker: React.FC<Props> = ({
  selectedIndex,
  options,
  onChange,
  selectedIndicatorStyle = {},
  containerStyle = {},
  itemStyle = {},
  itemTextStyle = {},
  selectedIndicatorClassName = '',
  itemTextClassName = '',
  itemHeight = 40,
  scaleFunction = (x: number) => 1.0 ** x,
  rotationFunction = (x: number) => 1 - Math.pow(1 / 2, x),
  opacityFunction = (x: number) => Math.pow(1 / 3, x),
  visibleRest = 2,
  decelerationRate = 'fast',
  containerProps = {},
  flatListProps = {},
}) => {
  const flatListRef = useRef<FlatList>(null);
  const [scrollY] = useState(new Animated.Value(selectedIndex * itemHeight));

  const containerHeight = (1 + visibleRest * 2) * itemHeight;
  const paddedOptions = useMemo(() => {
    const array: (string | null)[] = [...options];
    for (let i = 0; i < visibleRest; i++) {
      array.unshift(null);
      array.push(null);
    }
    return array;
  }, [options, visibleRest]);

  const offsets = useMemo(
    () => [...Array(paddedOptions.length)].map((_, i) => i * itemHeight),
    [paddedOptions, itemHeight]
  );

  const currentScrollIndex = useMemo(
    () => Animated.add(Animated.divide(scrollY, itemHeight), visibleRest),
    [visibleRest, scrollY, itemHeight]
  );

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    // Due to list bounciness when scrolling to the start or the end of the list
    // the offset might be negative or over the last item.
    // We therefore clamp the offset to the supported range.
    const offsetY = Math.min(
      itemHeight * (options.length - 1),
      Math.max(event.nativeEvent.contentOffset.y, 0)
    );

    let index = Math.floor(Math.floor(offsetY) / itemHeight);
    const last = Math.floor(offsetY % itemHeight);
    if (last > itemHeight / 2) {
      index++;
    }

    if (index !== selectedIndex) {
      onChange(index);
    }
  };

  useEffect(() => {
    if (selectedIndex < 0 || selectedIndex >= options.length) {
      throw new Error(
        `Selected index ${selectedIndex} is out of bounds [0, ${
          options.length - 1
        }]`
      );
    }
  }, [selectedIndex, options]);

  /**
   * If selectedIndex is changed from outside (not via onChange) we need to scroll to the specified index.
   * This ensures that what the user sees as selected in the picker always corresponds to the value state.
   */
  useEffect(() => {
    flatListRef.current?.scrollToIndex({
      index: selectedIndex,
      animated: Platform.OS === 'ios',
    });
  }, [selectedIndex, itemHeight]);

  return (
    <View
      style={[styles.container, { height: containerHeight }, containerStyle]}
      {...containerProps}
    >
      <View
        style={[
          styles.selectedIndicator,
          selectedIndicatorStyle,
          {
            transform: [{ translateY: -itemHeight / 2 }],
            height: itemHeight,
          },
        ]}
        className={selectedIndicatorClassName}
      />
      <Animated.FlatList<string | null>
        {...flatListProps}
        ref={flatListRef}
        nestedScrollEnabled
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        snapToOffsets={offsets}
        decelerationRate={decelerationRate}
        initialScrollIndex={selectedIndex}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
        data={paddedOptions}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item: option, index }) => (
          <WheelPickerItem
            key={`option-${index}`}
            index={index}
            option={option}
            style={itemStyle}
            textStyle={itemTextStyle}
            textClassName={itemTextClassName}
            height={itemHeight}
            currentScrollIndex={currentScrollIndex}
            scaleFunction={scaleFunction}
            rotationFunction={rotationFunction}
            opacityFunction={opacityFunction}
            visibleRest={visibleRest}
          />
        )}
      />
    </View>
  );
};

export default WheelPicker;
