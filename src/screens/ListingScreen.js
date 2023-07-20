import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import jwtDecode from 'jwt-decode';

import ListItem from '../components/ListItem';
import Seperator from '../components/Seperator';
import AddItem from '../components/AddItem';
import { getToken } from '../modules/auth';
import { baseUrl } from '../config';
import AppError from '../components/AppError';

export default function ListingScreen() {
  const [list, setList] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const decoded = jwtDecode(token);

      const res = await fetch(baseUrl + '/lists/user/' + decoded.user.id);
      const data = await res.json();
      setList(data.list);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteItem = async (id) => {
    setLoading(true);
    setError('');
    const token = await getToken();

    try {
      const res = await fetch(baseUrl + '/lists/deleteItem/' + id, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (res.status !== 200) {
        setError(data.message);
        return;
      }
      setList(list.filter((item) => item.id !== id));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddItem = async (text) => {
    setLoading(true);
    setError('');
    const token = await getToken();

    try {
      const res = await fetch(baseUrl + '/lists/addItem', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: text }),
      });
      const data = await res.json();

      if (res.status !== 200) {
        setError(data.message);
        return;
      }
      setList([data.newItem, ...list]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <AddItem onPress={handleAddItem} />
      {error && <AppError text={error} />}
      {isLoading && <ActivityIndicator style={{ margin: 10 }} size="large" />}

      <FlatList
        style={styles.list}
        data={list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItem item={item} onDelete={handleDeleteItem} />
        )}
        ItemSeparatorComponent={<Seperator />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    marginVertical: 10,
  },
});
