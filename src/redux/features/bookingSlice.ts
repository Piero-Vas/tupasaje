import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    id_itinerary: 0,
    id_customer: "3d6a511f-834b-438e-a8ed-3c77162e820b",
    travel_date: "",
    status: "pending",
    payment_status: "pending",
    price_final: 0,
    seats: [],
    dataCustomer: []
  };

export const BookingData = createSlice({
    name:"BookingData",
    initialState,
    reducers:{
        changeSeats: (state, action)=>{
            const { id_itinerary,travel_date,price_final, seats } = action.payload;
            state.id_itinerary = id_itinerary,
            state.travel_date = travel_date,
            state.price_final = price_final,
            state.seats = seats
        },
        changeDataCustomer: (state, action)=>{
            const dataCustomer = action.payload;
            state.dataCustomer = dataCustomer
        },
        // changedateSince: (state, action)=>{
        //     state.dateSince = action.payload
        // },
        // changedateUntil: (state, action)=>{
        //     state.dateUntil = action.payload
        // },
        // changeValidTrip: (state, action)=>{
        //     state.roundTrip = action.payload
        // }

    }
})

export const {changeSeats, changeDataCustomer} = BookingData.actions

export default BookingData.reducer