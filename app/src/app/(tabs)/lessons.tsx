import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Screen } from '@/components/ui/screen';
import { Rule } from '@/components/ui/surface';
import { Tappable } from '@/components/ui/tappable';
import { Text } from '@/components/ui/text';
import { LESSONS } from '@/content/lessons';
import { useAppStore } from '@/store/app-store';
import { space } from '@/theme/layout';
import { fontFamily } from '@/theme/typography';
import { useTheme } from '@/theme/use-theme';

export default function LessonsScreen() {
  const { colors } = useTheme();
  const lessonsDone = useAppStore((state) => state.lessonsDone);
  const finished = LESSONS.filter((lesson) => lessonsDone[lesson.id]).length;

  return (
    <Screen edges={['top']}>
      <View style={styles.head}>
        <Text variant="title1" accessibilityRole="header">
          Lessons
        </Text>
        <Text variant="callout" tone="muted">
          Small tools for better sentences. Learn one in a few minutes, then use it on a sentence you wrote.
        </Text>
        <Text variant="overline" tone="muted" style={styles.count}>
          {finished} of {LESSONS.length} finished
        </Text>
      </View>

      <View>
        {LESSONS.map((lesson, i) => {
          const done = Boolean(lessonsDone[lesson.id]);
          return (
            <View key={lesson.id}>
              {i > 0 && <Rule />}
              <Tappable
                accessibilityLabel={`${lesson.title}. ${lesson.tagline}. ${lesson.minutes} minutes.${done ? ' Finished.' : ''}`}
                onPress={() => router.push({ pathname: '/lesson/[id]', params: { id: lesson.id } })}
                pressScale={0.99}
                style={styles.row}>
                <Text style={[styles.number, { color: colors.inkFaint }]}>
                  {String(i + 1).padStart(2, '0')}
                </Text>
                <View style={styles.text}>
                  <Text variant="title3">{lesson.title}</Text>
                  <Text variant="callout" tone="muted">
                    {lesson.tagline}
                  </Text>
                  <Text variant="footnote" tone={done ? 'success' : 'faint'}>
                    {done ? 'Finished' : `${lesson.minutes} min`}
                  </Text>
                </View>
                {done ? (
                  <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                ) : (
                  <Ionicons name="chevron-forward" size={20} color={colors.inkFaint} />
                )}
              </Tappable>
            </View>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  head: { gap: space.xxs, paddingTop: space.lg, marginBottom: space.lg },
  count: { marginTop: space.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: space.md, paddingVertical: space.md },
  number: { fontFamily: fontFamily.bold, fontSize: 18, width: 28 },
  text: { flex: 1, gap: 2 },
});
