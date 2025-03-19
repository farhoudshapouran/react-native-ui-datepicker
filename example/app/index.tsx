import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';

export default function MainPage() {
  return (
    <ScrollView>
      <Link href="/bottom-sheet">
        <ThemedText>Bottom Sheet</ThemedText>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 30,
    height: 400,
  },
});
