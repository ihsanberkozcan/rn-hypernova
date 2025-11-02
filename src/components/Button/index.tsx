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
export type ButtonVariant = 'filled' | 'outlined' | 'text';

export interface ButtonProps extends TouchableOpacityProps {
  label?: string;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  onLongPress?: () => void;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  variant?: ButtonVariant;
}

const sizeStyles: Record<ButtonSize, ViewStyle> = {
  small: { paddingVertical: 8, paddingHorizontal: 16 },
  medium: { paddingVertical: 12, paddingHorizontal: 24 },
  large: { paddingVertical: 16, paddingHorizontal: 32 },
};

const iconOnlySizeStyles: Record<ButtonSize, ViewStyle> = {
  small: { width: 36, height: 36 },
  medium: { width: 44, height: 44 },
  large: { width: 56, height: 56 },
};

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
  const isIconOnly = !!icon && !label;

  const getButtonStyles = (): ViewStyle[] => {
    const baseStyles: ViewStyle[] = [
      styles.button,
      isIconOnly ? iconOnlySizeStyles[size] : sizeStyles[size],
    ];

    switch (variant) {
      case 'outlined':
        baseStyles.push({
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: disabled ? colors.disabled : colors.primary,
        });
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

    if (disabled) baseStyles.push(styles.disabled);
    if (style) baseStyles.push(style);

    return baseStyles;
  };

  const getLabelStyles = (): TextStyle[] => {
    const baseStyles: TextStyle[] = [styles.label, textSizeStyles[size]];

    switch (variant) {
      case 'outlined':
      case 'text':
        baseStyles.push({
          color: disabled ? colors.disabled : colors.primary,
        });
        break;
      default:
        baseStyles.push({
          color: disabled
            ? (colors.textLight ?? '#bbb')
            : (colors.background ?? '#fff'),
        });
    }

    if (labelStyle) baseStyles.push(labelStyle);
    return baseStyles;
  };

  const renderContent = (): ReactNode => {
    const iconElement = icon ? (
      <View style={isIconOnly ? undefined : styles.iconContainer}>{icon}</View>
    ) : null;

    if (isIconOnly) {
      return iconElement;
    }

    return (
      <>
        {iconPosition === 'left' && iconElement}
        {label && <Text style={getLabelStyles()}>{label}</Text>}
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
      <View
        style={[
          styles.contentContainer,
          isIconOnly && styles.iconOnlyContainer,
        ]}
      >
        {renderContent()}
      </View>
    </TouchableOpacity>
  );
};

const textSizeStyles: Record<ButtonSize, TextStyle> = {
  small: { fontSize: 14 },
  medium: { fontSize: 16 },
  large: { fontSize: 18 },
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
  iconOnlyContainer: {
    flexDirection: 'column',
  },
  iconContainer: {
    marginHorizontal: 8,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    textAlign: 'center',
  },
});

export default Button;
