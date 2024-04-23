import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import { TaskScreenProps } from '@/app/utils/types'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomScrollView from '@/app/components/AppScrollView'
import AppText from '@/app/components/AppText'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/app/utils/colors'
import AppTextInput from '@/app/components/AppTextInput'
import { SelectCountry } from 'react-native-element-dropdown'
import DropdownComponent from '@/app/components/DropdownComponent'
import { SelectList } from 'react-native-dropdown-select-list'
import AppButton from '@/app/components/AppButton'


const TaskScreen: FC<TaskScreenProps> = ({ navigation }) => {

    const [task, setTask] = useState<string>('');
    const [description, setDescription] = useState('')

    const taskRef = useRef<TextInput>(null);
    const descriptionRef = useRef<TextInput>(null);

    const [selected, setSelected] = useState<string>("");


    const data = [
        { key: '1', value: 'Personal' },
        { key: '2', value: 'Work' },
        { key: '3', value: 'Shopping' },
        { key: '4', value: 'School' },
        { key: '5', value: 'Home' }
    ];

    useEffect(() => {
        // Focus the text input when the screen mounts
        if (taskRef.current) {
            // taskRef.current.focus();
        }
    }, []);

    return (
        <SafeAreaView style={styles.mainView}>
            <CustomScrollView>
                <View style={[styles.mainView, { paddingHorizontal: 4 }]} >
                    <View style={styles.headerRow}>
                        <AppText fontWeight='Medium' style={styles.headerText}>
                            Task:
                        </AppText>

                        <Pressable>
                            <Ionicons
                                size={28}
                                name={"close"}
                                color={Colors.textColor1}
                                style={{ padding: 6 }}
                            />
                        </Pressable>
                    </View>

                    <View style={{ marginBottom: 12, marginHorizontal: 14, gap: 16 }}>

                        <AppTextInput
                            forwardedRef={taskRef}
                            placeholder="Add New Task"
                            text={task}
                            setText={setTask}
                            returnKeyType="next"
                            isTask={true}
                             
                            onSubmitEditing={() => descriptionRef.current?.focus()}
                        />

                        <AppTextInput
                            forwardedRef={descriptionRef}
                            placeholder="Description"
                            text={description}
                            setText={setDescription}
                            isTask={true}
                            
                            multiline
                            textAlignVertical='top'
                            numberOfLines={6}
                        />
                    </View>

                    <View style={{ paddingHorizontal: 20, paddingTop: 4, gap: 10 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
                            <AppText>
                                List
                            </AppText>


                            <SelectList
                                setSelected={(val: string) => setSelected(val)}
                                data={data}
                                save="value"
                                defaultOption={data[0]}
                                search={false}
                                maxHeight={200}
                                fontFamily='Regular'
                                dropdownStyles={{ borderColor: Colors.divider, borderWidth: 1 }}
                                inputStyles={{ margin: 0 }}
                                dropdownItemStyles={{ marginVertical: -2 }}
                                boxStyles={{ borderRadius: 6, borderColor: Colors.divider, borderWidth: 1 }}
                            />

                        </View>

                        <View style={{ flexDirection: "row" }}>
                            <AppText>
                                Due Date
                            </AppText>
                        </View>

                        <View style={{ flexDirection: "row" }}>
                            <AppText>
                                Tags
                            </AppText>
                        </View>
                    </View>
                </View>
            </CustomScrollView>

            <AppButton style={{position: 'absolute', bottom: 0}} buttonText={'Create'}/>
        </SafeAreaView>
    )
}

export default TaskScreen

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },

    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 12,
        paddingBottom: 20,
    },

    headerText: {
        fontSize: 27,
        marginLeft: 5,
    },

    dropdown: {
        marginLeft: 12,
        height: 50,
        width: 150,
        backgroundColor: Colors.inActiveInput,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
})