import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { hairline, radius, space } from '@/theme/layout';
import { useTheme } from '@/theme/use-theme';

import { Tappable } from './tappable';
import { Text } from './text';

interface SurfaceProps {
  children: ReactNode;
  onPress?: () => void;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/** A sheet of good paper: the card everything sits on. */
export function Surface({ children, onPress, accessibilityLabel, style }: SurfaceProps) {
  const { colors } = useTheme();
  const look = [styles.surface, { backgroundColor: colors.surface, borderColor: colors.border }, style];
  if (!onPress) return <View style={look}>{children}</View>;
  return (
    <Tappable accessibilityLabel={accessibilityLabel} onPress={onPress} pressScale={0.985} style={look}>
      {children}
    </Tappable>
  );
}

interface SectionProps {
  label: string;
  action?: ReactNode;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

/** A labelled group on a screen. Every screen spaces its sections the same way. */
export function Section({ label, action, children, style }: SectionProps) {
  return (
    <View style={[styles.section, style]}>
      <View style={styles.sectionHead}>
        <Text variant="overline" tone="muted" accessibilityRole="header">
          {label}
        </Text>
        {action}
      </View>
      {children}
    </View>
  );
}

export function Rule({ style }: { style?: StyleProp<ViewStyle> }) {
  const { colors } = useTheme();
  return <View style={[{ height: hairline, backgroundColor: colors.border }, style]} />;
}

const styles = StyleSheet.create({
  surface: {
    borderRadius: radius.lg,
    borderWidth: hairline * 2,
    padding: space.md,
  },
  section: { marginTop: space.xxl, gap: space.sm },
  sectionHead: {
    minHeight: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
