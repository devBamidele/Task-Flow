import React, { FC, ForwardedRef, RefObject, useState } from 'react';
import { TextInput, TextInputProps, StyleSheet, View, Pressable } from 'react-native';
import Colors, { addOpacity } from '../utils/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CustomIconNames } from '../utils/types';
import { horizontalScale, verticalScale } from '../utils/metric';

interface AppTextInputProps extends TextInputProps {
    text: string;
    isTask?: boolean,
    iconSize?: number
    isPassword?: boolean,
    textPadding?: number,
    preffixPadding?: number
    iconName?: CustomIconNames;
    setText: React.Dispatch<React.SetStateAction<string>>;
    forwardedRef?: ForwardedRef<TextInput> | RefObject<TextInput>;
}

const AppTextInput: FC<AppTextInputProps> = ({
    iconSize,
    text,
    isTask,
    setText,
    iconName,
    isPassword = false,
    textPadding = 15,
    preffixPadding = 18,
    forwardedRef,
    ...otherProps
}) => {

    const [focused, setFocused] = useState(false);
    const [passwordHidden, setPasswordHidden] = useState(isPassword);

    return (
        <View style={[
            styles.container,
            focused ? (isTask ? styles.taskTextField : styles.focusedTextField) : null,
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

            <TextInput
                {...otherProps}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}

                ref={forwardedRef}
                onChangeText={setText}
                value={text}
                placeholderTextColor={Colors.hintTextColor}
                selectionColor={Colors.selectionColor}
                cursorColor={Colors.textColor1}
                secureTextEntry={passwordHidden}
                style={[styles.textInputStyle, { paddingLeft: textPadding }]}

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
    );
};

export default AppTextInput;

const styles = StyleSheet.create({

    focusedTextField: {
        borderWidth: 1,
        borderColor: Colors.primary,
        backgroundColor: Colors.activeInput,
    },

    taskTextField: {
        borderColor: Colors.textColor1,
        borderWidth: 1,
    },

    textInputStyle: {
        fontFamily: "Light",
        paddingVertical: verticalScale(13),
        fontSize: 16.5,
        flex: 1,
        paddingRight: 8,
    },

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 10,
        overflow: "hidden",
        borderColor: Colors.divider,
        borderWidth: 1,
    },

    prefixIcon: {
        alignItems: "center",
        color: addOpacity(Colors.hintTextColor, 0.9),
    },

});
