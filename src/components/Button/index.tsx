import { type FC, type ReactNode } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  type ViewStyle,
  type TextStyle,
  type TouchableOpacityProps,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends TouchableOpacityProps {
  label: string;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  onLongPress?: () => void;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  variant?: 'filled' | 'outlined' | 'text';
}

const Button: FC<ButtonProps> = ({
  label,
  size = 'medium',
  icon,
  iconPosition = 'left',
  disabled = false,
  onPress,
  onLongPress,
  style,
  labelStyle,
  variant = 'filled',
  ...rest
}) => {
  const { colors } = useTheme();

  const getButtonStyles = (): ViewStyle[] => {
    const baseStyles: ViewStyle[] = [styles.button, styles[size]];

    switch (variant) {
      case 'outlined':
        baseStyles.push({
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: disabled ? colors.disabled : colors.primary,
        } as ViewStyle);
        break;
      case 'text':
        baseStyles.push({
          backgroundColor: 'transparent',
          borderWidth: 0,
        });
        break;
      default:
        baseStyles.push({
          backgroundColor: disabled ? colors.disabled : colors.primary,
        });
    }

    if (disabled) {
      baseStyles.push(styles.disabled);
    }

    if (style) {
      baseStyles.push(style);
    }

    return baseStyles;
  };

  const getLabelStyles = (): TextStyle[] => {
    const baseStyles: TextStyle[] = [styles.label, styles[`${size}Text`]];

    switch (variant) {
      case 'outlined':
      case 'text':
        baseStyles.push({
          color: disabled ? colors.disabled : colors.primary,
        } as TextStyle);
        break;
      default:
        baseStyles.push({
          color: disabled
            ? (colors.textLight ?? '#bbb')
            : colors.background
              ? colors.background
              : '#fff',
        } as TextStyle);
    }

    if (labelStyle) {
      baseStyles.push(labelStyle);
    }

    return baseStyles;
  };

  const renderContent = () => {
    const iconElement = icon ? (
      <View style={styles.iconContainer}>{icon}</View>
    ) : null;

    return (
      <>
        {iconPosition === 'left' && iconElement}
        <Text style={getLabelStyles()}>{label}</Text>
        {iconPosition === 'right' && iconElement}
      </>
    );
  };

  return (
    <TouchableOpacity
      style={getButtonStyles()}
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      activeOpacity={0.7}
      {...rest}
    >
      <View style={styles.contentContainer}>{renderContent()}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginHorizontal: 8,
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    textAlign: 'center',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
});

export default Button;
