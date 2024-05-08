import React, { FC, useEffect } from 'react';
import { StyleSheet, View, Pressable, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Snackbar } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';

import { AppButton, AppScrollView, AppText, AppTextInput, DismissKeyboard } from '@/app/common';
import { Colors, LoginScreenProps, horizontalScale, verticalScale } from '@/app/utils';
import { useLoginForm } from '../../../../hooks/useLoginForm';
import { weight } from '@/app/utils/types';

import { useLoginUserMutation } from '@/app/redux/apiSlice';

const LoginScreen: FC<LoginScreenProps> = ({ navigation: { navigate, goBack } }) => {

    const { email, password, isEmailValid, isPasswordValid, visible,
        message, passwordInputRef, listener, listen, checkEmail, checkPassword,
        toggleSnackbar, setEmail, setPassword, setMessage, remove, clearForm
    } = useLoginForm();

    const [loginUser, { isLoading, data, error }] = useLoginUserMutation();


    // const [addNewPost, { isLoading }] = useAddNewPostMutation()



    useEffect(() => {
        if (listener) {
            checkEmail();
            checkPassword();
        }
    }, [email, password, listener]);


    function onContinue() {
        listen();

        checkEmail();
        checkPassword();

        next();
    }


    const next = async () => {
        if (listener && isEmailValid && isPasswordValid == null) {

            loginUser({ email, password }).unwrap()
                .then((res) => { 

                })


                ;

            // requests.loginUser(email, password)
            //     .then(data => {
            //         console.log(data);

            //         navigate('HomeDrawer');
            //     })
            //     .catch((error: Error) => {
            //         setMessage(error.message);

            //         toggleSnackbar();
            //     }).finally(() => {
            //         load(false);
            //     });
        }
    };

    return (
        <SafeAreaView style={styles.mainView}>
            <AppScrollView>
                <DismissKeyboard>
                    <View style={[styles.mainView, { paddingHorizontal: 8 }]}>

                        {/* BackButton Component */}
                        <View style={styles.backButton}>
                            <Pressable onPress={goBack}>
                                <Ionicons
                                    size={26}
                                    name={"arrow-back-outline"}
                                    color={Colors.textColor1}
                                    style={{ padding: 6 }}
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
                                style={[styles.secondaryText, { marginLeft: 10 }]}
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
                                    iconName='mail-outline'
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
                                    iconSize={21}
                                    placeholder="Password"
                                    text={password}
                                    setText={setPassword}
                                    isPassword={true}
                                    iconName='lock-closed-outline'
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
                            onPress={onContinue}
                            buttonText="Continue"
                            isLoading={isLoading}
                        />

                        {/* Sign Up View */}
                        <View style={styles.signView}>
                            <AppText fontWeight={weight.L} style={styles.secondaryText}>
                                Don't have an account ?
                            </AppText>
                            <TouchableOpacity activeOpacity={0.6}
                                onPress={() => navigate('SignUp')}
                            >
                                <AppText fontWeight={weight.M} style={styles.signUpText}>
                                    Sign Up
                                </AppText>
                            </TouchableOpacity>
                        </View>

                        {/* Continue View / Divider */}
                        <View style={styles.continueView}>
                            <View style={styles.separator} />

                            <View style={{ marginHorizontal: 12 }}>
                                <AppText fontWeight={weight.M} style={[styles.secondaryText, { fontSize: 14 }]}>
                                    Or continue with
                                </AppText>
                            </View>

                            <View style={styles.separator} />
                        </View>

                        {/* Google Button */}
                        <TouchableOpacity activeOpacity={0.6} style={styles.googleButton}>
                            <Ionicons
                                size={25}
                                name="logo-google"
                                color={Colors.textColor1}
                            />
                        </TouchableOpacity>

                    </View>
                </DismissKeyboard>
            </AppScrollView>

            <Snackbar
                children={
                    <AppText style={styles.snackText}>
                        {message}
                    </AppText>
                }
                duration={3000}
                visible={visible}
                onDismiss={remove}>

            </Snackbar>
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
        fontSize: 13,
        marginLeft: horizontalScale(10),
        marginTop: 6
    },

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