import { Pressable, StyleSheet, View } from 'react-native'
import React, { FC, useState } from 'react'
import Checkbox from 'expo-checkbox'
import AppText from '../Text/AppText'
import { Colors, TodayScreenProps, addOpacity, weight } from '@/app/utils'
import { Task } from '@/app/redux/tasks'
import Ionicons from '@expo/vector-icons/Ionicons';

interface AppTileProps extends TodayScreenProps {
    item: Task,
    index: number,
}

const AppTile: FC<AppTileProps> = ({ item, index, navigation }) => {

    const onPress = () => {
        navigation.navigate('Task', item)
    }

    const [isChecked, setChecked] = useState(false);

    return (
        <Pressable style={styles.container} onPress={onPress} >

            <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />

            <View style={{ marginTop: 2, gap: 4, flex: 1, flexShrink: 1 }}>
                <AppText
                    fontWeight={weight.M}
                    numberOfLines={1}
                    style={styles.title}
                    key={item._id}
                >{item.title}</AppText>

                <View>
                    <AppText style={styles.desc} >
                        {item.description}
                    </AppText>
                </View>
            </View>

            <Ionicons
                size={22}
                style={{ marginRight: 6, marginTop: 6 }}
                name={"arrow-forward-outline"}
                color={Colors.textColor3}
            />
        </Pressable>
    )
}

export default AppTile

const styles = StyleSheet.create({

    desc: {
        color: addOpacity(Colors.black, 0.5),
        fontSize: 13,

    },

    title: {
        fontSize: 15.5,
        color: addOpacity(Colors.black, 0.8),

    },

    container: {
        flexDirection: 'row',
        alignItems: "flex-start",
        marginHorizontal: 4,
        justifyContent: "space-between",
        marginVertical: 5,
        paddingBottom: 4
    },

    checkbox: {
        margin: 8,
        marginRight: 12,
        borderColor: Colors.divider,
        borderRadius: 4,
        borderWidth: 1.5,
    },

})