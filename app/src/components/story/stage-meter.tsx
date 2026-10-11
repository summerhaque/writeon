import { StyleSheet, View } from 'react-native';

import { STAGE_IDS } from '@/domain/stages';
import { stageStatus } from '@/domain/story';
import type { Story } from '@/domain/types';
import { stageColors } from '@/theme/colors';
import { useTheme } from '@/theme/use-theme';

/** Nine small bars, one per stage, filling along the blue ramp: solid when done, half when started. */
export function StageMeter({ story }: { story: Story }) {
  const { colors } = useTheme();
  return (
    <View style={styles.row} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      {STAGE_IDS.map((stage, i) => {
        const status = stageStatus(story, stage);
        return (
          <View key={stage} style={[styles.segment, { backgroundColor: colors.fillStrong }]}>
            {status !== 'not-started' && (
              <View
                style={[
                  styles.fillBar,
                  { backgroundColor: stageColors[i], width: status === 'done' ? '100%' : '50%' },
                ]}
              />
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 4 },
  segment: { flex: 1, height: 8, borderRadius: 4, overflow: 'hidden' },
  fillBar: { height: '100%', borderRadius: 4 },
});
