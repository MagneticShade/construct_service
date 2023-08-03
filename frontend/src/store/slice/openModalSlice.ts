import { createSlice } from '@reduxjs/toolkit'

export interface openState {
  value: boolean
}

const initialState: openState = {
  value: true,
}

export const openModalSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setOpenModal: (state):void => {
        if(state.value){
            state.value = false
        }else{
            state.value = true
        }
    },
  },
})

// Action creators are generated for each case reducer function
export const { setOpenModal } = openModalSlice.actions

export default openModalSlice.reducer