import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { Task, SubTask, UpdateTaskPayload, UpdateSelectingPayload } from "./service.types";
import { tasksApi } from "./service";
import { RootState } from "../store";
import { loggedOut } from "../auth/slice";

interface TaskData {
    data: Task[];
    hasCache: boolean;
    selected: string[];
    unsyncedTasks: UpdateTaskPayload[];
}

const initialState: TaskData = {
    data: [],
    hasCache: false,
    selected: [],
    unsyncedTasks: [],
};

const resetTaskState = (state: TaskData) => initialState;

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        updateTasks: (state, action: PayloadAction<UpdateTaskPayload>) => {
            const { _id, ...updates } = action.payload;
            const task = state.data.find(task => task._id === _id);

            if (task) {
                Object.assign(task, updates);

                const existingUnsyncedIndex = state.unsyncedTasks.findIndex(item => item._id === _id);

                if (existingUnsyncedIndex !== -1) {
                    state.unsyncedTasks[existingUnsyncedIndex] = {
                        ...state.unsyncedTasks[existingUnsyncedIndex],
                        ...updates,
                    };
                } else {
                    state.unsyncedTasks.push(action.payload);
                }
            }
        },

        updateSelecting: (state, action: PayloadAction<UpdateSelectingPayload>) => {
            const { id, add } = action.payload;

            if (add) {
                if (!state.selected.includes(id)) {
                    state.selected.push(id);
                }
            } else {
                const index = state.selected.indexOf(id);
                if (index !== -1) {
                    state.selected.splice(index, 1);
                }
            }
        },

        markTasksAsSynced: (state, action: PayloadAction<string[]>) => {
            action.payload.forEach(id => {
                const index = state.unsyncedTasks.findIndex(task => task._id === id);

                if (index !== -1) {
                    state.unsyncedTasks.splice(index, 1);
                }
            });
        },

        deleteTasks: (state, action: PayloadAction<string[]>) => {
            const idsToDelete = new Set(action.payload);
        
            // Remove tasks from state.data
            state.data = state.data.filter(task => !idsToDelete.has(task._id));
        
            // Remove tasks from state.unsyncedTasks
            state.unsyncedTasks = state.unsyncedTasks.filter(task => !idsToDelete.has(task._id));
        },

        clearSelecting: (state) => {
            state.selected.length = 0;
        },

        clearTasks: resetTaskState,
    },
    extraReducers: (builder) => {
        builder.addCase(loggedOut, resetTaskState);

        builder.addMatcher(
            tasksApi.endpoints.getAll.matchFulfilled,
            (state, { payload }) => {
                state.hasCache = true;

                if (payload.length === 0) {
                    state.data = [];
                    return;
                }

                payload.forEach((newTask) => {
                    const taskIndex = state.data.findIndex((task) => task._id === newTask._id);
                    if (taskIndex !== -1) {
                        state.data[taskIndex] = { ...state.data[taskIndex], ...newTask };
                    } else {
                        state.data.push(newTask);
                    }
                });
            }
        );
    },
});

export const getTasks = (state: RootState) => state.task.data;
export const hasData = (state: RootState) => state.task.hasCache;
export const isSelecting = (state: RootState) => state.task.selected.length > 0;
export const getSelectedTiles = (state: RootState) => state.task.selected;
export const getUnSyncedTasks = (state: RootState) => state.task.unsyncedTasks;

// export const getUnSyncedTasks = createSelector(
//     [getTasks],
//     tasks => tasks.filter(task => task.needsSync)
// );

export const { updateTasks, clearTasks, updateSelecting, clearSelecting, markTasksAsSynced, deleteTasks } = taskSlice.actions;

export default taskSlice.reducer;
