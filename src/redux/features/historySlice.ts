import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value: false,
  };

export const validHistorySlice = createSlice({
    name:"validHistory",
    initialState,
    reducers:{
        changeValidHistory: (state, action)=>{
            // const { value } = action.payload;
            state.value = action.payload
        }

    }
})

export const {changeValidHistory} = validHistorySlice.actions

export default validHistorySlice.reducer