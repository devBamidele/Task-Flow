import { StyleSheet, View } from 'react-native'
import React, { FC, useState } from 'react'
import Checkbox from 'expo-checkbox'
import AppText from '../Text/AppText'
import { Colors } from '@/app/utils'
import { Task } from '@/app/redux/tasks'
import Ionicons from '@expo/vector-icons/Ionicons';

interface AppTileProps {
    item: Task,
    index: number,
}

const AppTile: FC<AppTileProps> = ({ item, index }) => {

    const [isChecked, setChecked] = useState(false);

    return (
        <View style={styles.container} >

            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Checkbox
                    style={styles.checkbox}
                    value={isChecked}
                    onValueChange={setChecked} />
                <AppText key={item._id}>{item.title}</AppText>
            </View>

            <Ionicons
                    size={22}
                    style={{marginRight: 4}}
                    name={"arrow-forward-outline"}
                    color={Colors.textColor3} />
        </View>
    )
}

export default AppTile

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        alignItems: "center",
        marginHorizontal: 8,
        justifyContent:"space-between",
        marginVertical: 5
    },

    checkbox: {
        margin: 8,
        borderColor: Colors.divider,
        borderRadius: 4,
        borderWidth: 1.5,
    },

})