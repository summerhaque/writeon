import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { BadgeMark } from '@/components/progress/badge-mark';
import { IconButton } from '@/components/ui/icon-button';
import { Screen } from '@/components/ui/screen';
import { Section } from '@/components/ui/surface';
import { Text } from '@/components/ui/text';
import { LESSONS } from '@/content/lessons';
import { BADGES, progressTotals } from '@/domain/progress';
import { plural } from '@/domain/words';
import { dayKey, lastDays } from '@/lib/dates';
import { useAppStore } from '@/store/app-store';
import { useProgressInput } from '@/store/selectors';
import { hairline, space } from '@/theme/layout';
import { fontFamily } from '@/theme/typography';
import { useTheme } from '@/theme/use-theme';

export default function ProgressScreen() {
  const input = useProgressInput();
  const totals = progressTotals(input);
  const earned = BADGES.filter((badge) => badge.earned(input));

  return (
    <Screen edges={['top']}>
      <View style={styles.head}>
        <View style={styles.flex}>
          <Text variant="title1" accessibilityRole="header">
            Progress
          </Text>
        </View>
        <IconButton icon="settings" label="Settings" onPress={() => router.push('/settings')} />
      </View>

      <Week />

      <Section label="The ledger">
        <Ledger label="Words written" value={totals.words.toLocaleString('en-US')} />
        <Ledger label="Books published" value={String(totals.finished)} />
        <Ledger label="Days in a row" value={plural(totals.streak, 'day')} />
        <Ledger label="Longest streak" value={plural(totals.best, 'day')} />
        <Ledger label="Lessons finished" value={`${totals.lessons} of ${LESSONS.length}`} />
      </Section>

      <Section label={`Badges · ${earned.length} of ${BADGES.length}`}>
        <View style={styles.badges}>
          {BADGES.map((badge) => {
            const has = earned.includes(badge);
            return (
              <View
                key={badge.id}
                style={styles.badge}
                accessible
                accessibilityLabel={`${badge.name}. ${has ? 'Earned.' : `Not yet. ${badge.how}`}`}>
                <BadgeMark id={badge.id} earned={has} />
                <Text variant="footnote" align="center" tone={has ? 'ink' : 'muted'} style={styles.badgeName}>
                  {badge.name}
                </Text>
                <Text variant="footnote" align="center" tone="faint" numberOfLines={3}>
                  {has ? 'Earned' : badge.how}
                </Text>
              </View>
            );
          })}
        </View>
      </Section>
    </Screen>
  );
}

/** The last seven days. A filled dot is a day you wrote. */
function Week() {
  const { colors } = useTheme();
  const activity = useAppStore((state) => state.activity);
  const today = dayKey();

  return (
    <View style={[styles.week, { borderColor: colors.border, backgroundColor: colors.surface }]}>
      {lastDays(7).map((day) => {
        const key = dayKey(day);
        const wrote = (activity[key] ?? 0) > 0;
        const isToday = key === today;
        return (
          <View
            key={key}
            style={styles.day}
            accessible
            accessibilityLabel={`${day.toLocaleDateString('en-US', { weekday: 'long' })}${wrote ? ', wrote' : ''}`}>
            <Text variant="footnote" tone={isToday ? 'ink' : 'muted'}>
              {day.toLocaleDateString('en-US', { weekday: 'narrow' })}
            </Text>
            <View
              style={[
                styles.dot,
                wrote
                  ? { backgroundColor: colors.primary }
                  : { borderColor: colors.faint, borderWidth: hairline * 3 },
                isToday && !wrote && { borderColor: colors.accent, borderWidth: 2 },
              ]}
            />
          </View>
        );
      })}
    </View>
  );
}

function Ledger({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.ledger} accessible accessibilityLabel={`${label}: ${value}`}>
      <Text variant="body">{label}</Text>
      <Text variant="body" tone="faint" numberOfLines={1} ellipsizeMode="clip" style={styles.leader}>
        {' . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}
      </Text>
      <Text variant="title3">{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'center', paddingTop: space.lg, marginRight: -space.sm },
  flex: { flex: 1 },
  week: {
    marginTop: space.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: hairline * 2,
    borderRadius: 16,
    paddingVertical: space.md,
    paddingHorizontal: space.md,
  },
  day: { alignItems: 'center', gap: space.xs, flex: 1 },
  dot: { width: 14, height: 14, borderRadius: 7 },
  ledger: { flexDirection: 'row', alignItems: 'baseline', gap: space.xs, minHeight: 32 },
  leader: { flex: 1 },
  badges: { flexDirection: 'row', flexWrap: 'wrap', rowGap: space.xl },
  badge: { width: '33.33%', alignItems: 'center', gap: space.xxs, paddingHorizontal: space.xxs },
  badgeName: { marginTop: space.xs, fontFamily: fontFamily.sansSemibold },
});
