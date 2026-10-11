import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import { FeatherMark, Wordmark } from '@/components/brand/logo';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { TopBar } from '@/components/ui/top-bar';
import { useAppStore } from '@/store/app-store';
import { space } from '@/theme/layout';

const MAX_NAME = 32;

export default function WelcomeScreen() {
  const [step, setStep] = useState<'hello' | 'name'>('hello');
  return step === 'hello' ? (
    <Hello onStart={() => setStep('name')} />
  ) : (
    <PenName onBack={() => setStep('hello')} />
  );
}

function Hello({ onStart }: { onStart: () => void }) {
  return (
    <Screen
      scroll={false}
      footer={
        <View style={styles.footer}>
          <Button label="Start writing" onPress={onStart} block />
          <Text variant="footnote" tone="muted" align="center">
            No account, no ads. Your stories stay on this device.
          </Text>
        </View>
      }>
      <View style={styles.hello}>
        <Animated.View entering={FadeIn.duration(700)} style={styles.brand}>
          <FeatherMark height={96} />
          <Wordmark width={200} />
        </Animated.View>
        <Animated.View entering={FadeInDown.duration(600).delay(250)} style={styles.copy}>
          <Text variant="display">Find your voice.</Text>
          <Text variant="body" tone="muted" style={styles.lede}>
            Write On! walks you from your first idea to a finished book. Your coach asks good questions. It
            never writes a word for you.
          </Text>
        </Animated.View>
      </View>
    </Screen>
  );
}

function PenName({ onBack }: { onBack: () => void }) {
  const signIn = useAppStore((state) => state.signIn);
  const [name, setName] = useState('');
  const [classCode, setClassCode] = useState('');
  const cleanName = name.trim().replace(/\s+/g, ' ');
  const submit = () => {
    if (cleanName) signIn(cleanName, classCode.trim().toUpperCase());
  };

  return (
    <Screen
      header={<TopBar onLeadingPress={onBack} />}
      footer={<Button label="Open my notebook" onPress={submit} disabled={!cleanName} block />}>
      <Animated.View entering={FadeInDown.duration(450)} style={styles.form}>
        <View style={styles.formIntro}>
          <Text variant="title1">What should we call you?</Text>
          <Text variant="body" tone="muted">
            This name goes on the cover of your books. Use your real name, or make up a pen name.
          </Text>
        </View>
        <Field
          label="Pen name"
          value={name}
          onChangeText={setName}
          placeholder="Your name"
          autoFocus
          autoCapitalize="words"
          autoCorrect={false}
          autoComplete="off"
          maxLength={MAX_NAME}
          returnKeyType="done"
          onSubmitEditing={submit}
        />
        <Field
          label="Class code"
          hint="Optional. Your teacher can give you one."
          value={classCode}
          onChangeText={setClassCode}
          placeholder="ABC123"
          autoCapitalize="characters"
          autoCorrect={false}
          autoComplete="off"
          maxLength={8}
          returnKeyType="done"
          onSubmitEditing={submit}
        />
      </Animated.View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hello: { flex: 1, justifyContent: 'center', gap: space.xxl, paddingTop: space.xxl },
  brand: { gap: space.lg },
  copy: { gap: space.sm },
  lede: { maxWidth: 340 },
  footer: { gap: space.sm, paddingTop: space.xs },
  form: { gap: space.xl, paddingTop: space.sm },
  formIntro: { gap: space.xs },
});
