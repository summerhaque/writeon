import { StyleSheet, View } from 'react-native';

import { Chip } from '@/components/ui/choice';
import { Field } from '@/components/ui/field';
import { Text } from '@/components/ui/text';
import type { ConflictKind, ConflictWork, IdeaWork, PlotWork, SettingWork } from '@/domain/types';
import { hairline, space } from '@/theme/layout';
import { useTheme } from '@/theme/use-theme';

import { editWork, type StageProps } from './stage-props';

const NOTES_HINT = 'Anything else. Scraps, questions, half-ideas. This page is yours.';

export function IdeaStage({ story, edit, flush }: StageProps) {
  const idea = story.work.idea;
  const set = (key: keyof IdeaWork) => (value: string) =>
    editWork(edit, 'idea', (w) => ({ ...w, [key]: value }));
  return (
    <View style={styles.fields}>
      <Field
        label="What if…?"
        value={idea.whatIf}
        onChangeText={set('whatIf')}
        onBlur={flush}
        story
        lines={2}
        placeholder="What if…"
      />
      <Field
        label="Your story in one line"
        hint="This is a story about ___ who wants ___ but ___."
        value={idea.pitch}
        onChangeText={set('pitch')}
        onBlur={flush}
        story
        lines={3}
      />
      <Field
        label="Why this story?"
        hint="Why does it matter to you?"
        value={idea.why}
        onChangeText={set('why')}
        onBlur={flush}
        story
        lines={3}
      />
      <Field
        label="Notes"
        hint={NOTES_HINT}
        value={idea.notes}
        onChangeText={set('notes')}
        onBlur={flush}
        story
        lines={4}
      />
    </View>
  );
}

export function SettingStage({ story, edit, flush }: StageProps) {
  const setting = story.work.setting;
  const set = (key: keyof SettingWork) => (value: string) =>
    editWork(edit, 'setting', (w) => ({ ...w, [key]: value }));
  return (
    <View style={styles.fields}>
      <Field
        label="Where does it happen?"
        value={setting.place}
        onChangeText={set('place')}
        onBlur={flush}
        story
        lines={2}
      />
      <Field
        label="When?"
        hint="Time of day, time of year, or a hundred years from now."
        value={setting.time}
        onChangeText={set('time')}
        onBlur={flush}
        story
        lines={2}
      />
      <View style={styles.group}>
        <Text variant="overline" tone="muted">
          Stand there and notice
        </Text>
        <Field label="I see…" value={setting.see} onChangeText={set('see')} onBlur={flush} story lines={2} />
        <Field
          label="I hear…"
          value={setting.hear}
          onChangeText={set('hear')}
          onBlur={flush}
          story
          lines={2}
        />
        <Field
          label="I smell…"
          value={setting.smell}
          onChangeText={set('smell')}
          onBlur={flush}
          story
          lines={2}
        />
      </View>
      <Field
        label="What makes this place special, or dangerous?"
        value={setting.special}
        onChangeText={set('special')}
        onBlur={flush}
        story
        lines={3}
      />
      <Field
        label="Notes"
        hint={NOTES_HINT}
        value={setting.notes}
        onChangeText={set('notes')}
        onBlur={flush}
        story
        lines={4}
      />
    </View>
  );
}

const CONFLICT_KINDS: { id: ConflictKind; label: string }[] = [
  { id: 'person', label: 'Another person' },
  { id: 'nature', label: 'Nature' },
  { id: 'self', label: 'Themselves' },
  { id: 'world', label: 'The world and its rules' },
];

export function ConflictStage({ story, edit, flush }: StageProps) {
  const conflict = story.work.conflict;
  const set = (key: keyof Omit<ConflictWork, 'kind'>) => (value: string) =>
    editWork(edit, 'conflict', (w) => ({ ...w, [key]: value }));
  return (
    <View style={styles.fields}>
      <Field
        label="What stands in the way?"
        value={conflict.obstacle}
        onChangeText={set('obstacle')}
        onBlur={flush}
        story
        lines={3}
      />
      <View style={styles.group}>
        <Text variant="label">Who or what are they up against?</Text>
        <View style={styles.chips} accessibilityRole="radiogroup">
          {CONFLICT_KINDS.map((kind) => (
            <Chip
              key={kind.id}
              label={kind.label}
              selected={conflict.kind === kind.id}
              onPress={() =>
                editWork(edit, 'conflict', (w) => ({ ...w, kind: w.kind === kind.id ? null : kind.id }))
              }
            />
          ))}
        </View>
      </View>
      <Field
        label="What happens if they fail?"
        hint="The bigger it feels to your character, the more readers care."
        value={conflict.stakes}
        onChangeText={set('stakes')}
        onBlur={flush}
        story
        lines={3}
      />
      <Field
        label="Notes"
        hint={NOTES_HINT}
        value={conflict.notes}
        onChangeText={set('notes')}
        onBlur={flush}
        story
        lines={4}
      />
    </View>
  );
}

const BEATS: { key: keyof Omit<PlotWork, 'notes'>; label: string; hint: string }[] = [
  { key: 'beginning', label: 'Beginning', hint: 'Who, where, and what’s normal, before it all changes.' },
  { key: 'problem', label: 'The problem', hint: 'The moment everything changes.' },
  { key: 'rising', label: 'It gets harder', hint: 'They try. It doesn’t work. Something else goes wrong.' },
  { key: 'climax', label: 'The big moment', hint: 'Everything comes down to this.' },
  { key: 'ending', label: 'Ending', hint: 'What’s different now?' },
];

export function PlotStage({ story, edit, flush }: StageProps) {
  const { colors } = useTheme();
  const plot = story.work.plot;
  const set = (key: keyof PlotWork) => (value: string) =>
    editWork(edit, 'plot', (w) => ({ ...w, [key]: value }));
  return (
    <View style={styles.fields}>
      <View>
        {BEATS.map((beat, i) => (
          <View key={beat.key} style={styles.beat}>
            <View style={styles.beatRail}>
              <View
                style={[
                  styles.beatDot,
                  { borderColor: plot[beat.key].trim() ? colors.primary : colors.borderStrong },
                ]}>
                <Text variant="footnote" tone={plot[beat.key].trim() ? 'ink' : 'muted'}>
                  {i + 1}
                </Text>
              </View>
              {i < BEATS.length - 1 && <View style={[styles.beatLine, { backgroundColor: colors.border }]} />}
            </View>
            <View style={styles.beatField}>
              <Field
                label={beat.label}
                hint={beat.hint}
                value={plot[beat.key]}
                onChangeText={set(beat.key)}
                onBlur={flush}
                story
                lines={3}
              />
            </View>
          </View>
        ))}
      </View>
      <Field
        label="Notes"
        hint={NOTES_HINT}
        value={plot.notes}
        onChangeText={set('notes')}
        onBlur={flush}
        story
        lines={4}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fields: { gap: space.xl },
  group: { gap: space.sm },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.xs },
  beat: { flexDirection: 'row', gap: space.sm },
  beatRail: { width: 28, alignItems: 'center' },
  beatDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: hairline * 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  beatLine: { width: hairline * 2, flex: 1, marginVertical: space.xxs },
  beatField: { flex: 1, paddingBottom: space.xl },
});
