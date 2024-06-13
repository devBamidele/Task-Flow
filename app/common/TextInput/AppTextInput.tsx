import React, { FC, ForwardedRef, RefObject, useRef, useState } from 'react';
import { TextInput, TextInputProps, StyleSheet, View, Pressable } from 'react-native';
import Colors, { addOpacity } from '../../utils/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CustomIconNames, weight } from '../../utils/types';
import { horizontalScale, verticalScale } from '../../utils/metric';
import { ms } from 'react-native-size-matters';

interface AppTextInputProps extends TextInputProps {
    text: string;
    isTask?: boolean,
    isList?: boolean,
    iconSize?: number
    isPassword?: boolean,
    textPadding?: number,
    preffixPadding?: number
    squareColor?: string,
    iconName?: CustomIconNames;
    setText: (value: string) => void;
    assignRef?: RefObject<TextInput>;
}

const AppTextInput: FC<AppTextInputProps> = ({
    iconSize,
    text,
    isTask,
    isList,
    setText,
    iconName,
    isPassword = false,
    textPadding = 12,
    preffixPadding = 16,
    assignRef,
    squareColor,
    ...otherProps
}) => {

    const [focused, setFocused] = useState(false);
    const [passwordHidden, setPasswordHidden] = useState(isPassword);

    const customRef = useRef<TextInput>(null);

    return (
        <Pressable onPress={() => assignRef?.current?.focus() ?? customRef.current?.focus()} >
            <View style={[
                styles.container,
                focused ? (isTask ? [styles.taskTextField, {}] : styles.focusedTextField) : null,
            ]}>
                {
                    iconName && <Ionicons
                        size={iconSize ?? 22}
                        name={iconName}
                        style={[
                            styles.prefixIcon,
                            focused && { color: Colors.primary },
                            text.length != 0 && !focused && { color: Colors.textColor1 },
                            { paddingLeft: preffixPadding }
                        ]}
                    />
                }

                {
                    isList &&
                    <View style={[{ backgroundColor: squareColor }, styles.square]} />
                }


                <TextInput
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    ref={assignRef ?? customRef}
                    onChangeText={setText}
                    value={text}
                    placeholderTextColor={Colors.hintTextColor}
                    selectionColor={Colors.selectionColor}
                    cursorColor={Colors.textColor1}
                    secureTextEntry={passwordHidden}
                    style={[styles.textInputStyle, isList && styles.listInputStyle, { paddingLeft: textPadding }]}
                    {...otherProps}
                />

                {
                    isPassword &&
                    <View style={{ alignItems: "center" }}>
                        <Pressable onPress={() => setPasswordHidden(!passwordHidden)} >
                            <Ionicons
                                size={23}
                                name={passwordHidden ? "eye-outline" : "eye-off-outline"}
                                color={Colors.textColor1}
                                style={[
                                    styles.prefixIcon,
                                    focused && { color: Colors.primary },
                                    text.length != 0 && !focused && { color: Colors.textColor1 },
                                    {
                                        marginRight: horizontalScale(6),
                                        padding: 12,
                                    }
                                ]}
                            />
                        </Pressable>
                    </View>
                }
            </View>
        </Pressable>
    );
};

export default AppTextInput;

const styles = StyleSheet.create({

    focusedTextField: {
        // borderWidth: 1,
        backgroundColor: Colors.listTextBackground,
    },

    taskTextField: {
        borderColor: Colors.textColor1,
        borderWidth: 1,
    },

    textInputStyle: {
        fontFamily: weight.L,
        color: Colors.textColor4,
        paddingTop: ms(7),
        paddingBottom: ms(9),
        fontSize: ms(12),
        flex: 1,
        paddingRight: ms(8),
    },

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 10,
        overflow: "hidden",
        borderColor: Colors.divider,
        borderWidth: StyleSheet.hairlineWidth, // 1
    },

    listTextField: {

    },

    listInputStyle: {
        fontFamily: weight.R,
    },

    prefixIcon: {
        alignItems: "center",
        color: addOpacity(Colors.hintTextColor, 0.9),
    },

    square: {
        width: ms(14),
        height: ms(14),
        borderRadius: 4,
        marginRight: ms(10),
        marginLeft: ms(13),
    },

});
