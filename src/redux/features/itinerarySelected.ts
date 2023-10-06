import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    cityDestinationValue: 0,
    cityDestination: '',
    cityOriginValue: 0,
    cityOrigin: '',
    dateSince: '',
    dateUntil: '',
    roundTrip: false
  };

export const ItinerarySelected = createSlice({
    name:"ItinerarySelected",
    initialState,
    reducers:{
        changecityDestination: (state, action)=>{
            const { cityDestinationValue,cityDestination } = action.payload;
            state.cityDestinationValue = cityDestinationValue,
            state.cityDestination = cityDestination
        },
        changecityOrigin: (state, action)=>{
            const {  cityOriginValue, cityOrigin  } = action.payload;
            state.cityOriginValue = cityOriginValue,
            state.cityOrigin = cityOrigin
        },
        changedateSince: (state, action)=>{
            state.dateSince = action.payload
        },
        changedateUntil: (state, action)=>{
            state.dateUntil = action.payload
        },
        changeValidTrip: (state, action)=>{
            state.roundTrip = action.payload
        }

    }
})

export const {changecityDestination, changecityOrigin,changedateSince, changedateUntil,changeValidTrip} = ItinerarySelected.actions

export default ItinerarySelected.reducer