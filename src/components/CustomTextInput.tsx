import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Text, TextInput } from 'react-native-paper';
import { appColorsCode } from '../styles/appColorsCode';
import { useAppSelector } from '../hooks/hooks';

const CustomTextInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  secureTextEntry = false,
  leftIcon = null,
  leftImage = null,
  rightIcon = null,
  rightImage = null,
  editable = true,
  autoFocus = false,
  onChange,
  rightIconOnPress,
  leftIconDisabled = false,
  rightIconDisabled = false,
  disabled = false,
  style,
  ...props
}: any) => {
  const isDark = useAppSelector((state: any) => state.app.isDark);

  return (
    <View>
      <TextInput
        mode="outlined"
        label={<Text style={{ color: disabled ? appColorsCode.gray2 : (isDark ? appColorsCode.white : appColorsCode.primary), fontSize: 14, paddingTop: 4, fontFamily: 'Poppins-Regular' }}>{label}</Text>}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        disabled={disabled}
        secureTextEntry={secureTextEntry}
        editable={editable}
        autoFocus={autoFocus}
        onChange={onChange}
        left={
          leftIcon ? (
            <TextInput.Icon
              disabled={leftIconDisabled}
              icon={leftIcon}
              size={20}
              color={isDark ? appColorsCode.white : appColorsCode.primary}
            />
          ) : leftImage ? (
            leftImage
          ) : null
        }
        right={
          rightIcon ? (
            <TextInput.Icon
              disabled={rightIconDisabled}
              icon={rightIcon}
              size={20}
              color={isDark ? appColorsCode.white : appColorsCode.primary}
              onPress={rightIconOnPress}
            />
          ) : rightImage ? (
            rightImage
          ) : null
        }
        style={[styles.input, style]}
        textColor={isDark ? appColorsCode.white : appColorsCode.primary}
        outlineColor={isDark ? appColorsCode.white : appColorsCode.primary}
        activeOutlineColor={isDark ? appColorsCode.white : appColorsCode.primary}
        placeholderTextColor={isDark ? appColorsCode.black : appColorsCode.gray2}
        theme={{
          colors: {
            primary: isDark ? appColorsCode.black : appColorsCode.primary,
            background: isDark ? appColorsCode.black2 : appColorsCode.white,
            outline: isDark ? appColorsCode.black : appColorsCode.primary,
            outlineVariant: isDark ? appColorsCode.black : appColorsCode.primary,
            tertiaryContainer: isDark ? appColorsCode.black : appColorsCode.primary,
            onSurfaceVariant: isDark ? appColorsCode.white : appColorsCode.primary,
          }
        }}
        {...props}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    fontFamily: 'Poppins-Regular',
    marginBottom: 12
  },
});
