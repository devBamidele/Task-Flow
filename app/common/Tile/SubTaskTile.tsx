import { Pressable, StyleSheet, View } from 'react-native';
import React, { FC, useState } from 'react';
import Checkbox from 'expo-checkbox';
import AppText from '../Text/AppText';
import { Colors, TaskScreenProps, addOpacity } from '@/app/utils';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ms } from 'react-native-size-matters';
import { SubTask } from '@/app/redux/tasks/service.types';

interface SubTaskTileProps {
    item: SubTask;
    index: number;
}

const SubTaskTile: FC<SubTaskTileProps> = ({ item, index }) => {
    const onPress = () => {
        //navigation.navigate('Task', item);
    };

    const [isChecked, setChecked] = useState(false);

    return (
        <Pressable style={styles.container} onPress={onPress}>

            <Pressable style={styles.checkBoxPressable} onPress={() => setChecked(!isChecked)}>
                <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
            </Pressable>

            <View style={styles.textContainer}>
                <AppText numberOfLines={1} style={styles.title} key={item._id}>
                    {item.task}
                </AppText>
            </View>

            <Ionicons
                size={22}
                style={styles.arrowIcon}
                name={"arrow-forward-outline"}
                color={Colors.textColor4}
            />
        </Pressable>
    );
}

export default SubTaskTile;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: "flex-start",
        marginHorizontal: 4,
        marginVertical: 5,
        paddingBottom: 4
    },
    checkBoxPressable: {
        alignSelf: "center",
        paddingVertical: 7,
        paddingLeft: 4,
        paddingRight: 8,
    },
    checkbox: {
        borderColor: Colors.divider,
        borderRadius: 4,
        borderWidth: StyleSheet.hairlineWidth * 1.5,
    },
    textContainer: {
        //marginTop: 2,
        flex: 1,
        flexShrink: 1,
        alignSelf: "center"
    },
    title: {
        fontSize: ms(10),
        color: addOpacity(Colors.black, 0.7),
    },
    arrowIcon: {
        marginRight: 6,
        alignSelf: "center",
        marginLeft: 12,
    },
});
