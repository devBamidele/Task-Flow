import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Endpoints from '../api/endpoints'
import { RootState } from './store';
import { Mutex } from 'async-mutex';

import type {
    BaseQueryApi,
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query'

import { loggedOut, updateTokens } from './auth/slice';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { clearUserData } from './user/slice';

const mutex = new Mutex();

async function refreshAccessToken(
    refresh: string,
    api: BaseQueryApi,
    extraOptions: {}
): Promise<
    QueryReturnValue<
        unknown,
        FetchBaseQueryError,
        FetchBaseQueryMeta
    >> {

    return await baseQuery({
        method: 'GET',
        url: Endpoints.refresh,
        headers: { 'refresh': `Bearer ${refresh}` }
    }, api, extraOptions);
}

const baseQuery = fetchBaseQuery({
    baseUrl: Endpoints.baseUrl,

    prepareHeaders: (headers, { getState }) => {
        const { token } = (getState() as RootState).auth;

        if (token) headers.set("authorization", `Bearer ${token}`)

        headers.set("Content-type", `application/json`);

        return headers;
    },
})

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {

    await mutex.waitForUnlock();

    let res = await baseQuery(args, api, extraOptions);

    // Useful for logging purposes
    // console.log(`The response data \n ${JSON.stringify(res.data)}`);

    if (res.error && res.meta?.response?.status === 401) {

        if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            const { refresh } = (api.getState() as RootState).auth;

            try {
                const refreshRes = await refreshAccessToken(refresh, api, extraOptions);

                if (refreshRes.data) {

                    // Extract the token from the headers
                    const token = refreshRes.meta?.response?.headers.get('auth') ?? undefined;

                    // Update the token
                    api.dispatch(updateTokens({ token }));

                    // Retry the intial query
                    res = await baseQuery(args, api, extraOptions);

                } else {

                    // Reset the data
                    api.dispatch(loggedOut());
                    api.dispatch(clearUserData());
                }

            } finally {
                release();
            }

        } else {
            await mutex.waitForUnlock()
            res = await baseQuery(args, api, extraOptions)
        }
    }
    return res;
}
// Single API slice object
export const api = createApi({
    reducerPath: 'todo',

    baseQuery: baseQueryWithReauth,

    refetchOnMountOrArgChange: 120,

    endpoints: () => ({}),

    tagTypes: ['Tasks'],
})