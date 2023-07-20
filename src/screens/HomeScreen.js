import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

import AppButton from '../components/AppButton';
import Heading from '../components/Heading';
import { getToken, removeToken } from '../modules/auth';

export default function HomeScreen({ navigation }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      checkToken();
    }
  }, [isFocused]);

  const checkToken = async () => {
    const token = await getToken();
    if (token) {
      setLoggedIn(true);
    }
  };

  const logout = async () => {
    await removeToken();
    setLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      <Heading text="Todo App" />

      {loggedIn ? (
        <>
          <AppButton
            title="My List"
            onPress={() => navigation.navigate('List')}
          />
          <AppButton title="LogOut" onPress={logout} />
        </>
      ) : (
        <>
          <AppButton
            title="Login"
            onPress={() => navigation.navigate('Login')}
          />
          <AppButton
            title="Register"
            onPress={() => navigation.navigate('Register')}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 30,
  },
});
