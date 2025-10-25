import { type FC } from 'react';
import {
  View,
  StyleSheet,
  type ViewStyle,
  type DimensionValue,
} from 'react-native';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  color?: string;
  thickness?: number;
  length?: DimensionValue;
  style?: ViewStyle;
}

export const Divider: FC<DividerProps> = ({
  orientation = 'horizontal',
  color = '#E0E0E0',
  thickness = 1,
  length,
  style,
}) => {
  const dividerStyle: ViewStyle = {
    backgroundColor: color,
    ...(orientation === 'horizontal'
      ? {
          height: thickness,
          width: length || '100%',
        }
      : {
          width: thickness,
          height: length || '100%',
        }),
  };

  return <View style={[styles.divider, dividerStyle, style]} />;
};

const styles = StyleSheet.create({
  divider: {
    alignSelf: 'center',
  },
});
