import { useState, useRef, type ReactNode, type FC } from 'react';
import {
  View,
  TextInput as RNTextInput,
  Text,
  StyleSheet,
  type TextInputProps as RNTextInputProps,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export interface TextInputProps extends Omit<RNTextInputProps, 'style'> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  disabled?: boolean;
}

export const TextInput: FC<TextInputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  disabled = false,
  onFocus,
  onBlur,
  blurOnSubmit,
  value,
  onChangeText,
  placeholder,
}) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<RNTextInput | null>(null);

  const getContainerStyle = (): ViewStyle[] => {
    const baseStyles: ViewStyle[] = [styles.inputContainer];

    if (error) {
      baseStyles.push({ borderColor: colors.danger });
    } else if (isFocused) {
      baseStyles.push({ borderColor: colors.primary });
    } else if (disabled) {
      baseStyles.push({
        borderColor: colors.border,
        backgroundColor: colors.light,
      });
    }

    return baseStyles;
  };

  return (
    <View style={[styles.container, containerStyle]}>
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
      <View style={getContainerStyle()}>
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
        <RNTextInput
          ref={inputRef}
          style={[
            styles.input,
            { color: disabled ? colors.disabled : colors.text },
            leftIcon ? styles.inputWithLeftIcon : undefined,
            rightIcon ? styles.inputWithRightIcon : undefined,
            inputStyle,
          ]}
          placeholderTextColor={colors.textLight}
          editable={!disabled}
          blurOnSubmit={blurOnSubmit ?? false}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus && onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur && onBlur(e);
          }}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
        />
        {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
      </View>
      {error && (
        <Text style={[styles.error, { color: colors.danger }, errorStyle]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  inputWithLeftIcon: {
    paddingLeft: 8,
  },
  inputWithRightIcon: {
    paddingRight: 8,
  },
  iconContainer: {
    padding: 12,
  },
  error: {
    fontSize: 14,
    marginTop: 4,
  },
});
