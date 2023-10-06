import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {API_URL} from '@/config/env';
import Cookies from 'js-cookie';

const cooktoken = Cookies.get('token');


export const cityApi = createApi({
    reducerPath: 'cityApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        headers: { 'Authorization': `Bearer ${cooktoken}` }
    }),
    endpoints: (builder)=>({
        getCity: builder.query({
            query: ()=>'/cities/list',

        }),
    })
})

export const {useGetCityQuery, } = cityApi

