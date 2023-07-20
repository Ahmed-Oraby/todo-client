import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function Heading({ text }) {
  return <Text style={styles.heading}>{text}</Text>;
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#696969',
    textAlign: 'center',
    margin: 10,
  },
});
