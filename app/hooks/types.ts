import { LoginPayload } from "../redux/auth/service.types";


export interface loginUserParams {
    data: LoginPayload,
    next: VoidFunction,
}

export interface loginError {
    data: { error: string },
    status: number
}