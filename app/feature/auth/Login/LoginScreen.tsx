import React, { FC, useEffect } from 'react';
import { StyleSheet, View, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

import { AppButton, AppScrollView, AppText, AppTextInput, DismissKeyboard } from '@/app/common';
import { Colors, LoginScreenProps, horizontalScale, verticalScale } from '@/app/utils';
import { useForm } from './useForm';
import { weight } from '@/app/utils/types';
import { useLoginUser } from '@/app/hooks';
import { moderateScale, ms, mvs, s } from 'react-native-size-matters';
import useGoogleLogin from './useGoogleLogin';


const LoginScreen: FC<LoginScreenProps> = (props) => {

    const { navigation: { navigate, goBack } } = props;

    const { email, password, isEmailValid, isPasswordValid,
        passwordInputRef, listener, listen, checkCredentials,
        setEmail, setPassword, clearForm
    } = useForm();

    const { loginUser, isLoading } = useLoginUser();
    const { handleGoogleLogin, isGloading } = useGoogleLogin();

    useEffect(() => {
        if (listener) {
            checkCredentials();
        }
    }, [email, password, listener]);

    const onSubmit = () => {
        listen();

        if (checkCredentials()) {
            loginUser({
                data: { email, password },
                next: () => clearForm(),
            })
        }
    }

    return (
        <SafeAreaView style={styles.mainView}>
            <AppScrollView>
                <View style={[styles.mainView, { paddingHorizontal: 8 }]}>

                    {/* BackButton Component */}
                    <View style={styles.backButton}>
                        <Pressable onPress={goBack}>
                            <Ionicons
                                size={26}
                                name={"arrow-back-outline"}
                                color={Colors.textColor1}
                                style={{ padding: s(6) }}
                            />
                        </Pressable>
                    </View>

                    {/* Login TextView */}
                    <View style={styles.loginTextView}>
                        <AppText
                            fontWeight={weight.M}
                            numberOfLines={2}
                            style={styles.headerText}
                        >Log In</AppText>

                        <AppText
                            fontWeight={weight.L}
                            style={styles.secondaryText}
                        >Enter your email and password below</AppText>
                    </View>

                    {/* Email / Password form */}
                    <View style={styles.textInputView}>
                        <View>
                            <AppTextInput
                                placeholder="Email"
                                text={email}
                                keyboardType="email-address"
                                setText={setEmail}
                                returnKeyType='next'
                                onSubmitEditing={() => passwordInputRef.current?.focus()}
                                editable={!isLoading}
                            />
                            {!isEmailValid &&
                                <AppText fontWeight={weight.L} style={styles.errorText}>
                                    Email is invalid
                                </AppText>}
                        </View>

                        <View>
                            <AppTextInput
                                placeholder="Password"
                                text={password}
                                setText={setPassword}
                                isPassword={true}
                                assignRef={passwordInputRef}
                                editable={!isLoading}
                            />
                            {isPasswordValid &&
                                <AppText fontWeight={weight.L} style={styles.errorText}>
                                    {isPasswordValid}
                                </AppText>}
                        </View>

                    </View>

                    {/* Forgot Password Text */}
                    <View style={{ alignSelf: 'flex-end', marginRight: 4 }}>
                        <Pressable>
                            <AppText fontWeight={weight.M} style={styles.forgotPassword}>
                                Forgot Password ?
                            </AppText>
                        </Pressable>
                    </View>


                    <AppButton
                        onPress={onSubmit}
                        buttonText="Continue"
                        isLoading={isLoading}
                        isDisabled={isGloading}
                    />

                    {/* Sign Up View */}
                    <View style={styles.signView}>
                        <AppText fontWeight={weight.L} style={styles.secondaryText}>
                            Don't have an account ?
                        </AppText>
                        <TouchableOpacity activeOpacity={0.6}
                            onPress={() => { navigate('SignUp'); clearForm() }}
                        >
                            <AppText fontWeight={weight.M} style={styles.signUpText}>
                                Sign Up
                            </AppText>
                        </TouchableOpacity>
                    </View>

                    {/* Continue View / Divider */}
                    <View style={styles.continueView}>
                        <View style={styles.separator} />

                        <View style={{ marginHorizontal: 6 }}>
                            <AppText fontWeight={weight.M} style={[styles.secondaryText, { fontSize: 14 }]}>
                                Or continue with
                            </AppText>
                        </View>

                        <View style={styles.separator} />
                    </View>

                    {/* Google Button */}
                    <TouchableOpacity onPress={handleGoogleLogin} activeOpacity={0.6} style={styles.googleButton}>

                        {
                            isGloading ?
                                <ActivityIndicator
                                    color={Colors.textColor1}
                                    size={moderateScale(20)}
                                />
                                :
                                <Ionicons
                                    size={25}
                                    name="logo-google"
                                    color={Colors.textColor1}
                                />
                        }

                    </TouchableOpacity>

                </View>
            </AppScrollView>

        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({

    snackText: {
        color: Colors.white,
        textAlign: "center",
    },

    errorText: {
        color: Colors.error,
        fontSize: 12.5,
        marginLeft: horizontalScale(1),
        marginTop: mvs(6)
    },

    googleButton: {
        alignSelf: "center",
        marginVertical: 12,
        marginBottom: 32,
        borderColor: Colors.divider,
        borderWidth: StyleSheet.hairlineWidth,
        paddingHorizontal: 28,
        paddingVertical: 13,
        borderRadius: 10,
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
        marginBottom: mvs(4),
    },

    loginTextView: {
        marginTop: mvs(50),
        marginBottom: mvs(48),
    },

    textInputView: {
        paddingHorizontal: 10,
        gap: 20,
        marginBottom: 6,
    },

    signView: {
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        marginTop: -8,
        marginBottom: 20,
    },

    separator: {
        borderBottomColor: Colors.divider,
        borderBottomWidth: StyleSheet.hairlineWidth,
        alignSelf: "center",
        flex: 1
    },

    continueView: {
        flexDirection: "row",
        marginHorizontal: 12,
        paddingBottom: verticalScale(12),
        paddingTop: verticalScale(17)
    },


    secondaryText: {
        color: Colors.hintTextColor,
        fontSize: 15,
        marginLeft: ms(8)
    },

    signUpText: {
        color: Colors.primary,
        fontSize: 14,
        padding: 4,
    },

    forgotPassword: {
        color: Colors.primary,
        textAlign: "right",

        fontSize: 13,
        paddingHorizontal: 12,
        paddingVertical: 8
    },
})