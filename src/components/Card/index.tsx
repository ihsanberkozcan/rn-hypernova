import { type FC, type ReactNode } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export interface CardProps {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

export const Card: FC<CardProps> = ({
  title,
  subtitle,
  children,
  onPress,
  style,
}) => {
  const { colors } = useTheme();
  const Container: any = onPress ? TouchableOpacity : View;

  return (
    <Container
      onPress={onPress}
      style={[
        styles.card,
        { borderColor: colors.border, backgroundColor: '#fff' },
        style,
      ]}
    >
      {title ? (
        <Text style={[styles.title, { color: colors.dark }]}>{title}</Text>
      ) : null}
      {subtitle ? (
        <Text style={[styles.subtitle, { color: colors.textLight }]}>
          {subtitle}
        </Text>
      ) : null}
      <View style={styles.content}>{children}</View>
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 4,
  },
  content: {
    marginTop: 8,
  },
});
