import { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

import { Text } from '@/components/ui/text';
import { formatShortDate } from '@/lib/dates';
import { print } from '@/theme/colors';
import { fontFamily } from '@/theme/typography';

interface PublishedStampProps {
  date: number;
  /** Called the moment the stamp hits the page. */
  onLand?: () => void;
}

/** A rubber stamp, inked in vermilion, pressed onto the cover. */
export function PublishedStamp({ date, onLand }: PublishedStampProps) {
  const press = useSharedValue(0);
  const onLandRef = useRef(onLand);

  useEffect(() => {
    onLandRef.current = onLand;
  });

  // Stamp once, when it appears.
  useEffect(() => {
    const landed = () => onLandRef.current?.();
    press.value = withDelay(
      350,
      withTiming(1, { duration: 260 }, (finished) => {
        if (finished) scheduleOnRN(landed);
      }),
    );
  }, [press]);

  const style = useAnimatedStyle(() => ({
    opacity: press.value,
    transform: [{ scale: 2.4 - press.value * 1.4 }, { rotate: '-12deg' }],
  }));

  return (
    <Animated.View style={[styles.stamp, style]} accessibilityLabel={`Published ${formatShortDate(date)}`}>
      <View style={styles.inner}>
        <Text style={styles.word}>Published</Text>
        <View style={styles.rule} />
        <Text style={styles.date}>{formatShortDate(date)}</Text>
      </View>
    </Animated.View>
  );
}

/** A small settle after the stamp lands, like the cover taking the weight. */
export function useLandingBounce() {
  const bounce = useSharedValue(1);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: bounce.value }] }));
  const land = () => {
    bounce.value = withSpring(0.97, { damping: 6, stiffness: 400 }, () => {
      bounce.value = withSpring(1, { damping: 10, stiffness: 220 });
    });
  };
  return { style, land };
}

const styles = StyleSheet.create({
  stamp: {
    position: 'absolute',
    borderWidth: 3,
    borderColor: print.accent,
    borderRadius: 6,
    padding: 3,
    backgroundColor: 'rgba(250, 247, 241, 0.86)',
  },
  inner: {
    borderWidth: 1.2,
    borderColor: print.accent,
    borderRadius: 3,
    paddingHorizontal: 16,
    paddingVertical: 6,
    alignItems: 'center',
  },
  word: {
    fontFamily: fontFamily.sansBold,
    fontSize: 22,
    letterSpacing: 4,
    textTransform: 'uppercase',
    color: print.accent,
  },
  rule: { height: 1.2, alignSelf: 'stretch', backgroundColor: print.accent, marginVertical: 2 },
  date: {
    fontFamily: fontFamily.sansSemibold,
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: print.accent,
  },
});
