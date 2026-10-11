import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import type { BadgeId } from '@/domain/progress';
import { shadow } from '@/theme/layout';
import { useTheme } from '@/theme/use-theme';

const SIZE = 68;

/** An earned badge is an amber medal with a navy mark. A locked one is a dashed outline. */
export function BadgeMark({ id, earned }: { id: BadgeId; earned: boolean }) {
  const { colors } = useTheme();
  const color = earned ? '#12354F' : colors.inkFaint;
  const line = {
    stroke: color,
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    fill: 'none',
  } as const;

  return (
    <View
      style={[
        styles.outer,
        earned
          ? { borderColor: colors.accent, backgroundColor: colors.accent, ...shadow.sm }
          : { borderColor: colors.borderStrong, borderStyle: 'dashed', backgroundColor: colors.surface },
      ]}>
      {earned && <View style={styles.inner} />}
      <Svg width={28} height={28} viewBox="0 0 24 24">
        {id === 'first-words' && (
          <>
            <Path
              d="M15.2 4.8a2.3 2.3 0 0 1 3.3 0l.7.7a2.3 2.3 0 0 1 0 3.3L8.6 19.4 4 20l.6-4.6Z"
              {...line}
            />
            <Path d="m13.5 6.5 4 4" {...line} />
          </>
        )}
        {id === 'character-builder' && (
          <>
            <Circle cx={12} cy={8} r={3.6} {...line} />
            <Path d="M4.8 20.5c.9-4 3.6-6.2 7.2-6.2s6.3 2.2 7.2 6.2" {...line} />
          </>
        )}
        {id === 'world-maker' && (
          <>
            <Path d="m2.5 19.5 6.2-9.3 3.6 5 2.6-3.4 6.6 7.7Z" {...line} />
            <Circle cx={17} cy={5.8} r={2.2} {...line} />
          </>
        )}
        {id === 'plotter' && (
          <>
            <Path d="M4 18c4-1 3.5-7 8-8s4.5-5 8-6" {...line} />
            <Circle cx={4} cy={18} r={1.6} {...line} />
            <Circle cx={12} cy={10} r={1.6} {...line} />
            <Circle cx={20} cy={4} r={1.6} {...line} />
          </>
        )}
        {id === 'thousand-words' && (
          <>
            <Path d="M6 3h8.5L19 7.5V21H6Z" {...line} />
            <Path d="M14.5 3v4.5H19M9 11h7M9 14.5h7M9 18h4.5" {...line} />
          </>
        )}
        {id === 'sentence-smith' && (
          <>
            <Path d="M10 7.5c-3 .8-4.5 3-4.5 6.5v3h4.5v-4.5H7.3" {...line} />
            <Path d="M18.5 7.5c-3 .8-4.5 3-4.5 6.5v3h4.5v-4.5h-2.7" {...line} />
          </>
        )}
        {id === 'illustrator' && (
          <>
            <Rect x={3} y={4.5} width={18} height={15} rx={1.5} {...line} />
            <Path d="m3.5 17 5-5.5 4 4 2.5-2.5 5 4.5" {...line} />
            <Circle cx={15.5} cy={9} r={1.5} {...line} />
          </>
        )}
        {id === 'seven-days' && (
          <>
            <Rect x={3.5} y={5} width={17} height={15.5} rx={1.5} {...line} />
            <Path d="M3.5 9.5h17M8 3v4M16 3v4M10 13h4.5l-3 5" {...line} />
          </>
        )}
        {id === 'published' && (
          <>
            <Path d="M5 4.5c0-.8.7-1.5 1.5-1.5H19v15H6.5C5.7 18 5 18.7 5 19.5Z" {...line} />
            <Path d="M5 19.5c0 .8.7 1.5 1.5 1.5H19v-3M9.5 7.5h6" {...line} />
          </>
        )}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: 4,
    bottom: 4,
    borderRadius: SIZE / 2,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.7)',
  },
});
