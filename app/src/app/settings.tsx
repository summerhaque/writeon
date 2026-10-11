import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { FeatherMark } from '@/components/brand/logo';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/choice';
import { Field } from '@/components/ui/field';
import { Screen } from '@/components/ui/screen';
import { Section } from '@/components/ui/surface';
import { Text } from '@/components/ui/text';
import { TopBar } from '@/components/ui/top-bar';
import { eraseSavedFiles } from '@/lib/local-files';
import { useAppStore, type AppearancePreference } from '@/store/app-store';
import { space } from '@/theme/layout';

const APPEARANCES: { id: AppearancePreference; label: string }[] = [
  { id: 'system', label: 'Match my device' },
  { id: 'light', label: 'Paper' },
  { id: 'dark', label: 'Ink' },
];

export default function SettingsScreen() {
  const profile = useAppStore((state) => state.profile);
  const appearance = useAppStore((state) => state.appearance);
  const updateProfile = useAppStore((state) => state.updateProfile);
  const setAppearance = useAppStore((state) => state.setAppearance);
  const startOver = useAppStore((state) => state.startOver);
  const [penName, setPenName] = useState(profile?.penName ?? '');
  const [classCode, setClassCode] = useState(profile?.classCode ?? '');

  const savePenName = () => {
    const clean = penName.trim().replace(/\s+/g, ' ');
    if (clean) updateProfile({ penName: clean });
    else setPenName(profile?.penName ?? '');
  };

  const confirmStartOver = () =>
    Alert.alert(
      'Start over?',
      'This erases every story, picture, badge and setting on this device. It can’t be undone.',
      [
        { text: 'Keep everything', style: 'cancel' },
        {
          text: 'Erase and start over',
          style: 'destructive',
          onPress: () => {
            eraseSavedFiles();
            startOver();
          },
        },
      ],
    );

  return (
    <Screen header={<TopBar title="Settings" />}>
      <Section label="You" style={styles.first}>
        <Field
          label="Pen name"
          hint="New books use this name. Books you’ve already made keep theirs."
          value={penName}
          onChangeText={setPenName}
          onBlur={savePenName}
          onSubmitEditing={savePenName}
          maxLength={32}
          autoCapitalize="words"
          autoCorrect={false}
          returnKeyType="done"
        />
        <Field
          label="Class code"
          hint="Optional. From your teacher."
          value={classCode}
          onChangeText={setClassCode}
          onBlur={() => updateProfile({ classCode: classCode.trim().toUpperCase() })}
          placeholder="ABC123"
          maxLength={8}
          autoCapitalize="characters"
          autoCorrect={false}
          returnKeyType="done"
        />
      </Section>

      <Section label="Appearance">
        <View style={styles.chips} accessibilityRole="radiogroup">
          {APPEARANCES.map((option) => (
            <Chip
              key={option.id}
              label={option.label}
              selected={appearance === option.id}
              onPress={() => setAppearance(option.id)}
            />
          ))}
        </View>
      </Section>

      <Section label="How the coach works">
        <Text variant="body" tone="muted">
          Coach Sparkle runs right here on this device. It asks questions and gives hints, three at a time. It
          never writes your story, even if you ask nicely.
        </Text>
      </Section>

      <Section label="Your stories">
        <Text variant="body" tone="muted">
          Everything you write stays on this device. Nothing is uploaded, and there are no ads.
        </Text>
        <Button
          label="Erase everything and start over"
          variant="quiet"
          onPress={confirmStartOver}
          style={styles.danger}
        />
      </Section>

      <View style={styles.about}>
        <FeatherMark height={48} />
        <Text variant="footnote" tone="muted" align="center">
          Write On! 1.0{'\n'}Everyone has a story worth telling.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  first: { marginTop: space.sm },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.xs },
  danger: { marginLeft: -space.xs },
  about: { alignItems: 'center', gap: space.sm, marginTop: space.xxxl },
});
