import { useEffect } from 'react';
import { StyleSheet, View, type DimensionValue } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '@/theme/use-theme';

const LINES: DimensionValue[] = ['92%', '74%', '48%'];

/** Ink settling on the page: the coach is thinking. */
export function Thinking() {
  return (
    <View style={styles.lines} accessibilityLabel="Coach Sparkle is thinking" accessibilityRole="progressbar">
      {LINES.map((width, i) => (
        <Line key={i} width={width} delay={i * 140} />
      ))}
    </View>
  );
}

function Line({ width, delay }: { width: DimensionValue; delay: number }) {
  const { colors } = useTheme();
  const glow = useSharedValue(0.35);

  useEffect(() => {
    glow.value = withDelay(
      delay,
      withRepeat(withSequence(withTiming(1, { duration: 520 }), withTiming(0.35, { duration: 520 })), -1),
    );
  }, [delay, glow]);

  const style = useAnimatedStyle(() => ({ opacity: glow.value }));
  return <Animated.View style={[styles.line, { width, backgroundColor: colors.fillStrong }, style]} />;
}

const styles = StyleSheet.create({
  lines: { gap: 9, paddingVertical: 6 },
  line: { height: 11, borderRadius: 6 },
});
