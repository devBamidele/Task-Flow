import React, { FC, useState } from 'react';
import { TextInput, TextInputProps, StyleSheet, View } from 'react-native';
import Colors, { addOpacity } from '../utils/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { customIconNames } from '../utils/types';

interface AppTextInputProps extends TextInputProps {
    text: string;
    iconSize?: number
    iconName?: customIconNames;
    setText: React.Dispatch<React.SetStateAction<string>>;
}

const AppTextInput: FC<AppTextInputProps> = ({
    iconSize,
    text,
    setText,
    iconName,
    ...otherProps
}) => {

    const [focused, setFocused] = useState<boolean>(false);

    return (
        <View style={[styles.container, focused && styles.focusedTextField]}>

            <Ionicons
                size={iconSize ?? 23}
                name={iconName}
                color={Colors.textColor1}

                style={[
                    styles.prefixIcon,
                    focused && {
                        color: Colors.primary
                    },
                    text.length != 0 && !focused && {
                        color: Colors.textColor1
                    }
                ]}
            />

            <TextInput
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}

                onChangeText={setText}
                value={text}

                placeholderTextColor={Colors.hintTextColor}
                selectionColor={Colors.textColor1}
                style={styles.textInputStyle}

                {...otherProps}
            />
        </View>
    );
};

export default AppTextInput;

const styles = StyleSheet.create({

    focusedTextField: {
        borderWidth: 0.8,
        
        borderColor: Colors.primary,
        shadowColor: Colors.textColor1,
        backgroundColor: Colors.activeInput,
    },

    textInputStyle: {
        fontFamily: "Light",
        paddingVertical: 16,
        paddingLeft: 16,
        fontSize: 16,
        flex: 1,
    },

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: Colors.inActiveInput,
    },

    prefixIcon: {
        alignItems: "center",
        paddingLeft: 22,
        color: Colors.hintTextColor,
    },

});
