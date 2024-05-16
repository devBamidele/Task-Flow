import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task } from "./service.types";
import { tasksApi } from "./service";
import { RootState } from "../store";

interface taskData {
    data: Task[]
}

const initialState: taskData = {
    data: []
};

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        updateTasks: (state, action: PayloadAction<Task[]>) => {
            state.data.push(...action.payload);
        } 
    },

    extraReducers(builder) {
        builder.addMatcher(
            tasksApi.endpoints.getAll.matchFulfilled,
            (state, { payload }) => {

                console.log(payload);

                payload.forEach((newTask) => {

                    const taskIndex = state.data.findIndex((task) => task._id === newTask._id);

                    if (taskIndex !== -1) {
                        state.data[taskIndex] = { ...state.data[taskIndex], ...newTask };
                    } else {
                        state.data.push(newTask);
                    }
                });
            }
        )
    },
});

export const selectTasks = (state: RootState) => state.task.data;

export const { updateTasks } = taskSlice.actions;

export default taskSlice.reducer;
