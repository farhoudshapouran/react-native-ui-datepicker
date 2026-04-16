import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';

export default function MainPage() {
  return (
    <ScrollView contentContainerStyle={styles.list}>
      <Link href="/bottom-sheet">
        <ThemedText>Bottom Sheet</ThemedText>
      </Link>
      <Link href="/multi-month">
        <ThemedText>Multi Month Range Picker</ThemedText>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 20,
    gap: 16,
  },
});
