import { StyleSheet, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import AppTextInput from '../components/AppTextInput';
import AppError from '../components/AppError';
import AppButton from '../components/AppButton';
import { baseUrl } from '../config';
import { getToken, saveToken } from '../modules/auth';

const initialValues = {
  email: '',
  username: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email().required().label('Email'),
  username: Yup.string().required().min(4).label('Username'),
  password: Yup.string().required().min(5).label('Password'),
});

export default function RegisterScreen({ navigation }) {
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      checkToken();
    }
  }, [isFocused]);

  const checkToken = async () => {
    const token = await getToken();
    if (token) {
      navigation.navigate('Home');
    }
  };

  const submitForm = async (values) => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch(baseUrl + '/users/register', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-type': 'application/json',
        },
      });
      const data = await res.json();
      setLoading(false);

      if (res.status !== 200) {
        setError(data.message);
        return;
      }

      await saveToken(data.token);
      navigation.navigate('List');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitForm}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <AppTextInput
              icon="email"
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              autoCapitalize="none"
            />
            {errors.email && touched.email && <AppError text={errors.email} />}

            <AppTextInput
              icon="account"
              placeholder="Username"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              autoCapitalize="none"
            />
            {errors.username && touched.username && (
              <AppError text={errors.username} />
            )}

            <AppTextInput
              icon="lock"
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              autoCapitalize="none"
              secureTextEntry
            />
            {errors.password && touched.password && (
              <AppError text={errors.password} />
            )}

            {error && <AppError text={error} />}
            {isLoading && (
              <ActivityIndicator style={{ margin: 10 }} size="large" />
            )}
            <AppButton title="Register" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },
});
