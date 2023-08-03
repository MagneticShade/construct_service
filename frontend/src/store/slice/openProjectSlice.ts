import { createSlice } from '@reduxjs/toolkit'

export interface openState {
  value: boolean
}

const initialState: openState = {
  value: true,
}

export const openProjectlSlice = createSlice({
  name: 'openProject',
  initialState,
  reducers: {
    setOpenProject: (state, action):void => {
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
export const { setOpenProject } = openProjectlSlice.actions

export default openProjectlSlice.reducer