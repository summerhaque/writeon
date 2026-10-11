import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Logo } from '@/components/brand/logo';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/choice';
import { Field } from '@/components/ui/field';
import { Screen } from '@/components/ui/screen';
import { Section } from '@/components/ui/surface';
import { Text } from '@/components/ui/text';
import { TopBar } from '@/components/ui/top-bar';
import { eraseSavedFiles } from '@/lib/local-files';
import { useAppStore, type AppearancePreference } from '@/store/app-store';
import { useStories } from '@/store/selectors';
import { space } from '@/theme/layout';

const APPEARANCES: { id: AppearancePreference; label: string }[] = [
  { id: 'system', label: 'System' },
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
];

export default function SettingsScreen() {
  const profile = useAppStore((state) => state.profile);
  const appearance = useAppStore((state) => state.appearance);
  const updateProfile = useAppStore((state) => state.updateProfile);
  const setAppearance = useAppStore((state) => state.setAppearance);
  const startOver = useAppStore((state) => state.startOver);
  const published = useStories().filter((story) => story.publishedAt !== null).length;
  const [penName, setPenName] = useState(profile?.penName ?? '');
  const [classCode, setClassCode] = useState(profile?.classCode ?? '');

  const savePenName = () => {
    const clean = penName.trim().replace(/\s+/g, ' ');
    if (clean) updateProfile({ penName: clean });
    else setPenName(profile?.penName ?? '');
  };

  const erase = () => {
    eraseSavedFiles();
    startOver();
  };

  // Books come first: anyone with published books is sent to save them before anything is erased.
  const confirmStartOver = () =>
    Alert.alert(
      published > 0 ? 'Save your books first' : 'Start over?',
      published > 0
        ? `Starting over erases everything on this device, including ${published === 1 ? 'your published book' : `your ${published} published books`}. Open each one on your shelf and tap Share to save it as a PDF.`
        : 'This erases every story, picture, badge and setting on this device. It can’t be undone.',
      [
        published > 0
          ? { text: 'Go to my shelf', onPress: () => router.navigate('/shelf') }
          : { text: 'Keep everything', style: 'cancel' },
        {
          text: published > 0 ? 'Erase anyway' : 'Erase and start over',
          style: 'destructive',
          onPress: erase,
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

      <Section label="About this demo">
        <Text variant="body" tone="muted">
          This is a demo build of Write On! In the full app, Coach Sparkle is an AI writing coach: your
          writing goes to an AI model that is prompted to give hints, never answers.
        </Text>
        <Text variant="body" tone="muted">
          In this demo, the coach is scripted. It runs on this device and never connects to the internet.
        </Text>
      </Section>

      <Section label="Your stories">
        <Text variant="body" tone="muted">
          Your stories save as you type, on this device.
        </Text>
        <Button
          label="Erase everything and start over"
          variant="quiet"
          onPress={confirmStartOver}
          style={styles.danger}
        />
      </Section>

      <View style={styles.about}>
        <Logo variant="icon" height={40} />
        <Text variant="footnote" tone="muted" align="center">
          Write On! 1.0 · Demo build{'\n'}Made by Summer Haque
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
