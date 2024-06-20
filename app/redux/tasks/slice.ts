import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task } from "./service.types";
import { tasksApi } from "./service";
import { RootState } from "../store";
import { loggedOut } from "../auth/slice";

interface TaskData {
    data: Task[];
    hasCache: boolean;
}

const initialState: TaskData = {
    data: [],
    hasCache: false,
};

const resetTaskState = (state: TaskData) => {
    state.data = [];
    state.hasCache = false;
};

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {

        updateTasks: (state, action: PayloadAction<Task[]>) => {
            state.data.push(...action.payload);
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

export const { updateTasks, clearTasks } = taskSlice.actions;

export default taskSlice.reducer;
