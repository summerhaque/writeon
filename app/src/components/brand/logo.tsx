import { StyleSheet, View } from 'react-native';
import Svg, { G, Path, Rect } from 'react-native-svg';

import { Text } from '@/components/ui/text';
import { fontFamily } from '@/theme/typography';
import { useTheme } from '@/theme/use-theme';

/**
 * The Write On! mark: three written lines, and a pencil finishing the middle one.
 * Geometry from brand/writeon-mark.svg (standard) and brand/writeon-mark-icon.svg
 * (the icon cut, with shorter lines and thicker bars, for anything under 48pt).
 */
const CUTS = {
  standard: {
    viewBox: { x: 304.7, y: 150.7, width: 556.6, height: 255.6 },
    lines: [
      { y: 219, width: 230 },
      { y: 287, width: 300 },
      { y: 355, width: 170 },
    ],
    bar: 26,
    pencil: { x: 620, y: 352, tip: 24.99, wood: 73.5, band: 196, eraser: 209.475, end: 236 },
  },
  icon: {
    viewBox: { x: 306.6, y: 164.6, width: 515.9, height: 265.9 },
    lines: [
      { y: 213, width: 205 },
      { y: 291, width: 255 },
      { y: 369, width: 145 },
    ],
    bar: 38,
    pencil: { x: 590, y: 358, tip: 23.97, wood: 70.5, band: 188, eraser: 200.925, end: 226 },
  },
} as const;

const INKS = {
  light: {
    lines: '#97CDF4',
    graphite: '#12354F',
    woodLight: '#F6E7CE',
    woodShade: '#E7D2AF',
    bodyLight: '#C4E3FA',
    body: '#97CDF4',
    bodyShade: '#3E8FD0',
    band: '#12354F',
    eraser: '#F2A65A',
  },
  dark: {
    lines: '#BFE0FA',
    graphite: '#FFFFFF',
    woodLight: '#FBF1DE',
    woodShade: '#EDDCBC',
    bodyLight: '#E4F2FD',
    body: '#BFE0FA',
    bodyShade: '#7FB8E8',
    band: '#FFFFFF',
    eraser: '#F2A65A',
  },
} as const;

type Cut = keyof typeof CUTS;

function Mark({ height, cut }: { height: number; cut: Cut }) {
  const { scheme } = useTheme();
  const { viewBox, lines, bar, pencil: p } = CUTS[cut];
  const ink = INKS[scheme];
  const half = 30;
  const tipHalf = 10.2;

  return (
    <Svg
      width={(height * viewBox.width) / viewBox.height}
      height={height}
      viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
      accessibilityElementsHidden
      importantForAccessibility="no">
      {lines.map((line) => (
        <Rect key={line.y} x={330} y={line.y} width={line.width} height={bar} rx={bar / 2} fill={ink.lines} />
      ))}
      <G transform={`translate(${p.x} ${p.y}) rotate(-38)`}>
        <Path d={`M0 0 L${p.tip} ${-tipHalf} L${p.tip} ${tipHalf} Z`} fill={ink.graphite} />
        <Path
          d={`M${p.tip} ${-tipHalf} L${p.wood} ${-half} L${p.wood} 0 L${p.tip} 0 Z`}
          fill={ink.woodLight}
        />
        <Path d={`M${p.tip} ${tipHalf} L${p.wood} ${half} L${p.wood} 0 L${p.tip} 0 Z`} fill={ink.woodShade} />
        <Path d={`M${p.wood} ${-half} H${p.band} V-5.4 H${p.wood} Z`} fill={ink.bodyLight} />
        <Path d={`M${p.wood} -5.4 H${p.band} V12.6 H${p.wood} Z`} fill={ink.body} />
        <Path d={`M${p.wood} 12.6 H${p.band} V${half} H${p.wood} Z`} fill={ink.bodyShade} />
        <Path d={`M${p.band} ${-half} H${p.eraser} V${half} H${p.band} Z`} fill={ink.band} />
        <Path
          d={`M${p.eraser} ${-half} H${p.end} A9 9 0 0 1 ${p.end} ${half} H${p.eraser} Z`}
          fill={ink.eraser}
        />
      </G>
    </Svg>
  );
}

interface LogoProps {
  /** `mark` and `icon` are the drawing alone; `lockup` and `stacked` add the name. */
  variant?: 'mark' | 'icon' | 'lockup' | 'stacked';
  /** Height of the mark, in points. */
  height?: number;
}

export function Logo({ variant = 'lockup', height = 40 }: LogoProps) {
  // Under 48pt the standard cut's thin lines blur, so small marks use the icon cut.
  const cut: Cut = variant === 'icon' || height < 48 ? 'icon' : 'standard';
  const mark = <Mark height={height} cut={cut} />;
  if (variant === 'mark' || variant === 'icon') {
    return (
      <View accessible accessibilityRole="image" accessibilityLabel="Write On!">
        {mark}
      </View>
    );
  }

  const nameSize = variant === 'stacked' ? height * 0.42 : height * 0.62;
  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel="Write On!"
      style={variant === 'stacked' ? styles.stacked : styles.lockup}>
      {mark}
      <Text style={[styles.name, { fontSize: nameSize, letterSpacing: -nameSize * 0.02 }]}>Write On!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  lockup: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  stacked: { alignItems: 'center', gap: 6 },
  name: { fontFamily: fontFamily.extrabold },
});
