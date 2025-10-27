import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  type TextInputProps,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export interface TextAreaProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  disabled?: boolean;
  maxLength?: number;
  height?: number;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  disabled = false,
  maxLength,
  height = 120,
  value = '',
  ...rest
}) => {
  const { colors } = useTheme();

  const getContainerStyle = (): ViewStyle[] => {
    const baseStyles: ViewStyle[] = [styles.inputContainer];

    if (error) {
      baseStyles.push({ borderColor: colors.danger });
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
        <TextInput
          style={[
            styles.input,
            {
              height,
              color: disabled ? colors.disabled : colors.text,
              textAlignVertical: 'top',
            },
            inputStyle,
          ]}
          multiline
          maxLength={maxLength}
          placeholderTextColor={colors.textLight}
          editable={!disabled}
          value={value}
          {...rest}
        />
      </View>
      <View style={styles.footer}>
        {error ? (
          <Text style={[styles.error, { color: colors.danger }, errorStyle]}>
            {error}
          </Text>
        ) : (
          <Text style={[styles.counter, { color: colors.textLight }]}>
            {value.length}/{maxLength}
          </Text>
        )}
      </View>
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
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  input: {
    padding: 12,
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  error: {
    fontSize: 14,
  },
  counter: {
    fontSize: 12,
  },
});
