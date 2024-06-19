import Endpoints from "@/app/api/endpoints";
import { api } from "../api";
import { 
    AuthBase, 
    LoginPayload, 
    LoginResponse, 
    LoginReturnValue, 
    LogoutPayload, 
    LogoutResponse, 
    MetaData, 
    RegisterPayload, 
    RegisterResponse, 
    ValidateTokenPayload, 
    ValidateTokenResponse 
} from "./service.types";

type AuthMessageOnly = Pick<AuthBase, 'message'>;

const transformWithTokens = async <T>(baseQueryReturnValue: T, meta: MetaData) => {
    const token = meta?.response?.headers.get('auth') ?? '';
    const refresh = meta?.response?.headers.get('refresh') ?? '';
    const { message, ...rest } = await baseQueryReturnValue as any;
    return { tokens: { token, refresh }, message, ...rest };
};

const createQuery = <T>(endpoint: string) => (body: T) => ({ 
    url: endpoint,
    method: 'POST',
    body,
});

export const authenticationApi = api.injectEndpoints({
    endpoints: builder => ({

        login: builder.mutation<LoginResponse, LoginPayload>({
            query: createQuery(Endpoints.login),

            transformResponse: (baseQueryReturnValue : LoginReturnValue, meta : MetaData) => 
                transformWithTokens<LoginReturnValue>(baseQueryReturnValue, meta),
        }),

        logout: builder.mutation<LogoutResponse, LogoutPayload>({
            query: createQuery(Endpoints.logout),
        }),

        signUp: builder.mutation<RegisterResponse, RegisterPayload>({
            query: createQuery(Endpoints.register),
        }),

        validateToken: builder.mutation<ValidateTokenResponse, ValidateTokenPayload>({
            query: createQuery(Endpoints.validateToken),

            transformResponse: (baseQueryReturnValue : AuthMessageOnly, meta: MetaData) => 
                transformWithTokens<AuthMessageOnly>(baseQueryReturnValue, meta),
        }),
    })
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useSignUpMutation,
    useValidateTokenMutation,
} = authenticationApi;
