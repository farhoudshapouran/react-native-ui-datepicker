import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  memo,
  useCallback,
} from 'react';
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
import { PickerOption } from '../../../types';

interface Props {
  value: number | string;
  options: PickerOption[];
  onChange: (index: number | string) => void;
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

const REPEAT = 7; // numTimes to repeat [0..23] options (for infinite effect)
const MID_BLOCK = Math.floor(REPEAT / 2);
const wrap = (i: number, len: number) => (len ? ((i % len) + len) % len : 0); // wrap index into [0,len-1] so scrolling past end maps to start (and vice versa).

const WheelPicker: React.FC<Props> = ({
  value,
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
  decelerationRate = 'normal',
  containerProps = {},
  flatListProps = {},
}) => {
  // ----- stable refs/state (always called in the same order) -----
  const momentumStarted = useRef(false);
  const flatListRef = useRef<FlatList>(null);
  const internalChangeRef = useRef(false); // set when user scroll triggers onChange
  const isInitRef = useRef(true); // ignore first settle
  const currentTopIndexRef = useRef<number | null>(null); // last settled TOP row index in repeated list
  const [scrollY] = useState(new Animated.Value(0)); // set real offset after mount

  // ----- derive safe inputs (no throws; keep hooks unconditional) -----
  const baseLen = options?.length ?? 0;
  const hasOptions = baseLen > 0;

  // If value not found, fall back to index 0. (Do not throw during render.)
  const baseSelectedIndexUnsafe = hasOptions
    ? options.findIndex((it) => it.value === value)
    : 0;
  const baseSelectedIndex =
    baseSelectedIndexUnsafe >= 0 ? baseSelectedIndexUnsafe : 0;

  // Repeated core + padding (nulls at top/bottom), independent of value lookups
  const paddedOptions = useMemo(() => {
    const core: (PickerOption | null)[] = [];
    if (hasOptions) {
      for (let b = 0; b < REPEAT; b++) core.push(...options);
    }
    // even if empty, still add padding to avoid hook-order issues
    for (let i = 0; i < visibleRest; i++) {
      core.unshift(null);
      core.push(null);
    }
    return core;
  }, [options, visibleRest, hasOptions]);

  const containerHeight = (1 + visibleRest * 2) * itemHeight;

  // Offsets: one per padded row
  const offsets = useMemo(
    () => [...Array(paddedOptions.length)].map((_, i) => i * itemHeight),
    [paddedOptions, itemHeight]
  );

  // TOP row index to start on (middle block gives headroom both ways)
  const initialTopIndex = hasOptions
    ? MID_BLOCK * baseLen + baseSelectedIndex
    : 0;
  const initialOffset = initialTopIndex * itemHeight;

  // Items expect padded index transforms; keep original formula
  const currentScrollIndex = useMemo(
    () => Animated.add(Animated.divide(scrollY, itemHeight), visibleRest),
    [visibleRest, scrollY, itemHeight]
  );

  // Finish initialization after we position via offset (avoid queue errors; no throws)
  useEffect(() => {
    // seed the offset only once, on mount or when options shape changes
    requestAnimationFrame(() => {
      flatListRef.current?.scrollToOffset({
        offset: initialOffset,
        animated: false,
      });
      currentTopIndexRef.current = initialTopIndex;
      requestAnimationFrame(() => {
        setTimeout(() => {
          isInitRef.current = false;
        }, 0);
      });
    });
  }, [initialOffset, initialTopIndex, baseLen]);

  // Stable helper: nearest matching TOP index in repeated data
  const nearestTopIndex = useCallback(
    (baseIdx: number, currentTopIdx: number) => {
      if (!hasOptions) return 0;
      let best = MID_BLOCK * baseLen + baseIdx;
      let bestDist = Number.POSITIVE_INFINITY;
      for (let b = 0; b < REPEAT; b++) {
        const idx = b * baseLen + baseIdx; // TOP index in block b
        const dist = Math.abs(idx - currentTopIdx);
        if (dist < bestDist) {
          best = idx;
          bestDist = dist;
        }
      }
      return best;
    },
    [baseLen, hasOptions]
  );

  // End-of-scroll → compute TOP index → map to base via modulo (no -visibleRest)
  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isInitRef.current || !hasOptions) return;

    const y = Math.max(0, event.nativeEvent.contentOffset.y);
    let topIdx = Math.floor(y / itemHeight);
    const rem = y % itemHeight;
    if (rem > itemHeight / 2) topIdx++;

    currentTopIndexRef.current = topIdx;

    const baseIdx = wrap(topIdx, baseLen);
    if (baseIdx !== baseSelectedIndex) {
      internalChangeRef.current = true;
      onChange(options[baseIdx]!.value);
    }
  };

  const handleMomentumScrollBegin = () => {
    momentumStarted.current = true;
  };
  const handleMomentumScrollEnd = (
    e: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    momentumStarted.current = false;
    handleScrollEnd(e);
  };
  const handleScrollEndDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset?.y;
    setTimeout(() => {
      if (!momentumStarted.current && y !== undefined) {
        handleScrollEnd({ nativeEvent: { contentOffset: { y } } } as any);
      }
    }, 50);
  };

  // External value change → jump (via OFFSET) to nearest matching TOP index
  useEffect(() => {
    if (!hasOptions) return;

    if (internalChangeRef.current) {
      internalChangeRef.current = false; // user scroll; keep wheel where it is
      return;
    }
    const curTop = currentTopIndexRef.current ?? initialTopIndex;
    const targetTop = nearestTopIndex(baseSelectedIndex, curTop);
    const targetOffset = targetTop * itemHeight;

    flatListRef.current?.scrollToOffset({
      offset: targetOffset,
      animated: Platform.OS === 'ios',
    });
  }, [
    baseSelectedIndex,
    itemHeight,
    initialTopIndex,
    nearestTopIndex,
    hasOptions,
  ]);

  return (
    <View
      style={[styles.container, { height: containerHeight }, containerStyle]}
      {...containerProps}
    >
      <View
        style={[
          styles.selectedIndicator,
          selectedIndicatorStyle,
          { transform: [{ translateY: -itemHeight / 2 }], height: itemHeight },
        ]}
        className={selectedIndicatorClassName}
      />
      <Animated.FlatList
        {...flatListProps}
        ref={flatListRef}
        nestedScrollEnabled
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        onScrollEndDrag={handleScrollEndDrag}
        onMomentumScrollBegin={handleMomentumScrollBegin}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        snapToOffsets={offsets}
        decelerationRate={decelerationRate}
        // no initialScrollIndex; we seed via scrollToOffset to avoid queue errors
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
        data={paddedOptions}
        keyExtractor={(item, index) =>
          item ? `${item.value}-${item.text}-${index}` : `null-${index}`
        }
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

export default memo(WheelPicker);
