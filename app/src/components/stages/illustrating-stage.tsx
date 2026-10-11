import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useState } from 'react';
import { Alert, Linking, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown, FadeOut, LinearTransition } from 'react-native-reanimated';

import { PlateArt } from '@/components/book/plate-art';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/choice';
import { ActionSheet } from '@/components/ui/dialogs';
import { Field } from '@/components/ui/field';
import { IconButton } from '@/components/ui/icon-button';
import { Section, Surface } from '@/components/ui/surface';
import { Tappable } from '@/components/ui/tappable';
import { Text } from '@/components/ui/text';
import { PLATES } from '@/content/plates';
import type { Illustration } from '@/domain/types';
import { discardDrawing, pickDrawing } from '@/lib/local-files';
import { haptics } from '@/lib/haptics';
import { makeId } from '@/lib/ids';
import { radius, space } from '@/theme/layout';
import { useTheme } from '@/theme/use-theme';

import { editWork, type StageProps } from './stage-props';

const MAX_PICTURES = 12;

export function IllustratingStage({ story, edit, flush }: StageProps) {
  const { colors } = useTheme();
  const { illustrations, chapters } = story.work;
  const [choosingSource, setChoosingSource] = useState(false);
  const full = illustrations.length >= MAX_PICTURES;
  const usedPlates = new Set(illustrations.map((i) => i.plateId));

  const add = (picture: Omit<Illustration, 'id' | 'caption' | 'chapterId'>) => {
    haptics.tap();
    editWork(edit, 'illustrations', (list) => [
      ...list,
      { ...picture, id: makeId('pic'), caption: '', chapterId: null },
    ]);
    flush();
  };

  const change = (id: string, patch: Partial<Illustration>) =>
    editWork(edit, 'illustrations', (list) => list.map((i) => (i.id === id ? { ...i, ...patch } : i)));

  const remove = (picture: Illustration) => {
    Alert.alert(
      'Remove this picture?',
      picture.source === 'photo' ? 'Your photo is removed from the book.' : undefined,
      [
        { text: 'Keep', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            editWork(edit, 'illustrations', (list) => list.filter((i) => i.id !== picture.id));
            flush();
            discardDrawing(picture.uri);
          },
        },
      ],
    );
  };

  const addPhoto = async (source: 'camera' | 'library') => {
    const result = await pickDrawing(source);
    if (result.status === 'picked') add({ source: 'photo', plateId: null, uri: result.uri });
    if (result.status === 'denied')
      Alert.alert(
        'Write On! can’t use the camera yet',
        'You can allow it in Settings, or choose a photo you already took.',
        [
          { text: 'Not now', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ],
      );
    if (result.status === 'unavailable')
      Alert.alert(
        'That didn’t work',
        'This device can’t take or open photos right now. Try choosing a scene instead.',
      );
  };

  return (
    <View style={styles.wrap}>
      {illustrations.length === 0 ? (
        <Text variant="callout" tone="muted">
          No pictures yet. Draw your own and snap a photo, or choose a scene below. Then tell readers where it
          goes.
        </Text>
      ) : (
        illustrations.map((picture) => (
          <Animated.View
            key={picture.id}
            entering={FadeInDown.duration(300)}
            exiting={FadeOut.duration(200)}
            layout={LinearTransition}>
            <Surface style={styles.picture}>
              {picture.source === 'plate' && picture.plateId ? (
                <PlateArt id={picture.plateId} />
              ) : (
                <Image
                  source={{ uri: picture.uri ?? undefined }}
                  style={[styles.photo, { backgroundColor: colors.fill }]}
                  contentFit="cover"
                  accessibilityLabel={picture.caption || 'Your drawing'}
                />
              )}
              <Field
                label="Caption"
                value={picture.caption}
                onChangeText={(caption) => change(picture.id, { caption })}
                onBlur={flush}
                placeholder="What’s happening in this picture?"
                story
                maxLength={140}
              />
              <View style={styles.place}>
                <Text variant="label">Goes after</Text>
                <View style={styles.chips} accessibilityRole="radiogroup">
                  {chapters.map((chapter, i) => (
                    <Chip
                      key={chapter.id}
                      label={`Chapter ${i + 1}`}
                      selected={picture.chapterId === chapter.id}
                      onPress={() => {
                        change(picture.id, {
                          chapterId: picture.chapterId === chapter.id ? null : chapter.id,
                        });
                        flush();
                      }}
                    />
                  ))}
                </View>
              </View>
              <View style={styles.removeRow}>
                <IconButton
                  icon="trash-outline"
                  label="Remove picture"
                  tone="muted"
                  size={18}
                  onPress={() => remove(picture)}
                />
              </View>
            </Surface>
          </Animated.View>
        ))
      )}

      <Surface style={styles.drawCard}>
        <Ionicons name="camera-outline" size={22} color={colors.primary} />
        <View style={styles.flex}>
          <Text variant="headline">Use your own drawing</Text>
          <Text variant="footnote" tone="muted">
            Draw on paper, then take a photo of it.
          </Text>
        </View>
        <Button
          label="Add"
          size="sm"
          variant="secondary"
          disabled={full}
          onPress={() => setChoosingSource(true)}
        />
      </Surface>

      <Section label="Or choose a scene" style={styles.scenes}>
        {full && (
          <Text variant="footnote" tone="muted">
            That’s {MAX_PICTURES} pictures, the most a book can hold. Remove one to add another.
          </Text>
        )}
        <View style={styles.grid}>
          {PLATES.map((plate) => (
            <Tappable
              key={plate.id}
              accessibilityLabel={`Add ${plate.title}`}
              disabled={full}
              onPress={() => add({ source: 'plate', plateId: plate.id, uri: null })}
              pressScale={0.96}
              style={styles.cell}>
              <PlateArt id={plate.id} radius={radius.sm} />
              <View style={styles.cellLabel}>
                <Text variant="footnote" numberOfLines={1} style={styles.flex}>
                  {plate.title}
                </Text>
                {usedPlates.has(plate.id) && <Ionicons name="checkmark" size={14} color={colors.success} />}
              </View>
            </Tappable>
          ))}
        </View>
      </Section>

      <ActionSheet
        visible={choosingSource}
        title="Add your drawing"
        onClose={() => setChoosingSource(false)}
        actions={[
          { label: 'Take a photo', icon: 'camera-outline', onPress: () => addPhoto('camera') },
          { label: 'Choose from photos', icon: 'image-outline', onPress: () => addPhoto('library') },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: space.lg },
  picture: { gap: space.md },
  photo: { width: '100%', aspectRatio: 4 / 3, borderRadius: radius.md },
  place: { gap: space.xs },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.xs },
  removeRow: {
    alignItems: 'flex-end',
    marginTop: -space.sm,
    marginBottom: -space.sm,
    marginRight: -space.sm,
  },
  drawCard: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  flex: { flex: 1 },
  scenes: { marginTop: space.md },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm },
  cell: { flexBasis: '40%', flexGrow: 1, gap: space.xxs },
  cellLabel: { flexDirection: 'row', alignItems: 'center', gap: space.xxs },
});
