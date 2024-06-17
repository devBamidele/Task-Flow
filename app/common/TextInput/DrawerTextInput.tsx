import React, { FC, useRef, useState } from 'react';
import { TextInput, TextInputProps, StyleSheet, View, Pressable } from 'react-native';
import Colors, { addOpacity } from '../../utils/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CustomIconNames, weight } from '../../utils/types';
import { horizontalScale } from '../../utils/metric';
import { ms, s } from 'react-native-size-matters';
import { getFontFamily } from '@/app/utils';

interface DrawerTextInputProps extends TextInputProps {
    text: string;
    iconSize?: number
    preffixPadding?: number
    squareColor?: string,
    iconName: CustomIconNames;
    setText: (value: string) => void;
}

const DrawerTextInput: FC<DrawerTextInputProps> = ({
    iconSize,
    text,
    setText,
    iconName,
    preffixPadding = 16,
    squareColor,
    ...otherProps
}) => {

    const [focused, setFocused] = useState(false);
    const customRef = useRef<TextInput>(null);

    return (
        <Pressable onPress={() => customRef.current?.focus()} >
            <View style={[styles.container, focused && styles.focusedTextField]}>

                <Ionicons
                    size={25}
                    name={iconName}
                    style={styles.icon}
                />

                <TextInput
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    ref={customRef}
                    onChangeText={setText}
                    value={text}
                    placeholderTextColor={Colors.textColor4}
                    selectionColor={Colors.selectionColor}
                    cursorColor={Colors.textColor4}
                    style={[styles.textInputStyle]}
                    {...otherProps}
                />

                {
                    text.length > 0 &&
                    <View>
                        <Pressable onPress={() => { }} >
                            <Ionicons
                                size={22.5}
                                name={"checkmark"}
                                color={Colors.textColor1}
                                style={[
                                    styles.prefixIcon,
                                    focused && { color: Colors.textColor4 },
                                    text.length != 0 && !focused && { color: Colors.textColor4 },
                                    {
                                        marginRight: horizontalScale(4),
                                        paddingHorizontal: 8,
                                        paddingVertical: 4,
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

export default DrawerTextInput;

const styles = StyleSheet.create({

    focusedTextField: {
        backgroundColor: Colors.listTextBackground,
    },

    icon: {
        padding: s(5),
        color: Colors.textColor3,
    },

    textInputStyle: {
        fontFamily: getFontFamily(weight.L),
        color: Colors.textColor4,
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: ms(12),
        flex: 1,
        paddingRight: ms(8),
        //paddingLeft: 4,
    },

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 8,
        overflow: "hidden",
    },

    listInputStyle: {
        fontFamily: weight.R,
    },

    prefixIcon: {
        alignItems: "center",
        color: addOpacity(Colors.hintTextColor, 0.7),
    },

    square: {
        width: ms(14),
        height: ms(14),
        borderRadius: 4,
        marginRight: ms(10),
        marginLeft: ms(13),
    },

});
