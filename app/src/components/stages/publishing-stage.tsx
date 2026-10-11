import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { BookCover } from '@/components/book/book-cover';
import { PlateArt } from '@/components/book/plate-art';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/choice';
import { Field } from '@/components/ui/field';
import { Section } from '@/components/ui/surface';
import { Tappable } from '@/components/ui/tappable';
import { Text } from '@/components/ui/text';
import { PLATES } from '@/content/plates';
import { canPublish, displayTitle, publishChecks } from '@/domain/story';
import type { Cover, CoverColor, CoverTemplate } from '@/domain/types';
import { formatShortDate } from '@/lib/dates';
import { haptics } from '@/lib/haptics';
import { coverColors } from '@/theme/colors';
import { hairline, radius, space } from '@/theme/layout';
import { useTheme } from '@/theme/use-theme';

import type { StageProps } from './stage-props';

const TEMPLATES: { id: CoverTemplate; label: string }[] = [
  { id: 'classic', label: 'Classic' },
  { id: 'band', label: 'Band' },
  { id: 'plate', label: 'Picture' },
  { id: 'minimal', label: 'Bold' },
];

export function PublishingStage({ story, edit, flush }: StageProps) {
  const { colors } = useTheme();
  const { cover } = story;
  const checks = publishChecks(story);
  const ready = canPublish(story);

  const setCover = (patch: Partial<Cover>) => {
    haptics.select();
    edit((draft) => ({ ...draft, cover: { ...draft.cover, ...patch } }));
  };

  const setPublishing = (key: 'about' | 'dedication', value: string) =>
    edit((draft) => ({
      ...draft,
      work: { ...draft.work, publishing: { ...draft.work.publishing, [key]: value } },
    }));

  const publish = () => {
    flush();
    router.push({ pathname: '/story/[id]/published', params: { id: story.id } });
  };

  return (
    <View style={styles.wrap}>
      <View style={[styles.stage, { backgroundColor: colors.fill }]}>
        <BookCover title={displayTitle(story)} cover={cover} width={184} />
      </View>

      <View style={styles.group}>
        <Text variant="label">Design</Text>
        <View style={styles.row} accessibilityRole="radiogroup">
          {TEMPLATES.map((template) => (
            <Chip
              key={template.id}
              label={template.label}
              selected={cover.template === template.id}
              onPress={() =>
                setCover({
                  template: template.id,
                  plateId: template.id === 'plate' ? (cover.plateId ?? 'tower') : cover.plateId,
                })
              }
            />
          ))}
        </View>
      </View>

      <View style={styles.group}>
        <Text variant="label">Color</Text>
        <View style={styles.row} accessibilityRole="radiogroup">
          {(Object.keys(coverColors) as CoverColor[]).map((id) => {
            const selected = cover.color === id;
            return (
              <Tappable
                key={id}
                accessibilityRole="radio"
                accessibilityLabel={coverColors[id].name}
                accessibilityState={{ selected }}
                onPress={() => setCover({ color: id })}
                pressScale={0.9}
                style={[styles.swatchRing, { borderColor: selected ? colors.primary : 'transparent' }]}>
                <View style={[styles.swatch, { backgroundColor: coverColors[id].ink }]} />
              </Tappable>
            );
          })}
        </View>
      </View>

      {cover.template === 'plate' && (
        <View style={styles.group}>
          <Text variant="label">Picture</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.plates}>
            {PLATES.map((plate) => {
              const selected = cover.plateId === plate.id;
              return (
                <Tappable
                  key={plate.id}
                  accessibilityRole="radio"
                  accessibilityLabel={plate.title}
                  accessibilityState={{ selected }}
                  onPress={() => setCover({ plateId: plate.id })}
                  pressScale={0.95}
                  style={[styles.plate, { borderColor: selected ? colors.primary : 'transparent' }]}>
                  <PlateArt id={plate.id} radius={radius.sm - 2} />
                </Tappable>
              );
            })}
          </ScrollView>
        </View>
      )}

      <Field
        label="Title"
        value={story.title}
        onChangeText={(title) => edit((draft) => ({ ...draft, title }))}
        onBlur={flush}
        placeholder="Your book needs a title"
        story
        maxLength={80}
        autoCapitalize="words"
      />
      <Field
        label="Author"
        value={cover.author}
        onChangeText={(author) => edit((draft) => ({ ...draft, cover: { ...draft.cover, author } }))}
        onBlur={flush}
        placeholder="Your name, as it goes on the cover"
        maxLength={40}
        autoCapitalize="words"
      />
      <Field
        label="Dedication"
        hint="Optional. Who is this book for?"
        value={story.work.publishing.dedication}
        onChangeText={(value) => setPublishing('dedication', value)}
        onBlur={flush}
        placeholder="For…"
        story
        lines={2}
        maxLength={200}
      />
      <Field
        label="About the author"
        hint="Optional. Write it like the back page of a real book."
        value={story.work.publishing.about}
        onChangeText={(value) => setPublishing('about', value)}
        onBlur={flush}
        placeholder={`${cover.author.trim() || 'The author'} lives…`}
        story
        lines={4}
        maxLength={600}
      />

      <Section label="Before you publish" style={styles.checks}>
        {checks.map((check) => (
          <View key={check.id} style={styles.check}>
            <Ionicons
              name={check.ok ? 'checkmark-circle' : 'ellipse-outline'}
              size={18}
              color={check.ok ? colors.success : colors.inkFaint}
            />
            <Text variant="callout" tone={check.ok ? 'ink' : 'muted'}>
              {check.label}
            </Text>
          </View>
        ))}
      </Section>

      <View style={styles.publish}>
        <Button
          label={story.publishedAt ? 'Publish a new edition' : 'Publish my book'}
          variant="accent"
          icon="book-outline"
          onPress={publish}
          disabled={!ready}
          block
        />
        <Text variant="footnote" tone="muted" align="center">
          {story.publishedAt
            ? `First published ${formatShortDate(story.publishedAt)}. A new edition keeps your changes.`
            : 'You’ll get a PDF book with a title page, your chapters and pictures, and an About the Author page.'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: space.xl },
  stage: { alignItems: 'center', paddingVertical: space.xxl, borderRadius: radius.lg },
  group: { gap: space.sm },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: space.xs },
  swatchRing: { width: 44, height: 44, borderRadius: 22, borderWidth: hairline * 4, padding: 4 },
  swatch: { flex: 1, borderRadius: 18 },
  plates: { gap: space.xs, paddingRight: space.lg },
  plate: { width: 104, borderWidth: 2, borderRadius: radius.sm, padding: 2 },
  checks: { marginTop: 0 },
  check: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  publish: { gap: space.sm },
});
