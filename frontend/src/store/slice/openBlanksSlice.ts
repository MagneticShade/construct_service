import { createSlice } from '@reduxjs/toolkit'

export interface openState {
  value: boolean
}

const initialState: openState = {
  value: true,
}

export const openBlankslSlice = createSlice({
  name: 'openBlanks',
  initialState,
  reducers: {
    setOpenBlanks: (state, action):void => {
      state.value = action.payload
        if(state.value){
            state.value = false
        }else{
            state.value = true
        }
    },
  },
})

// Action creators are generated for each case reducer function
export const { setOpenBlanks } = openBlankslSlice.actions

export default openBlankslSlice.reducer