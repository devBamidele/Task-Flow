import { Pressable, StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomScrollView from '@/app/components/AppScrollView'
import Colors from '@/app/utils/colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import { TodayScreenProps } from '@/app/utils/types'
import AppText from '@/app/components/AppText'
import AddTaskButton from '@/app/components/AddTaskButton'


const TodayScreen: FC<TodayScreenProps> = ({ navigation: { toggleDrawer, navigate } }) => {

    return (
        <SafeAreaView style={styles.mainView}>
            <CustomScrollView>
                <View style={[styles.mainView, { paddingHorizontal: 10 }]} >

                    <View style={styles.backButton}>
                        <Pressable onPress={toggleDrawer} >
                            <Ionicons
                                size={28}
                                name={"menu-outline"}
                                color={Colors.textColor1}
                                style={{ padding: 6 }}
                            />
                        </Pressable>

                        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                            <AppText fontWeight='Medium' style={styles.headerText}>
                                Today
                            </AppText>

                            <View style={styles.undoneCount}>
                                <AppText style={{ fontSize: 15 }}>
                                    5
                                </AppText>
                            </View>
                        </View>
                    </View>


                    <View style={{ paddingHorizontal: 14, marginTop: 28 }}>
                        <AddTaskButton onPress={() => navigate('Task')} buttonText='Add New Task' />
                    </View>

                </View>
            </CustomScrollView>
        </SafeAreaView>
    )
}

export default TodayScreen

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },

    backButton: {
        marginTop: 20,
        marginLeft: 8,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },

    undoneCount: {
        borderColor: Colors.divider,
        borderWidth: 1,
        paddingHorizontal: 5,
        paddingVertical: 3,
        borderRadius: 8,
        marginLeft: 4
    },

    headerText: {
        fontSize: 27,
        marginLeft: 5,
    }

})