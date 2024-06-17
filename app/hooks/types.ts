import { useDispatch, useSelector } from "react-redux";
import { LoginPayload, RegisterPayload } from "../redux/auth/service.types";
import { AppDispatch, RootState } from "../redux/store";
import { AddTaskPayload, UpdateTaskPayload } from "../redux/tasks";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export interface BaseError {
    data: { error: string },
    status: number
}

interface NextAction {
    next: VoidFunction,
}

export interface loginUserParams extends NextAction {
    data: LoginPayload,
}

export interface signUpUserParams extends NextAction {
    data: RegisterPayload;
}

export interface CreateTaskParams extends NextAction {
    data: AddTaskPayload,
}

export interface UpdateTaskParams extends NextAction {
    data: UpdateTaskPayload,
}
export interface GoogleSignInError {
    nativeStackAndroid?: Array<{
        lineNumber: number;
        file: string;
        methodName: string;
        class: string;
    }>;
    userInfo?: any;
    message: string;
    code: string;
}


export interface loginError extends BaseError {}

export interface signUpError extends BaseError {}

export interface FetchError {
    status: string;
    error: string;
}
