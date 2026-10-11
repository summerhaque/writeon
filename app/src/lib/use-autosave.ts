import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

export type SaveState = 'idle' | 'pending' | 'saved';

/**
 * Keeps an editable copy of a value and writes it back on a short debounce,
 * when the app goes to the background, and when the screen closes.
 * Call `flush` on blur so nothing waits on a timer.
 */
export function useAutosave<T>(initial: () => T, save: (value: T) => void, delay = 600) {
  const [draft, setDraft] = useState<T>(initial);
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const latest = useRef(draft);
  const dirty = useRef(false);
  const saveRef = useRef(save);

  useEffect(() => {
    saveRef.current = save;
  });

  const flush = useCallback(() => {
    if (!dirty.current) return;
    dirty.current = false;
    saveRef.current(latest.current);
    setSaveState('saved');
  }, []);

  const update = useCallback((recipe: (previous: T) => T) => {
    latest.current = recipe(latest.current);
    dirty.current = true;
    setDraft(latest.current);
    setSaveState('pending');
  }, []);

  /** Replace the draft with a fresh copy from storage, dropping nothing: only call when clean. */
  const reset = useCallback((value: T) => {
    latest.current = value;
    dirty.current = false;
    setDraft(value);
    setSaveState('idle');
  }, []);

  const isDirty = useCallback(() => dirty.current, []);

  useEffect(() => {
    if (saveState !== 'pending') return;
    const timer = setTimeout(flush, delay);
    return () => clearTimeout(timer);
  }, [draft, saveState, flush, delay]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      if (state !== 'active') flush();
    });
    return () => {
      subscription.remove();
      flush();
    };
  }, [flush]);

  return { draft, update, flush, reset, isDirty, saveState };
}
