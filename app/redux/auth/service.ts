import Endpoints from "@/app/api/endpoints";
import { api } from "../api";
import { AuthBase, LoginPayload, LoginResponse, LoginReturnValue, LogoutPayload, LogoutResponse, MetaData, RefreshResponse, RefreshReturnValue, RegisterPayload, RegisterResponse, ValidateTokenPayload, ValidateTokenResponse } from "./service.types";

type AuthMessageOnly = Pick<AuthBase, 'message'>;

export const authenticationApi = api.injectEndpoints({
    endpoints: builder => ({

        login: builder.mutation<LoginResponse, LoginPayload>({
            query: (body) => ({ url: Endpoints.login, method: 'POST', body }),

            transformResponse: async (baseQueryReturnValue: LoginReturnValue, meta: MetaData) => {
                const token = meta?.response?.headers.get('auth') ?? '';
                const refresh = meta?.response?.headers.get('refresh') ?? '';

                const { message, data } = await baseQueryReturnValue;

                return { tokens: { token, refresh }, message, data };
            },
        }),

        logout: builder.mutation<LogoutResponse, LogoutPayload>({
            query: (body) => ({ url: Endpoints.logout, method: 'POST', body })
        }),

        signUp: builder.mutation<RegisterResponse, RegisterPayload>({
            query: (body) => ({ url: Endpoints.register, method: 'POST', body })
        }),

        validateToken : builder.mutation<ValidateTokenResponse, ValidateTokenPayload> ({
            query: (body) => ({url: Endpoints.validateToken, method: 'POST', body}),

            transformResponse: async (baseQueryReturnValue: AuthMessageOnly, meta: MetaData) => {
                const token = meta?.response?.headers.get('auth') ?? '';
                const refresh = meta?.response?.headers.get('refresh') ?? '';

                const { message } = await baseQueryReturnValue;

                return { tokens: { token, refresh }, message };
            },
        }),
    })
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useSignUpMutation,
    useValidateTokenMutation,
} = authenticationApi