import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetkpisResponse } from "./types";

export const api = createApi({
    
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL}),
    reducerPath: "main",
    tagTypes: ["kpis"],
    endpoints: (build) => ({
        getKpis: build.query<Array<GetkpisResponse>, void>({
            query: () => "kpi/kpis/",
            providesTags: ["kpis"]
        })
    })
})

export const { useGetKpisQuery } = api