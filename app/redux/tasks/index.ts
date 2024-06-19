export { useAddMutation, useGetAllQuery } from "./service";

export type { AddTaskPayload, Task, TaskResponse, AddTaskResponse, UpdateTaskPayload } from "./service.types";

export { getTasks, hasData, updateTasks, clearTasks } from "./slice";

export { default as taskReducer } from "./slice";
