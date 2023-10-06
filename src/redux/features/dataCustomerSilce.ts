import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value : []
  };

export const dataCustomerSlice = createSlice({
    name:"dataCustomer",
    initialState,
    reducers:{
        changeDataCustomer: (state, action)=>{
            const value = action.payload;
            state.value = value
        }

    }
})

export const {changeDataCustomer} = dataCustomerSlice.actions

export default dataCustomerSlice.reducer