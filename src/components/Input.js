import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GRAY, PRIMARY } from '../colors';

export const KeyBoardTypes = {
  DEFAULT: 'default',
  EMAIL: 'email-address',
};

export const ReturnKeyTypes = {
  DONE: 'done',
  NEXT: 'next',
};

export const InputTypes = {
  EMAIL: 'EMAIL',
  PASSWORD: 'PASSWORD',
};

const InputTypeProps = {
  EMAIL: {
    title: 'EMAIL',
    placeholder: 'your@email.com',
    keyboardType: 'email-address',
    secureTextEntry: false,
    iconName: {
      active: 'email',
      inactive: 'email-outline',
    },
  },
  PASSWORD: {
    title: 'PASSWORD',
    placeholder: 'PASSWORD',
    keyboardType: 'default',
    secureTextEntry: true,
    iconName: {
      active: 'lock',
      inactive: 'lock-outline',
    },
  },
};

const Input = forwardRef(({ inputType, styles, ...props }, ref) => {
  const {
    title,
    placeholder,
    keyboardType,
    secureTextEntry,
    iconName: { active, inactive },
  } = InputTypeProps[inputType];

  const { value } = props;

  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[defaultStyles.container, styles?.container]}>
      <Text
        style={[
          defaultStyles.title,
          {
            color: value || isFocused ? PRIMARY.DEFAULT : GRAY.DARK,
          },
          styles?.title,
        ]}
      >
        {title}
      </Text>
      <View>
        <TextInput
          ref={ref}
          {...props}
          placedholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[
            defaultStyles.input,
            {
              borderColor: value || isFocused ? PRIMARY.DEFAULT : GRAY.DARK,
              color: value || isFocused ? PRIMARY.DEFAULT : GRAY.DARK,
            },
            styles?.input,
          ]}
          textContentType="none"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View style={[defaultStyles.icon, styles?.icon]}>
          <MaterialCommunityIcons
            name={isFocused ? active : inactive}
            size={24}
            color={value || isFocused ? PRIMARY.DEFAULT : GRAY.DEFAULT}
          />
        </View>
      </View>
    </View>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  inputType: PropTypes.oneOf(Object.values(InputTypeProps)).isRequired,
  value: PropTypes.string.isRequired,
  styles: PropTypes.object,
};

const defaultStyles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    marginBottom: 4,
    fontWeight: '700',
  },
  input: {
    borderBottomWidth: 1,
    borderRadius: 8,
    height: 42,
    paddingHorizontal: 10,
    paddingLeft: 40,
  },
  icon: {
    position: 'absolute',
    left: 8,
    height: '100%',
    justifyContent: 'center',
  },
});

export default Input;
