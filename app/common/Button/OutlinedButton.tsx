import { ActivityIndicator, StyleSheet, TextStyle, TouchableOpacity, View, ViewProps } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { FC } from 'react'
import AppText from '../Text/AppText'
import { Colors, moderateScale, verticalScale, weight } from '@/app/utils';
import { ms, mvs } from 'react-native-size-matters';

type onPress = () => void;

interface OutlinedButtonProps extends ViewProps {
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
const OutlinedButton: FC<OutlinedButtonProps> = ({
    onPress,
    buttonText,
    showNext = false,
    shadow = 20,
    paddingHorizontal,
    paddingBottom,
    textStyle,
    isLoading,
    isDisabled,
    marginTop,
    ...otherProps
}) => {
    return (
        <View
            style={[styles.buttonView,
            {
                paddingHorizontal: paddingHorizontal ?? 20,
                paddingBottom: paddingBottom ?? 24,
                marginTop: marginTop ?? verticalScale(40),
            }, otherProps.style]}

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
                        <ActivityIndicator color={Colors.white} size={moderateScale(22)} />
                        :
                        <AppText
                            fontWeight={textStyle == null ? weight.Sb : weight.R}
                            style={textStyle ?? styles.buttonText}>
                            {buttonText}
                        </AppText>
                }

                {showNext ?
                    <Ionicons
                        size={20}
                        name={"arrow-forward-outline"}
                        color={Colors.white} /> : <View style={styles.shrinkBox} />
                }

            </TouchableOpacity>
        </View>
    )
}

export default OutlinedButton

const styles = StyleSheet.create({
    buttonView: {
        width: "100%",

        backgroundColor: Colors.blue

    },

    button: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingVertical: mvs(8),
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: "center",
        borderColor: Colors.primary,
        borderWidth: StyleSheet.hairlineWidth,
        //backgroundColor: addOpacity(Colors.white, 0.6),

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
        color: Colors.primary,
        fontSize: ms(13),
    }
})