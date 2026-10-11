import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { gutter } from '@/theme/layout';

import { IconButton } from './icon-button';
import { Text } from './text';

interface TopBarProps {
  title?: string;
  /** `back` pops the stack; `close` dismisses a modal. */
  leading?: 'back' | 'close' | 'none';
  onLeadingPress?: () => void;
  trailing?: ReactNode;
}

/** Leaves safely even when there's nothing behind this screen to go back to. */
export function goBackOr(fallback: '/' = '/') {
  if (router.canGoBack()) router.back();
  else router.replace(fallback);
}

export function TopBar({ title, leading = 'back', onLeadingPress, trailing }: TopBarProps) {
  return (
    <View style={styles.bar}>
      <View style={styles.side}>
        {leading !== 'none' && (
          <IconButton
            icon={leading === 'back' ? 'chevron-back' : 'close'}
            label={leading === 'back' ? 'Back' : 'Close'}
            size={leading === 'back' ? 26 : 22}
            onPress={onLeadingPress ?? (() => goBackOr())}
          />
        )}
      </View>
      <View style={styles.center} pointerEvents="none">
        {title ? (
          <Text variant="label" numberOfLines={1} align="center" accessibilityRole="header">
            {title}
          </Text>
        ) : null}
      </View>
      <View style={[styles.side, styles.trailing]}>{trailing}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: gutter - 12,
  },
  side: { minWidth: 88, flexDirection: 'row', alignItems: 'center' },
  trailing: { justifyContent: 'flex-end' },
  center: { flex: 1, alignItems: 'center' },
});
