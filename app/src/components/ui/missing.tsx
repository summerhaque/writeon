import { StyleSheet, View } from 'react-native';

import { space } from '@/theme/layout';

import { Button } from './button';
import { Screen } from './screen';
import { Text } from './text';
import { goBackOr, TopBar } from './top-bar';

/** Shown when a link points at a story or lesson that no longer exists. */
export function Missing({ what = 'story' }: { what?: string }) {
  return (
    <Screen header={<TopBar />} scroll={false}>
      <View style={styles.body}>
        <Text variant="title2" align="center">
          This {what} isn’t here anymore.
        </Text>
        <Text variant="callout" tone="muted" align="center">
          It may have been deleted. Everything else is safe.
        </Text>
        <Button label="Back to my desk" variant="secondary" onPress={() => goBackOr()} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: space.sm, paddingBottom: space.xxxl },
});
