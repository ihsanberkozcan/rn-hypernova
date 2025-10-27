/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export interface SliderProps {
  value: number;
  onValueChange?: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  disabled?: boolean;
  style?: ViewStyle;
  trackColor?: string;
  thumbColor?: string;
  thumbSize?: number;
}

export const Slider: React.FC<SliderProps> = ({
  value,
  onValueChange,
  minimumValue = 0,
  maximumValue = 100,
  step = 1,
  disabled = false,
  style,
  trackColor,
  thumbColor,
  thumbSize = 24,
}) => {
  const { colors } = useTheme();
  const [width, setWidth] = useState(0);
  const panX = useRef(new Animated.Value(0)).current;
  const lastOffset = useRef(0);
  const isDragging = useRef(false);

  const getPositionFromValue = useCallback(
    (val: number) => {
      const range = maximumValue - minimumValue;
      const percentage = (val - minimumValue) / range;
      return percentage * width;
    },
    [width, minimumValue, maximumValue]
  );

  const getValueFromPosition = useCallback(
    (position: number): number => {
      const range = maximumValue - minimumValue;
      const percentage = Math.min(Math.max(position / width, 0), 1);
      const rawValue = percentage * range + minimumValue;
      if (step) {
        const steppedValue = Math.round(rawValue / step) * step;
        return Number(
          Math.min(Math.max(steppedValue, minimumValue), maximumValue).toFixed(
            2
          )
        );
      }
      return Number(
        Math.min(Math.max(rawValue, minimumValue), maximumValue).toFixed(2)
      );
    },
    [width, minimumValue, maximumValue, step]
  );

  useEffect(() => {
    if (width > 0 && !isDragging.current) {
      const position = getPositionFromValue(value);
      panX.setValue(position);
      lastOffset.current = position;
    }
  }, [width, value, getPositionFromValue, panX]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => !disabled,
        onMoveShouldSetPanResponder: () => !disabled,
        onPanResponderGrant: () => {
          isDragging.current = true;
          lastOffset.current = (panX as any).__getValue();
        },
        onPanResponderMove: (_, gesture) => {
          const newPosition = Math.min(
            Math.max(lastOffset.current + gesture.dx, 0),
            width
          );
          panX.setValue(newPosition);
          const newValue = getValueFromPosition(newPosition);
          onValueChange?.(newValue);
        },
        onPanResponderRelease: () => {
          const currentX = (panX as any).__getValue();
          const newValue = getValueFromPosition(currentX);
          lastOffset.current = getPositionFromValue(newValue);
          panX.setValue(lastOffset.current);
          onValueChange?.(newValue);
          isDragging.current = false;
        },
      }),
    [
      disabled,
      width,
      getValueFromPosition,
      getPositionFromValue,
      onValueChange,
      panX,
    ]
  );

  return (
    <View
      style={[styles.container, style]}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      <View
        style={[
          styles.track,
          {
            backgroundColor: disabled ? colors.disabled : colors.border,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.progress,
            {
              backgroundColor: disabled
                ? colors.disabled
                : (trackColor ?? colors.primary),
              width: panX,
            },
          ]}
        />
      </View>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.thumb,
          {
            width: thumbSize,
            height: thumbSize,
            borderRadius: thumbSize / 2,
            backgroundColor: disabled
              ? colors.disabled
              : (thumbColor ?? colors.primary),
            transform: [{ translateX: Animated.subtract(panX, thumbSize / 2) }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
  },
  track: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progress: {
    ...StyleSheet.absoluteFillObject,
    height: 4,
  },
  thumb: {
    position: 'absolute',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
