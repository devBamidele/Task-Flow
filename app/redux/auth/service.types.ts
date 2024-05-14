export interface LoginPayload {
    email: string,
    password: string,
}

export interface AuthData {
    name: string;
    email: string;
}

export interface AuthBase {
    message: string
    data: AuthData
}

export interface LoginResponse extends AuthBase {
    token: string
}

export interface LoginReturnValue extends AuthBase {}

export interface RegisterPayload extends AuthData {
    password: string,
}

export interface LogoutPayload { }

export interface LogoutResponse { }

export interface RegisterResponse { }