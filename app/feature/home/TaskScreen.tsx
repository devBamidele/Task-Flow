import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import React, { FC, useEffect, useRef, useState } from 'react';
import { TaskScreenProps } from '@/app/utils/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SelectList } from 'react-native-dropdown-select-list';
import { AddTaskButton, AppButton, AppScrollView, AppText, AppTextInput, SubtaskTextInput } from '@/app/common';
import { Colors, addOpacity, weight } from '@/app/utils';
import useCreateTask from '@/app/hooks/useCreateTask';
import useUpdateTask from '@/app/hooks/useUpdateTask';
import { ms, mvs } from 'react-native-size-matters';
import DrawerTextInput from '@/app/common/TextInput/DrawerTextInput';

const TaskScreen: FC<TaskScreenProps> = ({ route: { params }, navigation: { goBack } }) => {
    const isUpdate = params !== undefined;

    const [title, setTitle] = useState<string>(params?.title ?? '');
    const [description, setDescription] = useState<string>(params?.description ?? '');
    const [subtask, setSubtask] = useState("");
    const [isDisabled, setIsDisabled] = useState<boolean>(true);

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
            const updatedDesc = params?.description === description ? undefined : description;

            updateTask({
                data: { _id: params._id, title: updatedTitle, description: updatedDesc },
                next: goBack,
            });
            return;
        }

        createTask({
            data: { title, description },
            next: goBack,
        });
    };

    useEffect(() => {
        // Determine if there's any text change
        const hasTextChanged = (params?.title !== title || params?.description !== description);

        // Determine if the button should be disabled
        if (isUpdate) {
            setIsDisabled(!hasTextChanged || title.length < 3);
        } else {
            setIsDisabled(title.length < 3);
        }
    }, [title, description, params, isUpdate]);

    useEffect(() => {
        // Focus the text input when the screen mounts
        if (taskRef.current) {
            taskRef.current.focus();
        }
    }, []);

    return (
        <SafeAreaView style={styles.mainView}>
            <AppScrollView>
                <View style={[styles.mainView, { paddingHorizontal: 4 }]}>

                    {/* The top header row containing Task:    x */}
                    <View style={styles.headerRow}>
                        <AppText fontWeight={weight.M} style={styles.headerText}>
                            Task:
                        </AppText>
                        <Pressable onPress={goBack}>
                            <Ionicons
                                size={26}
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
                            isTask={true}
                            onSubmitEditing={() => descriptionRef.current?.focus()}
                            editable={!isCreatingTask && !isUpdatingTask}
                        />
                        <AppTextInput
                            assignRef={descriptionRef}
                            placeholder="Description"
                            text={description}
                            setText={setDescription}
                            multiline
                            isTask={true}
                            textAlignVertical="top"
                            numberOfLines={6}
                            editable={!isCreatingTask && !isUpdatingTask}
                        />
                    </View>

                    <View style={{ paddingHorizontal: 12, paddingTop: 4, gap: 10 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>

                            <AppText style={styles.subText}>
                                List
                            </AppText>

                        </View>

                        <View style={{ flexDirection: "row" }}>
                            <AppText style={styles.subText}>
                                Due date
                            </AppText>
                        </View>

                        <View style={{ flexDirection: "row" }}>
                            <AppText style={styles.subText}>
                                Tags
                            </AppText>
                        </View>
                    </View>

                    <View style={styles.headerRow}>
                        <AppText fontWeight={weight.M} style={styles.subHeaderText}>
                            Subtask:
                        </AppText>
                    </View>

                    <View style={{marginHorizontal:14}} >
                        <SubtaskTextInput
                            placeholder="Add New Subtask"
                            text={subtask}
                            setText={setSubtask}
                        />
                    </View>

                </View>

            </AppScrollView>
            <AppButton
                onPress={onPress}
                style={{ position: 'absolute', bottom: 0 }}
                buttonText={isUpdate ? 'Update' : 'Create'}
                isLoading={isUpdate ? isUpdatingTask : isCreatingTask}
                isDisabled={isDisabled}
            />
        </SafeAreaView>
    );
};

export default TaskScreen;

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 12,
        paddingBottom: 12,
    },
    subHeaderText: {
        fontSize: ms(17),
        marginLeft: 8,
    },
    headerText: {
        fontSize: ms(21),
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

    subText: {
        fontSize: ms(11),
        color: addOpacity(Colors.black, 0.8),
    },
});
