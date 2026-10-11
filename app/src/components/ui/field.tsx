import { useState } from 'react';
import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { hairline, radius, space } from '@/theme/layout';
import { fontFamily, MAX_FONT_SCALE, type } from '@/theme/typography';
import { useTheme } from '@/theme/use-theme';

import { Text } from './text';

export interface FieldProps extends Omit<TextInputProps, 'style' | 'multiline'> {
  label?: string;
  hint?: string;
  /** Set in Fraunces: this is the writer's story, not a form. */
  story?: boolean;
  /** Grow with the text, starting at this many lines. */
  lines?: number;
}

export function Field({ label, hint, story = false, lines = 1, onFocus, onBlur, ...input }: FieldProps) {
  const { colors } = useTheme();
  const [focused, setFocused] = useState(false);
  const multiline = lines > 1;
  const text = story ? type.story : type.body;
  const minHeight = multiline ? text.lineHeight * lines + space.md * 2 : 50;

  return (
    <View style={styles.wrap}>
      {label ? <Text variant="label">{label}</Text> : null}
      {hint ? (
        <Text variant="footnote" tone="muted">
          {hint}
        </Text>
      ) : null}
      <TextInput
        accessibilityLabel={label}
        accessibilityHint={hint}
        maxFontSizeMultiplier={MAX_FONT_SCALE}
        placeholderTextColor={colors.faint}
        selectionColor={colors.accent}
        cursorColor={colors.ink}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        scrollEnabled={false}
        onFocus={(event) => {
          setFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          onBlur?.(event);
        }}
        {...input}
        style={[
          styles.input,
          {
            minHeight,
            fontFamily: story ? fontFamily.serif : fontFamily.sans,
            fontSize: text.fontSize,
            lineHeight: multiline ? text.lineHeight : undefined,
            color: colors.ink,
            backgroundColor: colors.surface,
            borderColor: focused ? colors.ink : colors.border,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: space.xs },
  input: {
    borderWidth: hairline * 2,
    borderRadius: radius.md,
    paddingHorizontal: space.md,
    paddingTop: space.sm + 2,
    paddingBottom: space.sm + 2,
  },
});
