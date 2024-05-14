import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Endpoints from '../api/endpoints'
import { RootState } from './store';

// Single API slice object
export const api = createApi({
    reducerPath: 'todo',

    baseQuery: fetchBaseQuery({
        baseUrl: Endpoints.baseUrl,

        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token;

            if (token) headers.set("authorization", `Bearer ${token}`)

            headers.set("Content-type", `application/json`);
            return headers;
        }
    }),

    endpoints: () => ({}),

    tagTypes: []

})