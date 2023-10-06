import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    totalSeats: 0,
    seats: []
  };

export const seatsSlice = createSlice({
    name:"seatsReserved",
    initialState,
    reducers:{
        changeTotalSeats: (state, action)=>{
            const totalSeats  = action.payload;
            state.totalSeats = totalSeats
        },
        changeSeats: (state, action)=>{
            const value = action.payload;
            state.seats = value
        }

    }
})

export const {changeTotalSeats,changeSeats} = seatsSlice.actions

export default seatsSlice.reducer