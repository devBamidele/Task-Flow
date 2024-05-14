import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons';
import { TodayScreenProps } from '@/app/utils/types'
import { AddTaskButton, AppScrollView, AppText } from '@/app/common';
import { Colors, weight } from '@/app/utils';
import { useSelector } from 'react-redux';
import { selectTasks } from '@/app/redux/tasks/slice';
import { useGetAllQuery } from '@/app/redux/tasks/service';


const TodayScreen: FC<TodayScreenProps> = ({ navigation: { toggleDrawer, navigate } }) => {

    const { isLoading, isError, isSuccess } = useGetAllQuery();

    const tasks = useSelector(selectTasks);


    return (
        <SafeAreaView style={styles.mainView}>
            <AppScrollView>
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
                            <AppText fontWeight={weight.M} style={styles.headerText}>
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


                    {isLoading &&
                        <ActivityIndicator/>
                    }

                    {isError &&
                        <AppText>
                            An error occurred
                        </AppText>
                    }


                    {isSuccess &&
                        tasks.map((task) => (
                            <AppText key={task._id}>{task.title}</AppText>
                        ))
                    }


                </View>
            </AppScrollView>
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