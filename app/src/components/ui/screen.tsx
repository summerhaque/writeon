import type { ReactNode, Ref } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  type ScrollViewProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { gutter, MAX_CONTENT_WIDTH, space } from '@/theme/layout';
import { useTheme } from '@/theme/use-theme';

interface ScreenProps {
  children: ReactNode;
  /** Pinned above the content: a header bar. */
  header?: ReactNode;
  /** Pinned below the content: a primary action. */
  footer?: ReactNode;
  /** Scroll the content. Most screens do. */
  scroll?: boolean;
  /** Tab screens sit above the tab bar, which handles the bottom inset. */
  edges?: Edge[];
  contentStyle?: StyleProp<ViewStyle>;
  scrollRef?: Ref<ScrollView>;
  scrollProps?: Omit<ScrollViewProps, 'contentContainerStyle' | 'children'>;
}

export function Screen({
  children,
  header,
  footer,
  scroll = true,
  edges = ['top', 'bottom'],
  contentStyle,
  scrollRef,
  scrollProps,
}: ScreenProps) {
  const { colors } = useTheme();
  const body = scroll ? (
    <ScrollView
      ref={scrollRef}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="interactive"
      showsVerticalScrollIndicator={false}
      automaticallyAdjustKeyboardInsets={false}
      {...scrollProps}
      contentContainerStyle={[styles.content, contentStyle]}>
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, styles.fill, contentStyle]}>{children}</View>
  );

  return (
    <SafeAreaView edges={edges} style={[styles.fill, { backgroundColor: colors.background }]}>
      {header}
      <KeyboardAvoidingView style={styles.fill} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {body}
        {footer ? (
          <View
            style={[styles.footer, { borderTopColor: colors.border, backgroundColor: colors.background }]}>
            <View style={styles.footerInner}>{footer}</View>
          </View>
        ) : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  content: {
    paddingHorizontal: gutter,
    paddingBottom: space.xxxl,
    width: '100%',
    maxWidth: MAX_CONTENT_WIDTH,
    alignSelf: 'center',
  },
  footer: {
    paddingHorizontal: gutter,
    paddingTop: space.sm,
    paddingBottom: space.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  footerInner: { width: '100%', maxWidth: MAX_CONTENT_WIDTH, alignSelf: 'center' },
});
