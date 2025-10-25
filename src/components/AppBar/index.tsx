import { type FC, type ReactNode } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export interface AppBarProps {
  title?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  style?: ViewStyle;
}

export const AppBar: FC<AppBarProps> = ({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  style,
}) => {
  const { colors } = useTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: colors.primary }, style]}
    >
      <TouchableOpacity onPress={onLeftPress} style={styles.side}>
        {leftIcon}
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        {title ? (
          <Text numberOfLines={1} style={[styles.title, { color: '#fff' }]}>
            {title}
          </Text>
        ) : null}
      </View>

      <TouchableOpacity onPress={onRightPress} style={styles.side}>
        {rightIcon}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    elevation: 4,
  },
  side: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
});
