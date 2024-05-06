import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/app/utils/colors';
import AppText from '../Text/AppText';

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
                    color={Colors.textColor1} />

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
        paddingBottom: 24,
        width: "100%",

    },

    button: {
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.divider,
        alignItems: "center",

        //iOS
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },

    buttonText: {
        textAlign: "center",
        color: Colors.textColor1,
        fontSize: 16,
        marginLeft: 4,
    }

})