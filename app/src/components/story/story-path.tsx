import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Tappable } from '@/components/ui/tappable';
import { Text } from '@/components/ui/text';
import { STAGES } from '@/domain/stages';
import { stageStatus, stageSummary } from '@/domain/story';
import type { StageId, Story } from '@/domain/types';
import { stageColors, stageInkIsDark } from '@/theme/colors';
import { hairline, space } from '@/theme/layout';
import { useTheme } from '@/theme/use-theme';

const ROW = 84;
const NODE = 40;
const RAIL = 84;
/** The trail wanders a little, like a path on a hand-drawn map. */
const NODE_X = [24, 46, 30, 52, 26, 48, 32, 50, 28];

interface StoryPathProps {
  story: Story;
  /** The stage to point at: where the writer's roadmap says to go next. */
  upNext: StageId | null;
  onOpen: (stage: StageId) => void;
}

export function StoryPath({ story, upNext, onOpen }: StoryPathProps) {
  const { colors } = useTheme();
  const statuses = STAGES.map((stage) => stageStatus(story, stage.id));
  const centers = STAGES.map((_, i) => ({ x: NODE_X[i], y: i * ROW + ROW / 2 }));

  return (
    <View style={{ height: ROW * STAGES.length }}>
      <Svg width={RAIL} height={ROW * STAGES.length} style={styles.rail}>
        {centers.slice(1).map((to, i) => {
          const from = centers[i];
          const walked = statuses[i] === 'done' && statuses[i + 1] === 'done';
          return (
            <Path
              key={i}
              d={`M${from.x} ${from.y} C${from.x} ${from.y + ROW / 2} ${to.x} ${to.y - ROW / 2} ${to.x} ${to.y}`}
              stroke={walked ? stageColors[i + 1] : colors.borderStrong}
              strokeWidth={walked ? 3 : 2}
              strokeDasharray={walked ? undefined : '1 7'}
              strokeLinecap="round"
              fill="none"
            />
          );
        })}
      </Svg>

      {STAGES.map((stage, i) => {
        const status = statuses[i];
        const isNext = stage.id === upNext;
        return (
          <Tappable
            key={stage.id}
            accessibilityLabel={`Stage ${stage.number}, ${stage.name}. ${stageSummary(story, stage.id)}${
              isNext ? '. Up next.' : ''
            }`}
            onPress={() => onOpen(stage.id)}
            pressScale={0.98}
            style={[styles.row, { top: i * ROW }]}>
            <View style={[styles.nodeSlot, { left: centers[i].x - NODE / 2 }]}>
              {isNext && <View style={[styles.halo, { borderColor: colors.accent }]} />}
              <View
                style={[
                  styles.node,
                  status === 'done' && { backgroundColor: stageColors[i] },
                  status === 'in-progress' && {
                    backgroundColor: colors.surface,
                    borderWidth: 3,
                    borderColor: stageColors[i],
                  },
                  status === 'not-started' && {
                    backgroundColor: colors.surface,
                    borderWidth: hairline * 4,
                    borderColor: colors.borderStrong,
                  },
                ]}>
                {status === 'done' ? (
                  <Ionicons name="checkmark" size={19} color={stageInkIsDark(i) ? colors.ink : '#FFFFFF'} />
                ) : (
                  <Text variant="label" tone={status === 'in-progress' ? 'ink' : 'muted'}>
                    {stage.number}
                  </Text>
                )}
              </View>
            </View>

            <View style={styles.label}>
              <View style={styles.nameLine}>
                <Text variant="title3" numberOfLines={1}>
                  {stage.name}
                </Text>
                {isNext && (
                  <Text variant="overline" tone="accent">
                    Up next
                  </Text>
                )}
              </View>
              <Text variant="footnote" tone="muted" numberOfLines={1}>
                {status === 'not-started' ? stage.blurb : stageSummary(story, stage.id)}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.inkFaint} />
          </Tappable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  rail: { position: 'absolute', left: 0, top: 0 },
  row: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: ROW,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: RAIL,
    gap: space.sm,
  },
  nodeSlot: {
    position: 'absolute',
    top: (ROW - NODE) / 2,
    width: NODE,
    height: NODE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  halo: {
    position: 'absolute',
    width: NODE + 12,
    height: NODE + 12,
    borderRadius: (NODE + 12) / 2,
    borderWidth: 3,
  },
  node: { width: NODE, height: NODE, borderRadius: NODE / 2, alignItems: 'center', justifyContent: 'center' },
  label: { flex: 1, gap: 1 },
  nameLine: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
});
