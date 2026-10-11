import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Field } from '@/components/ui/field';
import { Rule, Section } from '@/components/ui/surface';
import { Tappable } from '@/components/ui/tappable';
import { Text } from '@/components/ui/text';
import { LESSON_BY_ID } from '@/domain/lessons';
import { REVISION_CHECKS } from '@/domain/story';
import type { LessonId } from '@/domain/types';
import { haptics } from '@/lib/haptics';
import { hairline, space } from '@/theme/layout';
import { useTheme } from '@/theme/use-theme';

import { editWork, type StageProps } from './stage-props';

const PRACTICE: LessonId[] = ['word-choice', 'show-dont-tell', 'senses'];

export function RevisingStage({ story, edit, flush }: StageProps) {
  const { colors } = useTheme();
  const { checks, notes } = story.work.revising;

  const toggle = (id: (typeof REVISION_CHECKS)[number]['id']) => {
    haptics.select();
    editWork(edit, 'revising', (r) => ({ ...r, checks: { ...r.checks, [id]: !r.checks[id] } }));
    flush();
  };

  const practice = (lesson: LessonId) => {
    flush();
    router.push({ pathname: '/lesson/[id]', params: { id: lesson, storyId: story.id } });
  };

  return (
    <View style={styles.wrap}>
      <View>
        {REVISION_CHECKS.map((check, i) => {
          const done = !!checks[check.id];
          return (
            <View key={check.id}>
              {i > 0 && <Rule />}
              <Tappable
                accessibilityRole="checkbox"
                accessibilityState={{ checked: done }}
                accessibilityLabel={`${check.label}. ${check.detail}`}
                onPress={() => toggle(check.id)}
                pressScale={0.99}
                style={styles.check}>
                <View
                  style={[
                    styles.box,
                    done
                      ? { backgroundColor: colors.primary, borderColor: colors.primary }
                      : { borderColor: colors.faint },
                  ]}>
                  {done && <Feather name="check" size={15} color={colors.onPrimary} />}
                </View>
                <View style={styles.checkText}>
                  <Text variant="headline" tone={done ? 'muted' : 'ink'}>
                    {check.label}
                  </Text>
                  <Text variant="footnote" tone="muted">
                    {check.detail}
                  </Text>
                </View>
              </Tappable>
            </View>
          );
        })}
      </View>

      <Section label="Practice on your own sentences" style={styles.practice}>
        {PRACTICE.map((id) => (
          <Tappable
            key={id}
            accessibilityLabel={`${LESSON_BY_ID[id].title} lesson`}
            onPress={() => practice(id)}
            pressScale={0.99}
            style={styles.lessonRow}>
            <View style={styles.checkText}>
              <Text variant="headline">{LESSON_BY_ID[id].title}</Text>
              <Text variant="footnote" tone="muted">
                {LESSON_BY_ID[id].tagline}
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color={colors.faint} />
          </Tappable>
        ))}
      </Section>

      <Field
        label="Notes"
        hint="What to fix next time you sit down."
        value={notes}
        onChangeText={(value) => editWork(edit, 'revising', (r) => ({ ...r, notes: value }))}
        onBlur={flush}
        story
        lines={4}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: space.xl },
  check: { flexDirection: 'row', gap: space.md, paddingVertical: space.sm, alignItems: 'flex-start' },
  box: {
    width: 24,
    height: 24,
    borderRadius: 7,
    borderWidth: hairline * 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  checkText: { flex: 1, gap: 1 },
  practice: { marginTop: 0 },
  lessonRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: space.xs, gap: space.sm },
});
