import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Endpoints from '../core/api/endpoints'

// Single API slice object
export const api = createApi({
    reducerPath: 'todo',

    baseQuery: fetchBaseQuery({ baseUrl: Endpoints.baseUrl }),

    endpoints: () => ({}),

    tagTypes: []

})