import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors, { addOpacity } from '@/app/utils/colors';
import AppText from '../Text/AppText';
import { ms } from 'react-native-size-matters';

type onPress = () => void;

interface addTaskButtonProps {
    onPress?: onPress;
    buttonText: string;
}

const AddTaskButton: FC<addTaskButtonProps> = ({ onPress, buttonText }) => {
    return (
        <View style={styles.buttonView}>
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.6}
                style={[styles.button]}>

                <Ionicons
                    size={24}
                    name={"add"}
                    color={Colors.textColor4} />

                <AppText
                    style={styles.buttonText}>
                    {buttonText}
                </AppText>

            </TouchableOpacity>
        </View>
    )
}

export default AddTaskButton

const styles = StyleSheet.create({
    buttonView: {
        paddingBottom: ms(12),
        width: "100%",
    },

    button: {
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 8,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.divider,
        alignItems: "center",

        //iOS
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },

    buttonText: {
        textAlign: "center",
        color: addOpacity(Colors.black, 0.5),
        fontSize: ms(12),
        marginLeft: 4,
    }

})