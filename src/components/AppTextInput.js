import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useRef } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AppTextInput({ icon, ...textProps }) {
  const inputRef = useRef(null);

  return (
    <TouchableWithoutFeedback onPress={() => inputRef.current.focus()}>
      <View style={styles.container}>
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={20}
            color="#696969"
            style={styles.icon}
          />
        )}
        <TextInput
          ref={inputRef}
          style={styles.text}
          placeholderTextColor="#696969"
          {...textProps}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 7,
    paddingHorizontal: 10,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    flex: 1,
    minHeight: 40,
  },
  text: {
    fontSize: 16,
    color: '#0c0c0c',
  },
  icon: {
    marginRight: 10,
  },
});
