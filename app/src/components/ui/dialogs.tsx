import { Feather } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { gutter, hairline, radius, space } from '@/theme/layout';
import { useTheme } from '@/theme/use-theme';

import { Button } from './button';
import { Field } from './field';
import { Tappable } from './tappable';
import { Text } from './text';

export interface SheetAction {
  label: string;
  icon: keyof typeof Feather.glyphMap;
  onPress: () => void;
  destructive?: boolean;
}

interface ActionSheetProps {
  visible: boolean;
  title?: string;
  actions: SheetAction[];
  onClose: () => void;
}

/** A short list of actions that slides up from the bottom. */
export function ActionSheet({ visible, title, actions, onClose }: ActionSheetProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  // iOS can't present a picker or another modal while this one is still closing,
  // so the chosen action waits until the sheet is fully gone.
  const pending = useRef<(() => void) | null>(null);
  const choose = (action: SheetAction) => {
    if (Platform.OS === 'ios') pending.current = action.onPress;
    onClose();
    if (Platform.OS !== 'ios') action.onPress();
  };
  const runPending = () => {
    const action = pending.current;
    pending.current = null;
    action?.();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      onDismiss={runPending}
      statusBarTranslucent>
      <Pressable
        accessibilityLabel="Close"
        style={[styles.scrim, { backgroundColor: colors.scrim }]}
        onPress={onClose}
      />
      <View
        style={[
          styles.sheet,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            paddingBottom: insets.bottom + space.sm,
          },
        ]}>
        {title ? (
          <Text variant="overline" tone="muted" style={styles.sheetTitle}>
            {title}
          </Text>
        ) : null}
        {actions.map((action) => {
          const color = action.destructive ? colors.accent : colors.ink;
          return (
            <Tappable
              key={action.label}
              accessibilityLabel={action.label}
              pressScale={0.98}
              onPress={() => choose(action)}
              style={styles.action}>
              <Feather name={action.icon} size={20} color={color} />
              <Text variant="headline" style={{ color }}>
                {action.label}
              </Text>
            </Tappable>
          );
        })}
        <Button label="Cancel" variant="secondary" size="md" onPress={onClose} block style={styles.cancel} />
      </View>
    </Modal>
  );
}

interface PromptDialogProps {
  visible: boolean;
  title: string;
  label: string;
  initialValue: string;
  placeholder?: string;
  maxLength?: number;
  story?: boolean;
  onSave: (value: string) => void;
  onClose: () => void;
}

/** Ask for one line of text, like a new title. */
export function PromptDialog({ visible, ...props }: PromptDialogProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={props.onClose}
      statusBarTranslucent>
      {visible && <PromptBody {...props} />}
    </Modal>
  );
}

function PromptBody({
  title,
  label,
  initialValue,
  placeholder,
  maxLength = 80,
  story,
  onSave,
  onClose,
}: Omit<PromptDialogProps, 'visible'>) {
  const { colors } = useTheme();
  const [value, setValue] = useState(initialValue);
  const save = () => {
    onSave(value.trim());
    onClose();
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.center}>
      <Pressable
        accessibilityLabel="Close"
        style={[styles.scrim, { backgroundColor: colors.scrim }]}
        onPress={onClose}
      />
      <View style={[styles.dialog, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text variant="title3">{title}</Text>
        <Field
          label={label}
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          maxLength={maxLength}
          story={story}
          autoFocus
          selectTextOnFocus
          returnKeyType="done"
          onSubmitEditing={save}
        />
        <View style={styles.dialogActions}>
          <Button label="Cancel" variant="quiet" size="md" onPress={onClose} />
          <Button label="Save" size="md" onPress={save} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrim: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: radius.lg + 4,
    borderTopRightRadius: radius.lg + 4,
    borderWidth: hairline,
    paddingTop: space.md,
    paddingHorizontal: gutter,
  },
  sheetTitle: { marginBottom: space.xs },
  action: { flexDirection: 'row', alignItems: 'center', gap: space.md, minHeight: 52 },
  cancel: { marginTop: space.sm },
  center: { flex: 1, justifyContent: 'center', padding: gutter },
  dialog: {
    borderRadius: radius.lg + 4,
    borderWidth: hairline,
    padding: space.lg,
    gap: space.md,
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
  },
  dialogActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: space.sm },
});
