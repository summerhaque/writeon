import type { ReactNode } from 'react';
import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface TappableProps extends Omit<PressableProps, 'style' | 'children'> {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  /** How far it sinks when pressed. Large surfaces should sink less. */
  pressScale?: number;
}

/** A pressable that answers the finger: it dims and sinks slightly, then springs back. */
export function Tappable({
  style,
  children,
  pressScale = 0.97,
  disabled,
  onPressIn,
  onPressOut,
  ...rest
}: TappableProps) {
  const pressed = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: 1 - pressed.value * 0.18,
    transform: [{ scale: 1 - pressed.value * (1 - pressScale) }],
  }));

  return (
    <AnimatedPressable
      accessibilityRole="button"
      disabled={disabled}
      onPressIn={(event) => {
        pressed.value = withTiming(1, { duration: 90 });
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        pressed.value = withTiming(0, { duration: 160 });
        onPressOut?.(event);
      }}
      style={[style, animatedStyle]}
      {...rest}>
      {children}
    </AnimatedPressable>
  );
}
