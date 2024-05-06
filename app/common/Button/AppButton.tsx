import { ActivityIndicator, StyleProp, StyleSheet, TouchableOpacity, View, ViewProps, ViewStyle } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { FC } from 'react'
import Colors from '../../utils/colors'
import AppText from '../Text/AppText'
import { moderateScale, verticalScale } from '../../utils/metric';

type onPress = () => void;

interface AppButtonProps extends ViewProps {
    onPress?: onPress;
    buttonText: string;
    showNext?: boolean;
    shadow?: number;
    isLoading?: boolean;
}

const AppButton: FC<AppButtonProps> = ({ onPress, buttonText, showNext = false, shadow = 20, isLoading, ...otherProps }) => {
    return (
        <View
            {...otherProps}
            style={styles.buttonView}
        >
            <TouchableOpacity
                disabled={isLoading}
                onPress={onPress}
                activeOpacity={0.6}
                style={[styles.button, { elevation: shadow }]}>

                <View style={styles.shrinkBox} />

                {
                    isLoading ?
                        <ActivityIndicator
                            color={Colors.white}
                            size={moderateScale(22)}
                        /> :
                        <AppText
                            fontWeight='SemiBold'
                            style={styles.buttonText}>
                            {buttonText}
                        </AppText>
                }

                {showNext ? <Ionicons
                    size={20}
                    name={"arrow-forward-outline"}
                    color={Colors.white} /> : <View style={styles.shrinkBox} />}

            </TouchableOpacity>
        </View>
    )
}

export default AppButton

const styles = StyleSheet.create({
    buttonView: {
        paddingBottom: 24,
        paddingHorizontal: 20,
        width: "100%",
        marginTop: verticalScale(40),
    },

    button: {
        flexDirection: 'row',
        justifyContent: "space-between",

        paddingVertical: verticalScale(11.5),
        paddingHorizontal: 16,
        backgroundColor: Colors.primary,
        borderRadius: 10,
        alignItems: "center",

        shadowColor: Colors.primary,

        //iOS
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },

    shrinkBox: {
        width: 28,
        height: 28,
    },

    buttonText: {
        textAlign: "center",
        color: Colors.white,
        fontSize: 18,
    }
})