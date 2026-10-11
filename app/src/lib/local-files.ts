import { Directory, File, Paths } from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

import { makeId } from './ids';

export type DrawingResult =
  | { status: 'picked'; uri: string }
  | { status: 'cancelled' }
  | { status: 'denied' }
  | { status: 'unavailable' };

/**
 * A photo of the writer's own drawing, cropped to the book's 4:3 picture shape
 * and copied into the app's documents so it outlives the picker's cache.
 */
export async function pickDrawing(source: 'camera' | 'library'): Promise<DrawingResult> {
  try {
    if (source === 'camera') {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) return { status: 'denied' };
    }
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    };
    const result =
      source === 'camera'
        ? await ImagePicker.launchCameraAsync(options)
        : await ImagePicker.launchImageLibraryAsync(options);
    if (result.canceled || !result.assets[0]) return { status: 'cancelled' };

    const picked = new File(result.assets[0].uri);
    const folder = new Directory(Paths.document, 'drawings');
    if (!folder.exists) folder.create({ intermediates: true });
    const saved = new File(folder, `${makeId('drawing')}.${picked.extension.replace('.', '') || 'jpg'}`);
    await picked.copy(saved);
    return { status: 'picked', uri: saved.uri };
  } catch (error) {
    // No camera (a simulator, say) or the picker failed to open.
    console.warn('Could not add a drawing', error);
    return { status: 'unavailable' };
  }
}

/** Remove a saved drawing. Missing files are fine: there's nothing to clean up. */
export function discardDrawing(uri: string | null) {
  if (!uri) return;
  try {
    const file = new File(uri);
    if (file.exists) file.delete();
  } catch {
    // Best effort.
  }
}

/** Remove every drawing and exported book saved on this device. */
export function eraseSavedFiles() {
  for (const name of ['drawings', 'books']) {
    try {
      const folder = new Directory(Paths.document, name);
      if (folder.exists) folder.delete();
    } catch {
      // Best effort: a leftover file is harmless.
    }
  }
}
