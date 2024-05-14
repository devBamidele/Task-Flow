import Endpoints from "@/app/api/endpoints";
import { api } from "../api";
import { LoginPayload, LoginResponse, LoginReturnValue, LogoutPayload, LogoutResponse, RegisterPayload, RegisterResponse } from "./service.types";


export const authenticationApi = api.injectEndpoints({
    endpoints: builder => ({

        login: builder.mutation<LoginResponse, LoginPayload>({
            query: (body) => ({ url: Endpoints.login, method: 'POST', body }),

            transformResponse: async (baseQueryReturnValue: LoginReturnValue, meta) => {
                const token = meta?.response?.headers.get('auth') ?? '';
                const { message, data } = await baseQueryReturnValue;

                return { token, message, data };
            },
        }),

        logout: builder.mutation<LogoutResponse, LogoutPayload>({
            query: (body) => ({ url: Endpoints.logout, method: 'POST', body })
        }),

        register: builder.mutation<RegisterResponse, RegisterPayload>({
            query: (body) => ({ url: Endpoints.register, method: 'POST', body })
        })

    })
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation
} = authenticationApi