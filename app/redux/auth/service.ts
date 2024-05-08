import Endpoints from "@/app/core/api/endpoints";
import { LoginParams } from "@/app/feature/auth/model/params";
import { LoginResponse } from "@/app/feature/auth/model/res";
import { api } from "../api";


export const AuthenticationApi = api.injectEndpoints({
    endpoints: builder => ({

        loginUser: builder.mutation<LoginResponse, LoginParams>({
            query: (body) => ({ url: Endpoints.login, method: 'POST', body }),
        })
    })
})