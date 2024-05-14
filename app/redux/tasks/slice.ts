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
                state.data.push(...payload)
            }
        )
    },
});

export const selectTasks = (state: RootState) => state.task.data;

export const { updateTasks } = taskSlice.actions;

export default taskSlice.reducer;
