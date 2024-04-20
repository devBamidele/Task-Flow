import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomScrollView from '@/app/components/AppScrollView'
import Colors from '@/app/utils/colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import { TodayScreenProps } from '@/app/utils/types'
import AppText from '@/app/components/AppText'
import AppTextInput from '@/app/components/AppTextInput'


const TodayScreen: FC<TodayScreenProps> = ({ navigation }) => {

    const [task, settask] = useState<string>('')

    return (
        <SafeAreaView style={styles.mainView}>
            <CustomScrollView>
                <View style={[styles.mainView, { paddingHorizontal: 10 }]} >

                    <View style={styles.backButton}>
                        <Pressable onPress={() => navigation.toggleDrawer()} >
                            <Ionicons
                                size={30}
                                name={"menu-outline"}
                                color={Colors.textColor1}
                                style={{ padding: 6 }}
                            />
                        </Pressable>

                        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                            <AppText fontWeight='Medium' style={styles.headerText}>
                                Today
                            </AppText>

                            <TouchableOpacity activeOpacity={0.6} style={styles.googleButton}>
                                <AppText style={{ fontSize: 17 }}>
                                    5
                                </AppText>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={{paddingHorizontal: 14, marginTop: 32}}>
                        <AppTextInput
                            placeholder="Add New Task"
                            text={task}
                            setText={settask}
                            iconName='add-outline'
                        />
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

    googleButton: {
        borderColor: Colors.divider,
        borderWidth: 1,
        paddingHorizontal: 7,
        paddingVertical: 5,
        borderRadius: 8,
        marginLeft: 7
    },

    headerText: {
        fontSize: 29,
        marginLeft: 5,
    }

})