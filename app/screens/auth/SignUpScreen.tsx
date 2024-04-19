import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomScrollView from '@/app/components/AppScrollView'
import { SignUpScreenProps } from '@/app/utils/types'
import Colors from '@/app/utils/colors'
import AppText from '@/app/components/AppText';
import AppTextInput from '@/app/components/AppTextInput';
import AppButton from '@/app/components/AppButton';

const SignUpScreen: FC<SignUpScreenProps> = ({ navigation: { navigate, goBack } }) => {

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  return (
    <SafeAreaView style={styles.mainView}>
      <CustomScrollView>
        <View style={[styles.mainView, { paddingHorizontal: 10 }]}>

          <View style={styles.loginTextView}>
            <AppText
              fontWeight='Medium'
              numberOfLines={2}
              style={styles.headerText}
            >
              Create your account
            </AppText>

            <AppText fontWeight='Light' style={{ color: Colors.hintTextColor, marginLeft: 10, fontSize: 16 }}>
              Enter your email and password below
            </AppText>
          </View>


          <View style={styles.textInputView}>

            <AppTextInput
              placeholder="Name"
              text={name}
              setText={setName}
              iconName='person-outline'

            />

            <AppTextInput
              placeholder="Email"
              text={email}
              setText={setEmail}
              iconName='mail-outline'
            />

            <AppTextInput
              iconSize={21}
              placeholder="Password"
              text={password}
              setText={setPassword}
              secureTextEntry
              iconName='lock-closed-outline'
            />

            <AppTextInput
              iconSize={21}
              placeholder="Confirm Password"
              text={confirmPassword}
              setText={setConfirmPassword}
              secureTextEntry
              iconName='lock-closed-outline'
            />

          </View>

          <AppButton
            onPress={() => navigate('Home')}
            buttonText="Continue"
            showNext={false}
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

          <View style={styles.terms}>

            <AppText style={styles.policy}>
              By tapping Continue, you agree to our
            </AppText>

            <AppText>Terms</AppText>

            <AppText style={styles.policy}>&</AppText>

            <AppText>Privacy policy</AppText>

          </View>

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
    marginBottom: 60,
  },


  headerText: {
    color: Colors.textColor1,
    fontSize: 40,
    marginBottom: 6,
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
    fontSize: 16.5,
    padding: 4,

  },

  terms: {
    marginTop: 20,
    marginBottom: 30,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: -2,

  },

  policy: {
    fontSize: 13,
    color: Colors.hintTextColor
  }

})