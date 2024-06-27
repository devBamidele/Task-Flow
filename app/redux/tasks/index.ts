export { useAddMutation, useGetAllQuery, useUpdateMutation } from "./service";

export type {
    AddTaskPayload,
    Task,
    TaskResponse,
    AddTaskResponse,
    UpdateTaskPayload
} from "./service.types";

export {
    getTasks,
    hasData,
    updateTasks,
    clearTasks,
    getUnSyncedTasks,
    getSelectedTiles,
    isSelecting,
    updateSelecting,
    clearSelecting,
    markTasksAsSynced
} from "./slice";

export { default as taskReducer } from "./slice";
