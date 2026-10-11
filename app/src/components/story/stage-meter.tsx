import { StyleSheet, View } from 'react-native';

import { STAGE_IDS } from '@/domain/stages';
import { stageStatus } from '@/domain/story';
import type { Story } from '@/domain/types';
import { useTheme } from '@/theme/use-theme';

/** Nine small marks, one per stage: solid when done, half when started. */
export function StageMeter({ story }: { story: Story }) {
  const { colors } = useTheme();
  return (
    <View style={styles.row} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      {STAGE_IDS.map((stage) => {
        const status = stageStatus(story, stage);
        return (
          <View key={stage} style={[styles.segment, { backgroundColor: colors.fillStrong }]}>
            {status !== 'not-started' && (
              <View
                style={[
                  styles.fillBar,
                  { backgroundColor: colors.ink, width: status === 'done' ? '100%' : '45%' },
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
  row: { flexDirection: 'row', gap: 3 },
  segment: { flex: 1, height: 4, borderRadius: 2, overflow: 'hidden' },
  fillBar: { height: '100%', borderRadius: 2 },
});
