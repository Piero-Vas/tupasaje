import {createApi, fetchBaseQuery,} from '@reduxjs/toolkit/query/react'
import {API_URL} from '@/config/env';
import Cookies from 'js-cookie';

const cooktoken = Cookies.get('token');

export const boxApi = createApi({
    reducerPath: 'boxApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        headers: { 'Authorization': `Bearer ${cooktoken}` }
    }),
    endpoints: (builder)=>({
        getDetailBox: builder.query({
            query: (boxId)=> ({
                "url": `/cashiershift/detail/${boxId}}`}),

        }),
    })
})

export const {useGetDetailBoxQuery, } = boxApi

export const boxDetailSliceReducer = boxApi.reducer;
export const fetchdata = boxApi.endpoints.getDetailBox;


// apiSlice.js
// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// // Define el thunk para llamar a la API
// export const fetchApiData = createAsyncThunk(API_URL, async () => {
//   try {
//     const response = await fetch('/cashiershift/detail/1',{
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer cooktoken`,
//         },
//       });
//     if (!response.ok) {
//       throw new Error('No se pudo cargar la API');
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     throw new Error('Ocurrió un error al cargar la API: ' + error);
//   }
// });

// // Define el slice
// const apiSlice = createSlice({
//   name: 'api',
//   initialState: {
//     data: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchApiData.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchApiData.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//       })
//       .addCase(fetchApiData.rejected, (state, action) => {
//         state.loading = false;
//         // state.error = action.error.name;
//       });
//   },
// });

// // Exporta el reducer generado por createSlice
// export default apiSlice.reducer;
