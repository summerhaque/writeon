import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
} from 'react-native-reanimated';

import { BadgeMark } from '@/components/progress/badge-mark';
import { pointsEarned, starsEarned, takeNewBadges } from '@/components/progress/rewards';
import { IconButton } from '@/components/ui/icon-button';
import { Screen } from '@/components/ui/screen';
import { Section, Surface } from '@/components/ui/surface';
import { Text } from '@/components/ui/text';
import { LESSONS } from '@/content/lessons';
import { BADGES, progressTotals, type Badge, type BadgeId } from '@/domain/progress';
import { formatCount } from '@/domain/words';
import { dayKey, lastDays } from '@/lib/dates';
import { haptics } from '@/lib/haptics';
import { useAppStore } from '@/store/app-store';
import { useProgressInput } from '@/store/selectors';
import { hairline, radius, space } from '@/theme/layout';
import { fontFamily } from '@/theme/typography';
import { useTheme } from '@/theme/use-theme';

export default function ProgressScreen() {
  const { colors } = useTheme();
  const input = useProgressInput();
  const totals = progressTotals(input);
  const stars = starsEarned(input);
  const points = pointsEarned(input, totals.words);
  const earned = BADGES.filter((badge) => badge.earned(input));
  const [fresh, setFresh] = useState<BadgeId[]>([]);

  // Badges earned since the last visit get their moment when the writer comes here.
  useFocusEffect(
    useCallback(() => {
      const newOnes = takeNewBadges(input);
      if (newOnes.length > 0) {
        setFresh(newOnes);
        haptics.success();
      }
    }, [input]),
  );

  return (
    <Screen edges={['top']}>
      <View style={styles.head}>
        <View style={styles.flex}>
          <Text variant="title1" accessibilityRole="header">
            Progress
          </Text>
        </View>
        <IconButton icon="settings-outline" label="Settings" onPress={() => router.push('/settings')} />
      </View>

      <View style={[styles.rewards, { backgroundColor: colors.accentSoft }]}>
        <Reward icon="star" value={formatCount(stars)} label={stars === 1 ? 'star' : 'stars'} />
        <Reward icon="trophy" value={formatCount(points)} label="points" />
        <Reward
          icon="flame"
          value={String(totals.streak)}
          label={totals.streak === 1 ? 'day in a row' : 'days in a row'}
        />
      </View>

      <Week />

      <Section label={`Badges · ${earned.length} of ${BADGES.length}`}>
        <View style={styles.badges}>
          {BADGES.map((badge) => (
            <BadgeTile
              key={badge.id}
              badge={badge}
              earned={earned.includes(badge)}
              celebrate={fresh.includes(badge.id)}
            />
          ))}
        </View>
      </Section>

      <Section label="Your writing">
        <Surface style={styles.tally}>
          <Tally label="Words written" value={formatCount(totals.words)} />
          <Tally label="Stories completed" value={formatCount(totals.finished)} />
          <Tally label="Badges earned" value={`${earned.length} of ${BADGES.length}`} />
          <Tally label="Lessons finished" value={`${totals.lessons} of ${LESSONS.length}`} />
          <Tally label="Longest streak" value={`${totals.best} ${totals.best === 1 ? 'day' : 'days'}`} last />
        </Surface>
      </Section>
    </Screen>
  );
}

function Reward({
  icon,
  value,
  label,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
  label: string;
}) {
  const { colors } = useTheme();
  return (
    <View style={styles.reward} accessible accessibilityLabel={`${value} ${label}`}>
      <Ionicons name={icon} size={22} color={colors.accent} />
      <Text style={styles.rewardValue}>{value}</Text>
      <Text variant="footnote" tone="muted" align="center" numberOfLines={2}>
        {label}
      </Text>
    </View>
  );
}

/** A badge on the wall. A newly earned one pops in with a little bounce. */
function BadgeTile({ badge, earned, celebrate }: { badge: Badge; earned: boolean; celebrate: boolean }) {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (!celebrate) return;
    scale.value = withDelay(
      250,
      withSequence(
        withSpring(1.22, { damping: 6, stiffness: 260 }),
        withSpring(1, { damping: 9, stiffness: 180 }),
      ),
    );
  }, [celebrate, scale]);

  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <View
      style={styles.badge}
      accessible
      accessibilityLabel={`${badge.name}. ${earned ? 'Earned.' : `Not yet. ${badge.how}`}`}>
      <Animated.View style={style}>
        <BadgeMark id={badge.id} earned={earned} />
      </Animated.View>
      <Text variant="footnote" align="center" tone={earned ? 'ink' : 'muted'} style={styles.badgeName}>
        {badge.name}
      </Text>
      <Text variant="footnote" align="center" tone={celebrate ? 'accent' : 'faint'} numberOfLines={3}>
        {celebrate ? 'Just earned' : earned ? 'Earned' : badge.how}
      </Text>
    </View>
  );
}

/** The last seven days. A filled dot is a day you wrote. */
function Week() {
  const { colors } = useTheme();
  const activity = useAppStore((state) => state.activity);
  const today = dayKey();

  return (
    <Surface style={styles.week}>
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
                  ? { backgroundColor: colors.accent }
                  : { borderColor: isToday ? colors.accent : colors.borderStrong, borderWidth: 2 },
              ]}>
              {wrote && <Ionicons name="checkmark" size={14} color={colors.accentOn} />}
            </View>
          </View>
        );
      })}
    </Surface>
  );
}

function Tally({ label, value, last = false }: { label: string; value: string; last?: boolean }) {
  const { colors } = useTheme();
  return (
    <View
      style={[styles.tallyRow, !last && { borderBottomWidth: hairline, borderBottomColor: colors.border }]}
      accessible
      accessibilityLabel={`${label}: ${value}`}>
      <Text variant="body" tone="muted">
        {label}
      </Text>
      <Text variant="headline">{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'center', paddingTop: space.lg, marginRight: -space.sm },
  flex: { flex: 1 },
  rewards: {
    marginTop: space.lg,
    flexDirection: 'row',
    borderRadius: radius.lg,
    paddingVertical: space.lg,
    paddingHorizontal: space.xs,
  },
  reward: { flex: 1, alignItems: 'center', gap: 2 },
  rewardValue: { fontFamily: fontFamily.extrabold, fontSize: 26, marginTop: space.xxs },
  week: {
    marginTop: space.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: space.md,
    paddingHorizontal: space.sm,
  },
  day: { alignItems: 'center', gap: space.xs, flex: 1 },
  dot: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  badges: { flexDirection: 'row', flexWrap: 'wrap', rowGap: space.xl },
  badge: { width: '33.33%', alignItems: 'center', gap: space.xxs, paddingHorizontal: space.xxs },
  badgeName: { marginTop: space.xs, fontFamily: fontFamily.bold },
  tally: { paddingVertical: space.xxs },
  tallyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: space.sm,
  },
});
