import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { FC, useRef, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { LoginScreenProps } from '@/app/utils/types'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomScrollView from '@/app/components/AppScrollView'
import Colors from '@/app/utils/colors'
import AppText from '@/app/components/AppText'
import AppTextInput from '@/app/components/AppTextInput';
import AppButton from '@/app/components/AppButton';
import { horizontalScale, verticalScale } from '@/app/utils/metric';
import { TextInput } from 'react-native-gesture-handler';

const LoginScreen: FC<LoginScreenProps> = ({ navigation: { navigate, goBack } }) => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const passwordInputRef = useRef<TextInput>(null);

    return (
        <SafeAreaView style={styles.mainView}>
            <CustomScrollView>
                <View style={[styles.mainView, { paddingHorizontal: 8 }]}>

                    <View style={styles.backButton}>
                        <Pressable onPress={goBack} >
                            <Ionicons
                                size={26}
                                name={"arrow-back-outline"}
                                color={Colors.textColor1}
                                style={{ padding: 6 }}
                            />
                        </Pressable>
                    </View>

                    <View style={styles.loginTextView}>
                        <AppText
                            fontWeight='Medium'
                            numberOfLines={2}
                            style={styles.headerText}
                        >Log In</AppText>

                        <AppText
                            fontWeight='Light'
                            style={[styles.secondaryText, { marginLeft: 10 }]}
                        >Enter your email and password below</AppText>

                    </View>

                    <View style={styles.textInputView}>

                        <AppTextInput
                            placeholder="Email"
                            text={email}
                            keyboardType="email-address"
                            setText={setEmail}
                            iconName='mail-outline'
                            returnKeyType='next'
                            onSubmitEditing={() => passwordInputRef.current?.focus()}
                        />

                        <AppTextInput
                            iconSize={21}
                            placeholder="Password"
                            text={password}
                            setText={setPassword}
                            isPassword={true}
                            iconName='lock-closed-outline'
                            forwardedRef={passwordInputRef}
                        />
                    </View>

                    <View style={{ alignSelf: 'flex-end', marginRight: 4 }}>
                        <Pressable>
                            <AppText fontWeight='Medium' style={styles.forgotPassword}>
                                Forgot Password ?
                            </AppText>
                        </Pressable>
                    </View>

                    <AppButton
                        onPress={() => navigate('HomeDrawer')}
                        buttonText="Continue"
                    />

                    <View style={styles.signView}>
                        <AppText fontWeight='Light' style={styles.secondaryText}>
                            Don't have an account ?
                        </AppText>

                        <TouchableOpacity activeOpacity={0.6}
                            onPress={() => navigate('SignUp')}
                        >
                            <AppText fontWeight='Medium' style={styles.signUpText}>
                                Sign Up
                            </AppText>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.continueView}>
                        <View style={styles.separator} />

                        <View style={{ marginHorizontal: 12 }}>
                            <AppText style={{ color: Colors.hintTextColor }}>
                                Or continue with
                            </AppText>
                        </View>

                        <View style={styles.separator} />
                    </View>

                    <TouchableOpacity activeOpacity={0.6} style={styles.googleButton}>
                        <Ionicons
                            size={25}
                            name="logo-google"
                            color={Colors.textColor1}
                        />
                    </TouchableOpacity>

                </View>
            </CustomScrollView>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({

    googleButton: {
        alignSelf: "center",
        marginVertical: 12,
        marginBottom: 32,
        borderColor: Colors.divider,
        borderWidth: 1,
        paddingHorizontal: 28,
        paddingVertical: 13,
        borderRadius: 14,
    },

    mainView: {
        flex: 1,
    },

    backButton: {
        marginTop: verticalScale(10),
        marginLeft: horizontalScale(2),
        alignSelf: "flex-start",
    },

    headerText: {
        color: Colors.textColor1,
        fontSize: 40,
        marginBottom: 6,
    },

    loginTextView: {
        marginTop: verticalScale(52),
        marginBottom: verticalScale(50),
    },

    textInputView: {
        paddingHorizontal: 10,
        gap: 18,
        marginBottom: 6,
    },

    forgotPassword: {
        color: Colors.primary,
        textAlign: "right",
        marginRight: 4,

        paddingHorizontal: 12,
        paddingVertical: 8
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
        fontSize: 15.5,
        padding: 4,
    },

    separator: {
        borderBottomColor: Colors.divider,
        borderBottomWidth: StyleSheet.hairlineWidth,
        alignSelf: "center",
        flex: 1
    },

    continueView: {
        flexDirection: "row",
        marginHorizontal: 32,
        paddingBottom: verticalScale(12),
        paddingTop: verticalScale(17)
    },


    secondaryText: {
        color: Colors.hintTextColor,
        fontSize: 14.5
    }
})