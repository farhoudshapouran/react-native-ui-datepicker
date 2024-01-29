import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  Linking,
} from 'react-native';

export default function GithubLink() {
  return (
    <View style={styles.githubContainer}>
      <Pressable
        style={styles.githubLink}
        onPress={() =>
          Linking.openURL(
            'https://github.com/farhoudshapouran/react-native-ui-datepicker'
          )
        }
        accessibilityRole="button"
        accessibilityLabel="Check repository on GitHub"
      >
        <Image
          source={require('../../assets/github-logo.png')}
          style={styles.githubLogo}
        />
        <Text style={styles.githubText}>Check repository on GitHub</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  githubContainer: {
    paddingVertical: 20,
  },
  githubLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  githubLogo: {
    width: 22,
    height: 22,
  },
  githubText: {
    marginLeft: 8,
  },
});
