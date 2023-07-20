import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function AppError({ text }) {
  return (
    <View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: '400',
    color: 'red',
    textAlign: 'center',
    padding: 10,
  },
});
