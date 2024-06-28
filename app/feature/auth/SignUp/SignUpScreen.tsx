import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, SignUpScreenProps, horizontalScale, verticalScale, weight } from '@/app/utils'
import { AppButton, AppScrollView, AppText, AppTextInput } from '@/app/common'
import { ms, mvs } from 'react-native-size-matters'
import { useForm } from './useForm'
import useSignupUser from '@/app/hooks/useSignupUser'

const SignUpScreen: FC<SignUpScreenProps> = (props) => {

  const { navigation: { navigate, goBack } } = props;

  const {
    name, email, password, isNameValid, isEmailValid, confirmPassword,
    setConfirmPassword, isPasswordValid, emailInputRef, isPasswordMatch,
    confirmPasswordInputRef, passwordInputRef, listener,
    listen, checkCredentials, setEmail, setName,
    setPassword, clearForm
  } = useForm();

  const { signUpUser, isLoading } = useSignupUser();

  useEffect(() => {
    if (listener) {
      checkCredentials();
    }
  }, [name, email, password, confirmPassword, listener]);


  const onSubmit = () => {
    listen();

    if (checkCredentials()) {
      signUpUser({
        data: { name: name.trim(), email, password },
        next: () => { clearForm(); goBack() },
      })
    }
  }



  return (
    <SafeAreaView style={styles.mainView}>
      <AppScrollView>
        <View style={[styles.mainView, { paddingHorizontal: 8 }]}>

          {/* Sign Up Text Section */}
          <View style={styles.loginTextView}>
            <AppText fontWeight={weight.M} numberOfLines={2} style={styles.headerText} >
              Sign Up
            </AppText>
            <AppText fontWeight={weight.L} style={[styles.secondaryText]}>
              Fill out your details below
            </AppText>
          </View>

          {/* Form Section */}
          <View style={styles.textInputView}>
            {/* Name Input */}
            <View>
              <AppTextInput
                placeholder="Name"
                text={name}
                setText={setName}
                keyboardType="name-phone-pad"
                returnKeyType='next'
                onSubmitEditing={() => emailInputRef.current?.focus()}
                editable={!isLoading}
              />
              {isNameValid && (
                <AppText fontWeight={weight.L} style={styles.errorText}>
                  {isNameValid}
                </AppText>
              )}
            </View>

            {/* Email Input */}
            <View>
              <AppTextInput
                placeholder="Email"
                text={email}
                setText={setEmail}
                returnKeyType='next'
                keyboardType="email-address"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
                assignRef={emailInputRef}
                editable={!isLoading}
              />
              {!isEmailValid && (
                <AppText fontWeight={weight.L} style={styles.errorText}>
                  Email is invalid
                </AppText>
              )}
            </View>

            {/* Password Input */}
            <View>
              <AppTextInput
                placeholder="Password"
                text={password}
                setText={setPassword}
                isPassword={true}
                returnKeyType='next'
                onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
                assignRef={passwordInputRef}
                editable={!isLoading}
              />
              {isPasswordValid && (
                <AppText fontWeight={weight.L} style={styles.errorText}>
                  {isPasswordValid}
                </AppText>
              )}
            </View>

            {/* Confirm Password Input */}
            <View>
              <AppTextInput
                placeholder="Confirm Password"
                text={confirmPassword}
                setText={setConfirmPassword}
                isPassword={true}
                returnKeyType='done'
                assignRef={confirmPasswordInputRef}
                editable={!isLoading}
              />
              {!isPasswordMatch && (
                <AppText fontWeight={weight.L} style={styles.errorText}>
                  Password does not match
                </AppText>
              )}
            </View>
          </View>

          {/* Continue Button */}
          <AppButton onPress={onSubmit} buttonText="Continue" isLoading={isLoading} style={styles.button} />

          {/* Already Have an Account Section */}
          <View style={styles.signView}>
            <AppText fontWeight={weight.L} style={{ color: Colors.hintTextColor, fontSize: 15 }}>
              Already have an account ?
            </AppText>

            <TouchableOpacity activeOpacity={0.6} onPress={goBack} >
              <AppText fontWeight={weight.M} style={styles.signUpText}>
                Login
              </AppText>
            </TouchableOpacity>

          </View>

          {/* Terms and Privacy Policy Text */}
          <AppText style={styles.bottomText}>
            By tapping Continue, you agree to our

            <AppText fontWeight={weight.M} style={styles.policy}>Terms</AppText>

            <AppText>&</AppText>

            <AppText fontWeight={weight.M} style={styles.policy} >Privacy Policy</AppText>
          </AppText>

        </View>
      </AppScrollView>
    </SafeAreaView>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },

  loginTextView: {
    marginTop: mvs(75),
    marginBottom: verticalScale(50),
  },

  headerText: {
    color: Colors.textColor1,
    fontSize: 40,
    marginBottom: mvs(4),
  },

  textInputView: {
    paddingHorizontal: 10,
    gap: 20,
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
    fontSize: 14,
    padding: 4,
  },

  bottomText: {
    fontSize: 12,
    color: Colors.hintTextColor,
    textAlign: "center",
    marginTop: 30,
    marginBottom: 30,
    paddingHorizontal: 20,
  },

  policy: {
    color: Colors.textColor1,
    fontSize: 12
  },

  secondaryText: {
    color: Colors.hintTextColor,
    fontSize: 15,
    marginLeft: ms(8)
  },

  errorText: {
    color: Colors.error,
    fontSize: 12.5,
    marginLeft: horizontalScale(1),
    marginTop: mvs(6)
  },

  button: {
    paddingHorizontal: 12,
  },
})