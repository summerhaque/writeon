import { Feather } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

import { useTheme } from '@/theme/use-theme';

import { Tappable } from './tappable';

interface IconButtonProps {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  onPress: () => void;
  tone?: 'ink' | 'muted';
  size?: number;
}

/** A 44pt target around a small icon. */
export function IconButton({ icon, label, onPress, tone = 'ink', size = 22 }: IconButtonProps) {
  const { colors } = useTheme();
  return (
    <Tappable accessibilityLabel={label} hitSlop={6} onPress={onPress} pressScale={0.9} style={styles.button}>
      <Feather name={icon} size={size} color={colors[tone]} />
    </Tappable>
  );
}

const styles = StyleSheet.create({
  button: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
});
