import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

const supported = Platform.OS === 'ios' || Platform.OS === 'android';

function run(effect: () => Promise<void>) {
  if (!supported) return;
  // Haptics are a nicety. A device that can't buzz shouldn't throw.
  effect().catch(() => {});
}

export const haptics = {
  select: () => run(() => Haptics.selectionAsync()),
  tap: () => run(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)),
  thump: () => run(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)),
  success: () => run(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)),
  warning: () => run(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)),
};
