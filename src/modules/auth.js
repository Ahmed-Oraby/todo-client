import * as SecureStore from 'expo-secure-store';

export const saveToken = async (token) =>
  await SecureStore.setItemAsync('jwt-token', token);

export const getToken = async () => await SecureStore.getItemAsync('jwt-token');

export const removeToken = async () =>
  await SecureStore.deleteItemAsync('jwt-token');
