import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native';

export default function ListItem({ item, onDelete }) {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <MaterialCommunityIcons
          name="check-outline"
          size={25}
          color="#696969"
        />
        <Text style={styles.text}>{item.text}</Text>
      </View>
      <TouchableWithoutFeedback onPress={() => onDelete(item.id)}>
        <MaterialCommunityIcons name="delete" size={25} color="red" />
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginHorizontal: 10,
    color: '#0c0c0c',
  },
  date: {
    fontSize: 14,
    color: '#0c0c0c',
  },
});
