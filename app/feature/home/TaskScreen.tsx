import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { TaskScreenProps } from '@/app/utils/types'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons';
import { SelectList } from 'react-native-dropdown-select-list'
import { AppButton, AppScrollView, AppText, AppTextInput } from '@/app/common';
import { Colors, weight } from '@/app/utils';
import useCreateTask from '@/app/hooks/useCreateTask';
import useUpdateTask from '@/app/hooks/useUpdateTask';


const TaskScreen: FC<TaskScreenProps> = ({ route: { params }, navigation: { goBack } }) => {
    const isUpdate = params !== undefined;

    const [title, setTitle] = useState<string>(params?.title ?? '');
    const [description, setDescription] = useState(params?.description ?? '');

    const taskRef = useRef<TextInput>(null);
    const descriptionRef = useRef<TextInput>(null);

    const [selected, setSelected] = useState<string>("");

    const { createTask, isCreatingTask } = useCreateTask();
    const { updateTask, isUpdatingTask } = useUpdateTask();

    const data = [
        { key: '1', value: 'Personal' },
        { key: '2', value: 'Work' },
        { key: '3', value: 'Shopping' },
        { key: '4', value: 'School' },
        { key: '5', value: 'Home' }
    ];

    const onPress = () => {
        if (isUpdate) {

            const updatedTitle = params?.title === title ? undefined : title;
            const updatedDesc = params?.description === description ? undefined : description

            updateTask({
                data: { _id: params._id, title: updatedTitle, description: updatedDesc },
                next: goBack,
            })

            return;
        }

        createTask({
            data: { title, description },
            next: goBack,
        })
    }

    useEffect(() => {
        // Focus the text input when the screen mounts
        if (taskRef.current) {
            // taskRef.current.focus();
        }
    }, []);

    return (
        <SafeAreaView style={styles.mainView}>
            <AppScrollView>
                <View style={[styles.mainView, { paddingHorizontal: 4 }]} >
                    <View style={styles.headerRow}>
                        <AppText fontWeight={weight.M} style={styles.headerText}>
                            Task:
                        </AppText>

                        <Pressable onPress={goBack}>
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
                            assignRef={taskRef}
                            placeholder="Add New Task"
                            text={title}
                            setText={setTitle}
                            returnKeyType="next"
                           
                            onSubmitEditing={() => descriptionRef.current?.focus()}
                        />

                        <AppTextInput
                            assignRef={descriptionRef}
                            placeholder="Description"
                            text={description}
                            setText={setDescription}
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
            </AppScrollView>

            <AppButton
                onPress={onPress}
                style={{ position: 'absolute', bottom: 0 }}
                buttonText={isUpdate ? 'Update' : 'Create'}
                isLoading={isUpdate ? isUpdatingTask : isCreatingTask}
            />
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