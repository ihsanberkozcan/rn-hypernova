/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import { useEffect, useLayoutEffect, useRef, type FC } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
  type ViewStyle,
  Easing,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export interface SwitchProps {
  value: boolean;
  onValueChange?: (value: boolean) => void;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  thumbColor?: string;
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

const SIZES = {
  small: {
    width: 40,
    height: 24,
    thumbSize: 20,
  },
  medium: {
    width: 50,
    height: 30,
    thumbSize: 26,
  },
  large: {
    width: 60,
    height: 36,
    thumbSize: 32,
  },
};

export const Switch: FC<SwitchProps> = ({
  value,
  onValueChange,
  onChange,
  disabled = false,
  thumbColor = '#FFFFFF',
  size = 'medium',
  style,
}) => {
  const { colors } = useTheme();
  const switchSize = SIZES[size];
  const translateX = useRef(new Animated.Value(0)).current;
  const prevValueRef = useRef<boolean | null>(null);
  const prevSizeRef = useRef({
    width: switchSize.width,
    thumbSize: switchSize.thumbSize,
  });

  const computeToValue = (
    val: boolean,
    width = switchSize.width,
    thumbSize = switchSize.thumbSize
  ) => (val ? width - thumbSize - 2 : 2);

  useLayoutEffect(() => {
    const sizeChanged =
      prevSizeRef.current.width !== switchSize.width ||
      prevSizeRef.current.thumbSize !== switchSize.thumbSize;

    const toValue = computeToValue(
      value,
      switchSize.width,
      switchSize.thumbSize
    );

    if (prevValueRef.current === null) {
      translateX.setValue(toValue);
      prevValueRef.current = value;
      prevSizeRef.current = {
        width: switchSize.width,
        thumbSize: switchSize.thumbSize,
      };
      return;
    }

    if (sizeChanged) {
      translateX.setValue(toValue);
      prevSizeRef.current = {
        width: switchSize.width,
        thumbSize: switchSize.thumbSize,
      };
      prevValueRef.current = value;
    }
  }, [switchSize.width, switchSize.thumbSize, value, translateX]);

  useEffect(() => {
    if (prevValueRef.current === null) return;
    if (prevValueRef.current === value) return;

    const toValue = computeToValue(
      value,
      switchSize.width,
      switchSize.thumbSize
    );
    Animated.timing(translateX, {
      toValue,
      duration: 200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      prevValueRef.current = value;
    });
  }, [value, switchSize.width, switchSize.thumbSize, translateX]);

  const handlePress = () => {
    if (disabled) return;
    const newVal = !value;
    if (onChange) onChange(newVal);
    else if (onValueChange) onValueChange(newVal);
  };

  return (
    <TouchableOpacity
      style={style}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.track,
          {
            width: switchSize.width,
            height: switchSize.height,
            backgroundColor: disabled
              ? colors.disabled
              : value
                ? colors.primary
                : colors.border,
            opacity: disabled ? 0.5 : 1,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              width: switchSize.thumbSize,
              height: switchSize.thumbSize,
              backgroundColor: thumbColor,
              transform: [{ translateX }],
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  track: {
    borderRadius: 999,
    justifyContent: 'center',
  },
  thumb: {
    borderRadius: 999,
  },
});
