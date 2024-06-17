import { ActivityIndicator, StyleProp, StyleSheet, TextStyle, TouchableOpacity, View, ViewProps, ViewStyle } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { FC } from 'react'
import Colors from '../../utils/colors'
import AppText from '../Text/AppText'
import { moderateScale, verticalScale } from '../../utils/metric';
import { weight } from '@/app/utils';
import { ms, mvs } from 'react-native-size-matters';

type onPress = () => void;

interface AppButtonProps extends ViewProps {
    onPress?: onPress;
    buttonText: string;
    showNext?: boolean;
    shadow?: number;
    isLoading?: boolean;
    isDisabled?: boolean;
    paddingHorizontal?: number;
    paddingBottom?: number;
    textStyle?: TextStyle;
    marginTop?: number,
}

const AppButton: FC<AppButtonProps> = ({ onPress, buttonText, showNext = false, shadow = 20, paddingHorizontal, paddingBottom, textStyle, isLoading, isDisabled, marginTop, ...otherProps }) => {
    return (
        <View
            {...otherProps}
            style={[styles.buttonView,
            {
                paddingHorizontal: paddingHorizontal ?? 20,
                paddingBottom: paddingBottom ?? 24,
                marginTop: marginTop ?? verticalScale(40),
            }]}
        >
            <TouchableOpacity
                disabled={isLoading || isDisabled}
                onPress={onPress}
                activeOpacity={0.6}
                style={[
                    styles.button,
                    (isLoading || isDisabled) && styles.loadingButton,
                    { elevation: shadow }
                ]}>

                <View style={styles.shrinkBox} />

                {
                    isLoading ?
                        <ActivityIndicator
                            color={Colors.white}
                            size={moderateScale(22)}
                        /> :
                        <AppText
                            fontWeight={textStyle == null ? weight.Sb : weight.R}
                            style={textStyle ?? styles.buttonText}>
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
        width: "100%",
    },

    button: {
        flexDirection: 'row',
        justifyContent: "space-between",

        paddingVertical: mvs(8),
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

    loadingButton: {
        opacity: 0.7,
    },

    shrinkBox: {
        width: 28,
        height: 28,
    },

    buttonText: {
        textAlign: "center",
        color: Colors.white,
        fontSize: ms(13),
    }
})