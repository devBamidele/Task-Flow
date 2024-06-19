import React, { FC, useRef, useState } from 'react';
import { TextInput, TextInputProps, StyleSheet, View, Pressable } from 'react-native';
import Colors, { addOpacity } from '../../utils/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CustomIconNames, weight } from '../../utils/types';
import { horizontalScale } from '../../utils/metric';
import { ms, s } from 'react-native-size-matters';
import { getFontFamily } from '@/app/utils';

interface SubtaskTextInputProps extends TextInputProps {
    text: string;
    preffixPadding?: number
    squareColor?: string,
    setText: (value: string) => void;
}

const SubtaskTextInput: FC<SubtaskTextInputProps> = ({
    text,
    setText,
    preffixPadding = 16,
    squareColor,
    ...otherProps
}) => {

    const [focused, setFocused] = useState(false);
    const customRef = useRef<TextInput>(null);

    return (
        <Pressable onPress={() => customRef.current?.focus()} >
            <View style={[styles.container, focused && styles.focusedTextField]}>

                <TextInput
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    ref={customRef}
                    onChangeText={setText}
                    value={text}
                    placeholderTextColor={Colors.hintTextColor}
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
                                style={styles.prefixIcon}
                            />
                        </Pressable>
                    </View>
                }
            </View>
        </Pressable>
    );
};

export default SubtaskTextInput;

const styles = StyleSheet.create({

    focusedTextField: {
        backgroundColor: Colors.listTextBackground,
    },

    icon: {
        paddingHorizontal: s(6),
        color: Colors.textColor4,
    },

    textInputStyle: {
        fontFamily: getFontFamily(weight.L),
        color: Colors.textColor4,
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 14.5,
        flex: 1,
        paddingRight: ms(8),
        paddingLeft: 16,
    },

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 8,
        overflow: "hidden",
        borderColor: Colors.divider,
        borderWidth: StyleSheet.hairlineWidth,
    },

    prefixIcon: {
        alignItems: "center",
        color: Colors.textColor4,
        marginRight: horizontalScale(4),
        paddingHorizontal: 8,
        paddingVertical: 4,
    },

});
