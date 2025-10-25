import React, { type FC, type ReactNode } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export interface RadioButtonProps {
  label?: string;
  selected?: boolean;
  disabled?: boolean;
  value: string;
  onSelect?: (value: string) => void;
  size?: number;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

export interface RadioGroupProps {
  children: ReactNode;
  selectedValue?: string;
  onValueChange?: (value: string) => void;
  style?: ViewStyle;
}

export const RadioButton: FC<RadioButtonProps> = ({
  label,
  selected = false,
  disabled = false,
  value,
  onSelect,
  size = 20,
  style,
  labelStyle,
}) => {
  const { colors } = useTheme();

  const handlePress = () => {
    if (!disabled && onSelect) {
      onSelect(value);
    }
  };

  const radioStyle: ViewStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    borderWidth: 2,
    borderColor: disabled
      ? colors.disabled
      : selected
        ? colors.primary
        : colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  };

  const dotStyle: ViewStyle = {
    width: size * 0.5,
    height: size * 0.5,
    borderRadius: (size * 0.5) / 2,
    backgroundColor: disabled ? colors.disabled : colors.primary,
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={radioStyle}>{selected && <View style={dotStyle} />}</View>
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

export const RadioGroup: FC<RadioGroupProps> = ({
  children,
  selectedValue,
  onValueChange,
  style,
}) => {
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        selected: child.props.value === selectedValue,
        onSelect: onValueChange,
      });
    }
    return child;
  });

  return (
    <View style={[styles.groupContainer, style]}>{childrenWithProps}</View>
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
  groupContainer: {
    marginVertical: 8,
  },
});
