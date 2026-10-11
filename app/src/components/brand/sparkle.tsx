import Svg, { Path } from 'react-native-svg';

import { useTheme } from '@/theme/use-theme';

/** Coach Sparkle's mark: a four-point spark, like light catching a nib. */
export function Sparkle({ size = 20, color }: { size?: number; color?: string }) {
  const { colors } = useTheme();
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      accessibilityElementsHidden
      importantForAccessibility="no">
      <Path
        d="M12 1.5c.5 4.9 2.6 8 8.5 10.5-5.9 2.5-8 5.6-8.5 10.5-.5-4.9-2.6-8-8.5-10.5C9.4 9.5 11.5 6.4 12 1.5Z"
        fill={color ?? colors.accent}
      />
    </Svg>
  );
}
