import type { BottomTabBarProps } from 'expo-router/js-tabs';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';

import { Text } from '@/components/ui/text';
import { haptics } from '@/lib/haptics';
import { hairline, space } from '@/theme/layout';
import { fontFamily } from '@/theme/typography';
import { useTheme } from '@/theme/use-theme';

type TabIconName = 'desk' | 'shelf' | 'lessons' | 'progress';

const TABS: Record<string, { label: string; icon: TabIconName }> = {
  index: { label: 'Write', icon: 'desk' },
  shelf: { label: 'Shelf', icon: 'shelf' },
  lessons: { label: 'Lessons', icon: 'lessons' },
  progress: { label: 'Progress', icon: 'progress' },
};

function TabIcon({ name, color }: { name: TabIconName; color: string }) {
  const line = {
    stroke: color,
    strokeWidth: 1.7,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    fill: 'none',
  } as const;
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      {name === 'desk' && (
        <>
          <Path d="M15.2 4.8a2.3 2.3 0 0 1 3.3 0l.7.7a2.3 2.3 0 0 1 0 3.3L8.6 19.4 4 20l.6-4.6Z" {...line} />
          <Path d="m13.5 6.5 4 4" {...line} />
        </>
      )}
      {name === 'shelf' && (
        <>
          <Path d="M4.5 5.5h3.5v14H4.5zM9.5 3.5H13v16H9.5z" {...line} />
          <Path d="m14.6 7.3 3.3-.9 3.4 12.6-3.3.9z" {...line} />
          <Path d="M2.5 21.2h19" {...line} />
        </>
      )}
      {name === 'lessons' && (
        <>
          <Path
            d="M12 6.6C10 5.1 7.4 4.6 3.4 4.6v13.2c4 0 6.6.5 8.6 2 2-1.5 4.6-2 8.6-2V4.6c-4 0-6.6.5-8.6 2Z"
            {...line}
          />
          <Path d="M12 6.6v13.2" {...line} />
        </>
      )}
      {name === 'progress' && (
        <>
          <Circle cx={12} cy={9} r={5.6} {...line} />
          <Path d="M8.6 13.4 7.2 21l4.8-2.6 4.8 2.6-1.4-7.6" {...line} />
        </>
      )}
    </Svg>
  );
}

export function TabBar({ state, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.bar,
        {
          paddingBottom: Math.max(insets.bottom, space.sm),
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
      ]}>
      {state.routes.map((route, index) => {
        const tab = TABS[route.name];
        if (!tab) return null;
        const focused = state.index === index;
        const color = focused ? colors.primary : colors.inkFaint;

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) {
            haptics.select();
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <Pressable
            key={route.key}
            accessibilityRole="tab"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: focused }}
            onPress={onPress}
            style={styles.tab}>
            <View style={[styles.iconPill, focused && { backgroundColor: colors.primarySoft }]}>
              <TabIcon name={tab.icon} color={color} />
            </View>
            <Text
              variant="footnote"
              numberOfLines={1}
              style={{
                color,
                fontFamily: focused ? fontFamily.bold : fontFamily.medium,
                fontSize: 12,
              }}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    borderTopWidth: hairline,
    paddingTop: space.xs,
  },
  tab: { flex: 1, alignItems: 'center', gap: 2, paddingVertical: 2 },
  iconPill: { width: 56, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
});
