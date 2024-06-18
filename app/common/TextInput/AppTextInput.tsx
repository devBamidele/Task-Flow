import React, { FC, RefObject, useRef, useState } from 'react';
import { TextInput, TextInputProps, StyleSheet, View, Pressable } from 'react-native';
import Colors, { addOpacity } from '../../utils/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CustomIconNames, weight } from '../../utils/types';
import { horizontalScale } from '../../utils/metric';
import { ms } from 'react-native-size-matters';
import { getFontFamily } from '@/app/utils';

interface AppTextInputProps extends TextInputProps {
    text: string;
    isTask?: boolean,
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
    setText,
    iconName,
    isPassword = false,
    textPadding = 16,
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
                focused && styles.focusedTextField,
            ]}>
                {
                    iconName && <Ionicons
                        size={iconSize ?? 22}
                        name={iconName}
                        style={[
                            styles.prefixIcon,
                            focused && styles.focusedIcon,
                            text.length !== 0 && !focused && styles.unfocusedIcon,
                            { paddingLeft: preffixPadding }
                        ]}
                    />
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
                    style={[
                        styles.textInputStyle,
                        isTask && styles.taskTextInput,
                        { paddingLeft: textPadding }
                    ]}
                    {...otherProps}
                />

                {
                    isPassword &&
                    <View style={styles.passwordContainer}>
                        <Pressable onPress={() => setPasswordHidden(!passwordHidden)} >
                            <Ionicons
                                size={22.5}
                                name={passwordHidden ? "eye-outline" : "eye-off-outline"}
                                color={Colors.textColor1}
                                style={[
                                    styles.prefixIcon,
                                    focused && styles.focusedPasswordIcon,
                                    text.length !== 0 && !focused && styles.unfocusedPasswordIcon,
                                    styles.passwordIcon
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
        backgroundColor: Colors.listTextBackground,
    },
    textInputStyle: {
        fontFamily: getFontFamily(weight.L),
        color: Colors.textColor4,
        paddingTop: 12,
        paddingBottom: 12,
        fontSize: 16,
        flex: 1,
        paddingRight: ms(8),
    },
    taskTextInput: {
        fontSize: 13,
        paddingTop: 10,
        paddingBottom: 10,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 8,
        overflow: "hidden",
        borderColor: Colors.divider,
        borderWidth: StyleSheet.hairlineWidth, // 1
    },
    prefixIcon: {
        alignItems: "center",
        color: addOpacity(Colors.hintTextColor, 0.7),
    },
    focusedIcon: {
        color: Colors.primary,
    },
    unfocusedIcon: {
        color: Colors.textColor1,
    },
    passwordContainer: {
        alignItems: "center",
    },
    focusedPasswordIcon: {
        color: Colors.textColor4,
    },
    unfocusedPasswordIcon: {
        color: Colors.textColor4,
    },
    passwordIcon: {
        marginRight: horizontalScale(4),
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    square: {
        width: ms(14),
        height: ms(14),
        borderRadius: 4,
        marginRight: ms(10),
        marginLeft: ms(13),
    },
});
