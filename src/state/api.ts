import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetkpisResponse, GetProductsResponse } from "./types";

export const api = createApi({

    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    reducerPath: "main",
    tagTypes: ["kpis", "Products"],
    endpoints: (build) => ({
        getKpis: build.query<Array<GetkpisResponse>, void>({
            query: () => "kpi/kpis/",
            providesTags: ["kpis"]
        }),
        getProducts: build.query<Array<GetProductsResponse>, void>({
            query: () => "product/products/",
            providesTags: ["Products"]
        }),

    })
})


export const { useGetKpisQuery, useGetProductsQuery } = api