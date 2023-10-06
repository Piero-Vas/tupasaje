
import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value: false,
  };

export const validTripSlice = createSlice({
    name:"validTrip",
    initialState,
    reducers:{
        changeValidTrip: (state, action)=>{
            // const { value } = action.payload;
            state.value = action.payload
        }

    }
})

export const {changeValidTrip} = validTripSlice.actions

export default validTripSlice.reducer