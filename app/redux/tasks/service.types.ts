
interface BaseResponse {
    message: string,
}
interface BaseTask {
    title: string,
    description: string,
    due_date? : string,
}

export interface AddTaskPayload extends Omit<BaseTask, 'due_date'> {
    due_date?: Date,
    subtasks?: SubTask[]
}

export interface Task extends BaseTask {
    _id: string,
    subtasks?: SubTask[],
    needsSync?: boolean,
}

export interface SubTask {
    _id: string,
    task: string,
}

export interface UpdateTaskPayload {
    _id: string,
    title?: string,
    description?: string,
    subtasks?: SubTask[],
    due_date?: string,
}

export interface UpdateSelectingPayload {
    id: string;
    add: boolean;
}

export interface TaskResponse {
    tasks: Task[],
}

export interface AddTaskResponse extends BaseResponse { }

export interface UpdateTaskResponse extends BaseResponse { }