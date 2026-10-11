import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown, FadeOut, LinearTransition } from 'react-native-reanimated';

import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/choice';
import { Field } from '@/components/ui/field';
import { IconButton } from '@/components/ui/icon-button';
import { Surface } from '@/components/ui/surface';
import { Text } from '@/components/ui/text';
import type { Character, CharacterRole } from '@/domain/types';
import { isBlank } from '@/domain/words';
import { makeId } from '@/lib/ids';
import { space } from '@/theme/layout';

import { editWork, type StageProps } from './stage-props';

const ROLES: { id: CharacterRole; label: string }[] = [
  { id: 'protagonist', label: 'Protagonist' },
  { id: 'antagonist', label: 'Antagonist' },
  { id: 'sidekick', label: 'Sidekick' },
  { id: 'other', label: 'Other' },
];

export function CharactersStage({ story, edit, flush }: StageProps) {
  const { characters } = story.work;
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const change = (id: string, patch: Partial<Character>) =>
    editWork(edit, 'characters', (list) => list.map((c) => (c.id === id ? { ...c, ...patch } : c)));

  const add = () => {
    const hasHero = characters.some((c) => c.role === 'protagonist');
    const character: Character = {
      id: makeId('c'),
      name: '',
      role: hasHero ? 'other' : 'protagonist',
      wants: '',
      fears: '',
      detail: '',
    };
    editWork(edit, 'characters', (list) => [...list, character]);
    setJustAdded(character.id);
  };

  const remove = (character: Character) => {
    const drop = () => editWork(edit, 'characters', (list) => list.filter((c) => c.id !== character.id));
    const empty = [character.name, character.wants, character.fears, character.detail].every(isBlank);
    if (empty) return drop();
    Alert.alert(
      `Remove ${character.name.trim() || 'this character'}?`,
      'Everything you wrote about them goes too.',
      [
        { text: 'Keep', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: drop },
      ],
    );
  };

  return (
    <View style={styles.list}>
      <Text variant="callout" tone="muted">
        The protagonist is who the story is about. The antagonist is who, or what, stands in their way.
      </Text>

      {characters.map((character, i) => (
        <Animated.View
          key={character.id}
          entering={FadeInDown.duration(300)}
          exiting={FadeOut.duration(200)}
          layout={LinearTransition}>
          <Surface style={styles.card}>
            <View style={styles.cardHead}>
              <Text variant="overline" tone="muted" style={styles.flex}>
                Character {i + 1}
              </Text>
              <IconButton
                icon="trash-outline"
                label={`Remove ${character.name || 'character'}`}
                tone="muted"
                size={18}
                onPress={() => remove(character)}
              />
            </View>
            <Field
              label="Name"
              value={character.name}
              onChangeText={(name) => change(character.id, { name })}
              onBlur={flush}
              story
              autoFocus={character.id === justAdded}
              autoCapitalize="words"
              maxLength={60}
            />
            <View style={styles.roles} accessibilityRole="radiogroup">
              {ROLES.map((role) => (
                <Chip
                  key={role.id}
                  label={role.label}
                  selected={character.role === role.id}
                  onPress={() => change(character.id, { role: role.id })}
                />
              ))}
            </View>
            <Field
              label="What do they want more than anything?"
              value={character.wants}
              onChangeText={(wants) => change(character.id, { wants })}
              onBlur={flush}
              story
              lines={2}
            />
            <Field
              label="What are they afraid of?"
              value={character.fears}
              onChangeText={(fears) => change(character.id, { fears })}
              onBlur={flush}
              story
              lines={2}
            />
            <Field
              label="One thing a reader would remember"
              hint="How they talk, look or move."
              value={character.detail}
              onChangeText={(detail) => change(character.id, { detail })}
              onBlur={flush}
              story
              lines={2}
            />
          </Surface>
        </Animated.View>
      ))}

      <Button
        label={characters.length === 0 ? 'Add your first character' : 'Add a character'}
        icon="add"
        variant={characters.length === 0 ? 'primary' : 'secondary'}
        onPress={add}
        block
      />

      <Field
        label="Notes"
        hint="Families, pets, enemies, nicknames. Anything you want to remember."
        value={story.work.characterNotes}
        onChangeText={(characterNotes) =>
          edit((draft) => ({ ...draft, work: { ...draft.work, characterNotes } }))
        }
        onBlur={flush}
        story
        lines={4}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: { gap: space.lg },
  card: { gap: space.md },
  cardHead: { flexDirection: 'row', alignItems: 'center', marginBottom: -space.xs, marginRight: -space.sm },
  flex: { flex: 1 },
  roles: { flexDirection: 'row', flexWrap: 'wrap', gap: space.xs },
});
