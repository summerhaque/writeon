import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { hairline, radius, shadow, space } from '@/theme/layout';
import { useTheme } from '@/theme/use-theme';

import { Tappable } from './tappable';
import { Text } from './text';

interface SurfaceProps {
  children: ReactNode;
  onPress?: () => void;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/** A white card: what everything sits on. */
export function Surface({ children, onPress, accessibilityLabel, style }: SurfaceProps) {
  const { colors } = useTheme();
  const look = [
    styles.surface,
    shadow.sm,
    { backgroundColor: colors.surface, borderColor: colors.border },
    style,
  ];
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
        <View style={styles.eyebrow}>
          <WrittenLines />
          <Text variant="overline" tone="muted" accessibilityRole="header">
            {label}
          </Text>
        </View>
        {action}
      </View>
      {children}
    </View>
  );
}

/** The logo's three written lines, small: the brand's section marker. */
export function WrittenLines({ color }: { color?: string }) {
  const { colors } = useTheme();
  const tint = color ?? colors.sky;
  return (
    <View style={styles.lines} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <View style={[styles.lineBar, { width: 10, backgroundColor: tint }]} />
      <View style={[styles.lineBar, { width: 14, backgroundColor: tint }]} />
      <View style={[styles.lineBar, { width: 8, backgroundColor: tint }]} />
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
    borderWidth: hairline,
    padding: space.lg,
  },
  section: { marginTop: space.xxl, gap: space.sm },
  sectionHead: {
    minHeight: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eyebrow: { flexDirection: 'row', alignItems: 'center', gap: space.xs },
  lines: { gap: 2 },
  lineBar: { height: 3, borderRadius: 2 },
});
