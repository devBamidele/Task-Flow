import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomScrollView from '@/app/components/AppScrollView'
import { SignUpScreenProps } from '@/app/utils/types'
import Colors from '@/app/utils/colors'
import AppText from '@/app/components/AppText';
import AppTextInput from '@/app/components/AppTextInput';
import AppButton from '@/app/components/AppButton';
import { verticalScale } from '@/app/utils/metric'

const SignUpScreen: FC<SignUpScreenProps> = ({ navigation: { navigate, goBack } }) => {

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  return (
    <SafeAreaView style={styles.mainView}>
      <CustomScrollView>
        <View style={[styles.mainView, { paddingHorizontal: 8 }]}>

          <View style={styles.loginTextView}>
            <AppText
              fontWeight='Medium'
              numberOfLines={2}
              style={styles.headerText}
            >
              Sign Up
            </AppText>

            <AppText
              fontWeight='Light'
              style={[styles.secondaryText, { marginLeft: 10 }]}>
              Fill out your details below
            </AppText>
          </View>


          <View style={styles.textInputView}>

            <AppTextInput
              placeholder="Name"
              text={name}
              setText={setName}
              keyboardType="name-phone-pad"
              iconName='person-outline'
              returnKeyType='next'
              onSubmitEditing={() => emailInputRef.current?.focus()}
            />

            <AppTextInput
              placeholder="Email"
              text={email}
              setText={setEmail}
              iconName='mail-outline'
              returnKeyType='next'
              keyboardType="email-address"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
              forwardedRef={emailInputRef}
            />

            <AppTextInput
              iconSize={21}
              placeholder="Password"
              text={password}
              setText={setPassword}
              isPassword={true}            
              iconName='lock-closed-outline'
              returnKeyType='next'
              onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
              forwardedRef={passwordInputRef}
            />

            <AppTextInput
              iconSize={21}
              placeholder="Confirm Password"
              text={confirmPassword}
              setText={setConfirmPassword}
              secureTextEntry
              iconName='lock-closed-outline'
              isPassword={true}
              forwardedRef={confirmPasswordInputRef}
            />

          </View>

          <AppButton
            onPress={() => navigate('HomeDrawer')}
            buttonText="Continue"
          />

          <View style={styles.signView}>
            <AppText fontWeight='Light' style={{ color: Colors.hintTextColor, fontSize: 15.5 }}>
              Already have an account ?
            </AppText>

            <TouchableOpacity activeOpacity={0.6}
              onPress={goBack}
            >
              <AppText fontWeight='Medium' style={styles.signUpText}>
                Login
              </AppText>
            </TouchableOpacity>

          </View>

          <AppText style={styles.bottomText}>
            By tapping Continue, you agree to our

            <AppText fontWeight='Medium' style={styles.policy}>Terms</AppText>

            <AppText>&</AppText>

            <AppText fontWeight='Medium' style={styles.policy} >Privacy </AppText>
          </AppText>

        </View>
      </CustomScrollView>
    </SafeAreaView>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },

  loginTextView: {
    marginTop: 75,
    marginBottom: verticalScale(50),
  },

  headerText: {
    color: Colors.textColor1,
    fontSize: 40,
    marginBottom: 6,
  },

  textInputView: {
    paddingHorizontal: 10,
    gap: 18,
    marginBottom: 16,
  },

  signView: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginTop: -8,
    marginBottom: 20,

  },

  signUpText: {
    color: Colors.primary,
    fontSize: 16.5,
    padding: 4,
  },

  bottomText: {
    fontSize: 13,
    color: Colors.hintTextColor,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 30,
    paddingHorizontal: 20,
  },

  policy: {
    color: Colors.textColor1,
    fontSize: 14
  },

  secondaryText: {
    color: Colors.hintTextColor,
    fontSize: 14.5
  }
})