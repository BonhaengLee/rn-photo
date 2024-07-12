import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Keyboard, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Input, { InputTypes, ReturnKeyTypes } from '../components/Input';
import Button from '../components/Button';
import SafeInputView from '../components/SafeInputView';
import TextButton from '../components/TextButton';
import { AuthRoutes } from '../navigations/routes';
import HR from '../components/HR';
import { StatusBar } from 'expo-status-bar';
import { WHITE } from '../colors';

const SignInScreen = () => {
  const navigation = useNavigation();
  const { top, bottom } = useSafeAreaInsets();

  const passwordRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!email || !password);
  }, [email, password]);

  const onSubmit = () => {
    Keyboard.dismiss();
    if (!disabled && !isLoading) {
      setIsLoading(true);
      console.log(email, password);
      setIsLoading(false);
    }
  };

  return (
    <SafeInputView>
      <StatusBar style="light" />
      <View style={[styles.container, { paddingTop: top }]}>
        <View style={StyleSheet.absoluteFill}>
          <Image
            source={require('../../assets/cover.png')}
            style={{ width: '100%' }}
            resizeMode="cover"
          />
        </View>

        <View
          style={[
            styles.form,
            {
              paddingBottom: bottom ? bottom + 10 : 40,
            },
          ]}
        >
          <Text>Sign In</Text>
          <Input
            value={email}
            onChangeText={(text) => setEmail(text.trim())}
            onSubmitEditing={() => passwordRef.current.focus()}
            styles={{
              container: {
                marginBottom: 20,
              },
            }}
            inputType={InputTypes.EMAIL}
            returnKeyType={ReturnKeyTypes.NEXT}
          />

          <Input
            ref={passwordRef}
            onPress={onSubmit}
            disabled={disabled}
            isLoading={isLoading}
            value={password}
            onChangeText={(text) => setPassword(text.trim())}
            inputType={InputTypes.PASSWORD}
            returnKeyType={ReturnKeyTypes.DONE}
            styles={{
              container: {
                marginBottom: 20,
              },
            }}
          />

          <Button
            title="로그인"
            onPress={onSubmit}
            disabled={disabled}
            isLoading={isLoading}
            styles={{
              container: {
                marginTop: 20,
              },
            }}
          />

          <HR text={'OR'} styles={{ container: { marginVertical: 30 } }} />

          <TextButton
            title="회원가입"
            onPress={() => navigation.navigate(AuthRoutes.SIGN_UP)}
          />
        </View>
      </View>
    </SafeInputView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  form: {
    alignItems: 'center',
    backgroundColor: WHITE,
    paddingHorizontal: 20,
    paddingTop: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default SignInScreen;
