import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from '../data/theme';

export default function Layout() {
  return (
    <SafeAreaProvider style={{ backgroundColor: colors.darkGreen, flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}