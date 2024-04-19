import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { LoginScreenProps } from '@/app/utils/types'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomScrollView from '@/app/components/AppScrollView'
import Colors from '@/app/utils/colors'
import AppText from '@/app/components/AppText'
import AppTextInput from '@/app/components/AppTextInput';
import AppButton from '@/app/components/AppButton';

const LoginScreen: FC<LoginScreenProps> = ({ navigation: { navigate, goBack } }) => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
        <SafeAreaView style={styles.mainView}>
            <CustomScrollView>
                <View style={[styles.mainView, { paddingHorizontal: 10 }]}>

                    <View style={styles.backButton}>
                        <Pressable
                            onPress={goBack}
                        >
                            <Ionicons
                                size={28}
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
                        >Login to your account</AppText>

                        <AppText fontWeight='Light' style={{ color: Colors.hintTextColor, marginLeft: 10 }}>Enter your email and password below</AppText>
                    </View>

                    <View style={styles.textInputView}>

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

                    </View>

                    <View style={{ alignSelf: 'flex-end', marginRight: 4 }}>
                        <Pressable>
                            <AppText fontWeight='Medium' style={styles.forgotPassword}>
                                Forgot Password ?
                            </AppText>
                        </Pressable>
                    </View>

                    <AppButton
                        onPress={() => navigate('Home')}
                        buttonText="Continue"
                        showNext={false}
                    />

                    <View style={styles.signView}>
                        <AppText fontWeight='Light' style={{ color: Colors.hintTextColor, fontSize: 15.5 }}>
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
        marginTop: 25,
        marginLeft: 8,
        alignSelf: "flex-start",
    },

    headerText: {
        color: Colors.textColor1,
        fontSize: 40,
        marginBottom: 6,
    },

    loginTextView: {
        marginTop: 60,
        marginBottom: 60,
    },

    textInputView: {
        paddingHorizontal: 10,
        gap: 20,
        marginBottom: 6,
    },

    emailIcon: {
        alignItems: "center",
        padding: 10,
    },

    forgotPassword: {
        color: Colors.primary,
        textAlign: "right",
        marginRight: 4,

        paddingHorizontal: 12,
        paddingVertical: 8
    },

    buttonText: {
        alignSelf: "center",
        marginVertical: 15,
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

    separator: {
        borderBottomColor: Colors.divider,
        borderBottomWidth: StyleSheet.hairlineWidth,
        alignSelf: "center",
        flex: 1

    },

    continueView: {
        flexDirection: "row",
        marginHorizontal: 32,
        paddingVertical: 18
    }
})