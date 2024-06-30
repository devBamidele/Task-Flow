import { Alert, FlatList, Keyboard, Pressable, StyleSheet, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import React, { FC, useEffect, useRef, useState } from 'react';
import { TaskScreenProps } from '@/app/utils/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SelectList } from 'react-native-dropdown-select-list';
import { AppButton, AppText, AppTextInput, OutlinedButton, SubTaskTile, SubtaskTextInput } from '@/app/common';
import { Colors, addOpacity, getDate, weight } from '@/app/utils';
import { ms } from 'react-native-size-matters';
import { SubTask, UpdateTaskPayload } from '@/app/redux/tasks/service.types';
import _ from 'lodash';
import Row from '@/app/common/Row/Row';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useCreateTask, useUpdateTask } from '@/app/hooks';

const TaskScreen: FC<TaskScreenProps> = ({ route: { params }, navigation: { goBack } }) => {
    const isUpdate = params !== undefined;

    const [title, setTitle] = useState<string>(params?.title ?? '');
    const [description, setDescription] = useState<string>(params?.description ?? '');
    const [newSubTask, setNewSubTask] = useState("");
    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    const taskRef = useRef<TextInput>(null);
    const descriptionRef = useRef<TextInput>(null);


    const [subtasks, setSubtasks] = useState<SubTask[]>(params?.subtasks ?? []);
    const [selected, setSelected] = useState<string>("");

    const { createTask, isCreatingTask } = useCreateTask();
    const { updateTask } = useUpdateTask();

    const [selectedDate, setSelectedDate] = useState(params?.due_date ?? getDate());

    const handleDateChange = (event: DateTimePickerEvent, date: Date | undefined) => {
        if (date) {
            setSelectedDate(getDate(date));
        }
    };

    const saveSubTasks = () => {
        if (newSubTask.trim() === '') {
            return;
        }

        const newSubtaskObject: SubTask = {
            _id: getDate(undefined, true),
            task: newSubTask.trim(),
        };

        setSubtasks([...subtasks, newSubtaskObject]);

        setNewSubTask('');
    };

    const data = [
        { key: '1', value: 'Personal' },
        { key: '2', value: 'Work' },
        { key: '3', value: 'Shopping' },
        { key: '4', value: 'School' },
        { key: '5', value: 'Home' }
    ];

    const hasSubtasks = params?.subtasks && params.subtasks.length > 0;

    const confirmDelete = () =>
        Alert.alert('Delete', `Confirm delete tasks ${hasSubtasks ? "and related subtasks" : ""} ?`, [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK', onPress: onDelete },
        ]);

    const onDelete = () => {

    }

    const onPress = () => {
        const trimmedTitle = title.trim();
        const trimmedDescription = description.trim();

        if (isUpdate) {
            const updatedFields: Partial<UpdateTaskPayload> = {};

            if (params?.title !== trimmedTitle) {
                updatedFields.title = trimmedTitle;
            }

            if (params?.description !== trimmedDescription) {
                updatedFields.description = trimmedDescription;
            }

            if (!_.isEqual(params?.subtasks, subtasks)) {
                updatedFields.subtasks = subtasks;
            }

            if (params?.due_date !== selectedDate) {
                updatedFields.due_date = getDate(selectedDate, true);
            }

            updateTask({
                data: { _id: params?._id, ...updatedFields },
                next: goBack,
            });
        } else {
            createTask({
                data: {
                    title: trimmedTitle,
                    description: trimmedDescription,
                    subtasks,
                    due_date: new Date(selectedDate)
                },
                next: goBack,
            });
        }
    };


    useEffect(() => {
        const hasTextChanged = params?.title !== title || params?.description !== description;
        const hasSubtasksChanged = !_.isEqual(params?.subtasks, subtasks);
        const hasDateChanged = params?.due_date !== selectedDate;

        if (isUpdate) {
            setIsDisabled(title.length < 3 ? true : !(hasTextChanged || hasSubtasksChanged || hasDateChanged));
        } else {
            setIsDisabled(title.length < 3);
        }

    }, [title, description, params, isUpdate, subtasks, selectedDate]);


    // useEffect(() => {
    //     // Focus the text input when the screen mounts
    //     if (taskRef.current) {
    //         taskRef.current.focus();
    //     }
    // }, []);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.mainView}>

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
                            editable={!isCreatingTask}
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
                            editable={!isCreatingTask}
                        />
                    </View>
                    <Row selectedDate={new Date(selectedDate)} onDateChange={handleDateChange} />
                    <View style={styles.headerRow}>
                        <AppText fontWeight={weight.M} style={styles.subHeaderText}>
                            Subtask:
                        </AppText>
                    </View>
                    <View style={{ marginHorizontal: 14 }} >
                        <SubtaskTextInput
                            placeholder="Add New Subtask"
                            text={newSubTask}
                            setText={setNewSubTask}
                            onSave={saveSubTasks}
                        />
                        <View style={styles.taskList}>
                            <FlatList
                                data={subtasks}
                                keyExtractor={(task) => task._id}
                                renderItem={({ item, index }) => (
                                    <SubTaskTile item={item} index={index} />
                                )}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.buttonView}>

                    {isUpdate &&
                        <>
                            <OutlinedButton
                                onPress={() => {}}
                                buttonText={'Delete task'}
                                isLoading={false}
                                paddingBottom={10}
                                paddingHorizontal={0}
                                style={{ flex: 1 }}
                            />
                        </>
                    }

                    <AppButton
                        onPress={onPress}
                        buttonText={isUpdate ? 'Save changes' : 'Create'}
                        isLoading={isCreatingTask}
                        isDisabled={isDisabled}
                        isOutlined={true}
                        paddingBottom={10}
                        paddingHorizontal={0}
                        style={{ flex: 1 }}
                    />

                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>

    );
};

export default TaskScreen;

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },

    buttonView: {
        position: 'absolute',
        bottom: 0,
        flexDirection: "row",
        flex: 1,
        gap: 10,
        paddingHorizontal: 10
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
    taskList: {
        marginTop: 8,
        marginHorizontal: 4,
    },

    seperator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.divider,
        marginHorizontal: 6,
        marginBottom: 2,
    },
});
