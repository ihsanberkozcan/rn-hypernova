import { type FC, type ReactNode } from 'react';
import { TouchableOpacity, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export interface FabProps {
  icon: ReactNode;
  onPress?: () => void;
  size?: 'small' | 'normal' | 'large';
  color?: string;
  style?: ViewStyle;
}

const SIZES = {
  small: 40,
  normal: 56,
  large: 72,
};

export const Fab: FC<FabProps> = ({
  icon,
  onPress,
  size = 'normal',
  color,
  style,
}) => {
  const { colors } = useTheme();
  const dimension = SIZES[size];
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.button,
        {
          width: dimension,
          height: dimension,
          borderRadius: dimension / 2,
          backgroundColor: color ?? colors.primary,
        },
        style,
      ]}
    >
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.24,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
});
