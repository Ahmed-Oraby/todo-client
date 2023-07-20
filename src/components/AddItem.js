import { StyleSheet, Text, View, Keyboard } from 'react-native';
import React, { useState } from 'react';
import AppTextInput from './AppTextInput';
import { TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AddItem({ onPress }) {
  const [text, setText] = useState('');

  const handleAdd = () => {
    Keyboard.dismiss();
    onPress(text);
    setText('');
  };

  return (
    <View style={styles.container}>
      <AppTextInput
        icon="pencil"
        onChangeText={setText}
        value={text}
        placeholder="Add an Item"
      />
      <TouchableWithoutFeedback onPress={handleAdd}>
        <MaterialCommunityIcons
          name="plus-box-outline"
          size={30}
          color="#696969"
        />
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
