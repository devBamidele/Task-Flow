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
    tokens: {
        token: string,
        refresh: string,
    }
}

export interface LoginReturnValue extends AuthBase { }

export interface RegisterPayload extends AuthData {
    password: string,
}

export interface LogoutPayload { }

export interface LogoutResponse { }

export interface RegisterResponse { }

export interface AuthState {
    token: string,
    refresh: string,
}

export interface MetaData {
    request: Request;
    response: Response
}

export interface RefreshReturnValue {
    message : string,
}

export interface RefreshResponse extends RefreshReturnValue {
    token : string,
}