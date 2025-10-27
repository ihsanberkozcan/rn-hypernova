/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  type ViewStyle,
  type DimensionValue,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';

type SkeletonVariant = 'text' | 'circle' | 'rectangle';

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: DimensionValue;
  height?: DimensionValue;
  style?: ViewStyle;
  animated?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangle',
  width,
  height,
  style,
  animated = true,
}) => {
  const { colors } = useTheme();
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    if (animated) {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0.7,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.3,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
      return () => animation.stop();
    }
    return undefined;
  }, [animated]);

  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'circle':
        const size =
          typeof width === 'string'
            ? 50
            : (width as number) || (height as number) || 50;
        return {
          width: size,
          height: size,
          borderRadius: size / 2,
        };
      case 'text':
        return {
          width: width || '100%',
          height: height || 16,
          borderRadius: 4,
        };
      default:
        return {
          width: width || '100%',
          height: height || 50,
          borderRadius: 8,
        };
    }
  };

  return (
    <Animated.View
      style={[
        styles.skeleton,
        getVariantStyle(),
        { backgroundColor: colors.border },
        { opacity },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    overflow: 'hidden',
  },
});
