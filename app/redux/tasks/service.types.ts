
export interface BaseTask {
    title : string,
    description : string,
}

export interface AddTaskQuery extends BaseTask{}

export interface Task extends BaseTask{
    _id: string
}

export interface TaskResponse {
    tasks : Task[],
}



export interface AddTaskResponse {
    message : string
}