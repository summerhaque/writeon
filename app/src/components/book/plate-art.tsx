import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { PLATE_BY_ID } from '@/content/plates';
import type { PlateId } from '@/domain/types';
import { radius as radii } from '@/theme/layout';

interface PlateArtProps {
  id: PlateId;
  /** Corner radius. Plates inside a cover sit square. */
  radius?: number;
  style?: StyleProp<ViewStyle>;
}

/** One of the curated scene plates, at 4:3, filling its width. */
export function PlateArt({ id, radius = radii.md, style }: PlateArtProps) {
  const plate = PLATE_BY_ID[id];
  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={plate.title}
      style={[styles.frame, { borderRadius: radius }, style]}>
      <SvgXml xml={plate.svg} width="100%" height="100%" />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: { width: '100%', aspectRatio: 4 / 3, overflow: 'hidden' },
});
