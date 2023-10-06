import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {API_URL} from '@/config/env';
import Cookies from 'js-cookie';

const cooktoken = Cookies.get('token');

export const itinerariesApi = createApi({
    reducerPath: 'itinerariesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        headers: { 'Authorization': `Bearer ${cooktoken}` }
    }),
    endpoints: (builder)=>({
        getItinerary: builder.query({
            query: (itineraryId)=> ({
                "url": `/itineraries/detail/${itineraryId}}/''`}),

        }),
    })
})

export const {useGetItineraryQuery, } = itinerariesApi

