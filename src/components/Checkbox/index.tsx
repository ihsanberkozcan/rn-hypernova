import { type FC } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export interface CheckboxProps {
  checked: boolean;
  onPress?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: number;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

export const Checkbox: FC<CheckboxProps> = ({
  checked,
  onPress,
  label,
  disabled = false,
  size = 24,
  style,
  labelStyle,
}) => {
  const { colors } = useTheme();

  const handlePress = () => {
    if (!disabled && onPress) {
      onPress(!checked);
    }
  };

  const checkboxStyle: ViewStyle = {
    width: size,
    height: size,
    borderRadius: size * 0.15,
    backgroundColor: checked ? colors.primary : colors.background,
    borderWidth: 2,
    borderColor: checked ? colors.primary : colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: disabled ? 0.5 : 1,
  };

  const checkStyle: ViewStyle = {
    width: size * 0.5,
    height: size * 0.25,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: checked ? colors.background : 'transparent',
    transform: [{ rotate: '-45deg' }],
    marginTop: -size * 0.05,
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={checkboxStyle}>
        <View style={checkStyle} />
      </View>
      {label && (
        <Text
          style={[
            styles.label,
            { color: disabled ? colors.disabled : colors.text },
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
  },
});
