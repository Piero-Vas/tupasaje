import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {API_URL} from '@/config/env';
import Cookies from 'js-cookie';

const cooktoken = Cookies.get('token');

export const seatsApi = createApi({
    reducerPath: 'seatsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        headers: { 'Authorization': `Bearer ${cooktoken}` }
    }),
    endpoints: (builder)=>({
        getSeats: builder.query({
            query: (seatsId)=> ({
                "url": `/bus/seats/1`}),

        }),
    })
})

export const {useGetSeatsQuery, } = seatsApi

