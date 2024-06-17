import { UserInfo } from "../user/service.types";

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
    tokens: AuthState,
}

export interface GoogleLoginResponse {
    scopes: string[];
    serverAuthCode: string | null;
    idToken: string | null;
    user: UserInfo;
}

export interface LoginReturnValue extends AuthBase { }

export interface RegisterPayload extends AuthData {
    password: string,
}

export interface ValidateTokenPayload {
    idToken: string;
    email: string;
}

export interface LogoutPayload { }

export interface LogoutResponse { }

export interface RegisterResponse {
    message: string,
}

export interface ValidateTokenResponse {
    message: string,
    tokens : AuthState,
}

export interface AuthState {
    token: string,
    refresh: string,
}

export interface MetaData {
    request: Request;
    response: Response
}

export interface RefreshReturnValue {
    message: string,
}

export interface RefreshResponse extends RefreshReturnValue {
    token: string,
}

