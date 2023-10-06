
import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value: 0,
  };

export const selectItinerarieSlice = createSlice({
    name:"selectItinerarie",
    initialState,
    reducers:{
        selectItinerarie: (state, action)=>{
            // const { value } = action.payload;
            state.value = action.payload
        }

    }
})

export const {selectItinerarie} = selectItinerarieSlice.actions

export const selectedItinerary = (state:any) => state.selectItinerarie.value;

export default selectItinerarieSlice.reducer