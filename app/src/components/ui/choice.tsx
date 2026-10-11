import { Feather } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { haptics } from '@/lib/haptics';
import { hairline, radius, space } from '@/theme/layout';
import { fontFamily } from '@/theme/typography';
import { useTheme } from '@/theme/use-theme';

import { Tappable } from './tappable';
import { Text } from './text';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress: () => void;
}

/** A small, single-line choice. */
export function Chip({ label, selected = false, onPress }: ChipProps) {
  const { colors } = useTheme();
  return (
    <Tappable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={() => {
        haptics.select();
        onPress();
      }}
      pressScale={0.95}
      style={[
        styles.chip,
        selected
          ? { backgroundColor: colors.primary, borderColor: colors.primary }
          : { borderColor: colors.border, backgroundColor: colors.surface },
      ]}>
      <Text
        variant="footnote"
        style={styles.chipLabel}
        tone={selected ? 'onPrimary' : 'ink'}
        numberOfLines={1}>
        {label}
      </Text>
    </Tappable>
  );
}

interface OptionProps {
  title: string;
  detail?: string;
  selected?: boolean;
  onPress: () => void;
  /** Artwork on the leading edge, like a plate thumbnail. */
  media?: ReactNode;
}

/** A large answer to a question: one per row, easy to hit. */
export function Option({ title, detail, selected = false, onPress, media }: OptionProps) {
  const { colors } = useTheme();
  return (
    <Tappable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={detail ? `${title}. ${detail}` : title}
      onPress={() => {
        haptics.select();
        onPress();
      }}
      pressScale={0.985}
      style={[
        styles.option,
        {
          backgroundColor: colors.surface,
          borderColor: selected ? colors.ink : colors.border,
          borderWidth: selected ? hairline * 4 : hairline * 2,
        },
      ]}>
      {media}
      <View style={styles.optionText}>
        <Text variant="title3">{title}</Text>
        {detail ? (
          <Text variant="callout" tone="muted">
            {detail}
          </Text>
        ) : null}
      </View>
      <View
        style={[
          styles.radio,
          { borderColor: selected ? colors.ink : colors.border },
          selected && { backgroundColor: colors.primary },
        ]}>
        {selected ? <Feather name="check" size={14} color={colors.onPrimary} /> : null}
      </View>
    </Tappable>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: 36,
    paddingHorizontal: space.md,
    borderRadius: radius.pill,
    borderWidth: hairline * 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipLabel: { fontFamily: fontFamily.sansSemibold },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    padding: space.md,
    borderRadius: radius.lg,
  },
  optionText: { flex: 1, gap: 2 },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: hairline * 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
