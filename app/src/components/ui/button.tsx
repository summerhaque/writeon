import { Feather } from '@expo/vector-icons';
import { ActivityIndicator, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { haptics } from '@/lib/haptics';
import { hairline, radius, space } from '@/theme/layout';
import { fontFamily } from '@/theme/typography';
import { useTheme } from '@/theme/use-theme';

import { Tappable } from './tappable';
import { Text } from './text';

type Variant = 'primary' | 'secondary' | 'quiet' | 'accent';
type Size = 'lg' | 'md' | 'sm';

export interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  icon?: keyof typeof Feather.glyphMap;
  iconPosition?: 'start' | 'end';
  disabled?: boolean;
  loading?: boolean;
  /** Stretch to the width of the container. */
  block?: boolean;
  accessibilityHint?: string;
  style?: StyleProp<ViewStyle>;
}

const HEIGHT: Record<Size, number> = { lg: 54, md: 46, sm: 36 };
const PADDING: Record<Size, number> = { lg: space.xl, md: space.lg, sm: space.sm };

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'lg',
  icon,
  iconPosition = 'start',
  disabled = false,
  loading = false,
  block = false,
  accessibilityHint,
  style,
}: ButtonProps) {
  const { colors } = useTheme();
  const inactive = disabled || loading;

  const surface: Record<Variant, ViewStyle> = {
    primary: { backgroundColor: colors.primary },
    accent: { backgroundColor: colors.accent },
    secondary: { borderWidth: hairline * 2, borderColor: colors.ink },
    quiet: {},
  };
  const textColor: Record<Variant, string> = {
    primary: colors.onPrimary,
    accent: colors.onAccent,
    secondary: colors.ink,
    quiet: colors.ink,
  };
  const color = textColor[variant];
  const iconNode = icon ? <Feather name={icon} size={size === 'sm' ? 16 : 18} color={color} /> : null;

  return (
    <Tappable
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: inactive, busy: loading }}
      disabled={inactive}
      onPress={() => {
        if (variant === 'primary' || variant === 'accent') haptics.tap();
        onPress();
      }}
      pressScale={block ? 0.985 : 0.97}
      style={[
        styles.base,
        { height: HEIGHT[size], paddingHorizontal: variant === 'quiet' ? space.xs : PADDING[size] },
        size === 'sm' && { borderRadius: radius.sm },
        surface[variant],
        block && styles.block,
        inactive && !loading && styles.disabled,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={color} />
      ) : (
        <View style={styles.content}>
          {iconPosition === 'start' && iconNode}
          <Text
            variant={size === 'sm' ? 'footnote' : 'label'}
            numberOfLines={1}
            style={[{ color }, size === 'sm' && styles.smallLabel]}>
            {label}
          </Text>
          {iconPosition === 'end' && iconNode}
        </View>
      )}
    </Tappable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    alignSelf: 'flex-start',
  },
  block: { alignSelf: 'stretch' },
  content: { flexDirection: 'row', alignItems: 'center', gap: space.xs },
  disabled: { opacity: 0.38 },
  smallLabel: { fontFamily: fontFamily.sansSemibold },
});
