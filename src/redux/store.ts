import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import counterReducer from './features/counterSlice'
import ItinerarySelected from './features/itinerarySelected'
import validTrip from './features/validTripSlice'
import selectTrip from './features/selectItinerarieSlice'
import seatsReserved from './features/seatsSlice'
import validHistory from './features/validTripSlice'
import dataCustomer from './features/dataCustomerSilce'
import bookingCreate from './features/bookingSlice'

import { userApi } from './services/userApi'
import { cityApi } from './services/cityApi'
import { itinerariesApi } from './services/itinerariesApi'
import { seatsApi } from './services/seatsApi'
import { boxApi, boxDetailSliceReducer } from './services/checkout/boxDetailApi'


export const store = configureStore({
    reducer: {
        counterReducer,
        ItinerarySelected,
        validTrip,
        selectTrip,
        seatsReserved,
        validHistory,
        dataCustomer,
        bookingCreate,
        [userApi.reducerPath]: userApi.reducer,
        [cityApi.reducerPath]: cityApi.reducer,
        [itinerariesApi.reducerPath]: itinerariesApi.reducer,
        [seatsApi.reducerPath]: seatsApi.reducer,
        [boxApi.reducerPath]: boxApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            userApi.middleware, 
            cityApi.middleware,
            itinerariesApi.middleware,
            seatsApi.middleware,
            boxApi.middleware,
        ])
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch