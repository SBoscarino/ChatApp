import MainScreen from './app/components/mainScreen/mainScreen';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <MainScreen />
    </View>
  );
}

// global styles.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: '100%',
  },
});
