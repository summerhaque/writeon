import { useEffect } from 'react';
import { Keyboard, Platform } from 'react-native';
import { Easing, useSharedValue, withTiming } from 'react-native-reanimated';

/**
 * How far the iOS keyboard covers the bottom of the screen, animated in step
 * with it. Works inside sheets, where KeyboardAvoidingView miscounts the offset.
 * Android resizes the window for the keyboard on its own, so this stays 0 there.
 */
export function useKeyboardInset() {
  const inset = useSharedValue(0);

  useEffect(() => {
    if (Platform.OS !== 'ios') return;
    const show = Keyboard.addListener('keyboardWillShow', (event) => {
      inset.value = withTiming(event.endCoordinates.height, {
        duration: event.duration || 250,
        easing: Easing.out(Easing.cubic),
      });
    });
    const hide = Keyboard.addListener('keyboardWillHide', (event) => {
      inset.value = withTiming(0, { duration: event.duration || 250, easing: Easing.out(Easing.cubic) });
    });
    return () => {
      show.remove();
      hide.remove();
    };
  }, [inset]);

  return inset;
}
