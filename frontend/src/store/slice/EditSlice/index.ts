import { createSlice } from "@reduxjs/toolkit";

export interface Template {
    id: string | "";
    name: string;
    local_id: string;
    modules: string[] | null;
    order: string | null;
    background: string | null;
    textAlign: string | null;
}

export interface openState {
    templates: Template[] | '';
    activeId:string;
    activeIndex:number
}

const initialState: openState = {
    templates: [],
    activeId:"",
    activeIndex:0
};

export const editSlice = createSlice({
    name: "edit",
    initialState,
    reducers: {
        setTemp(state, action) {
            state.templates = action.payload
        },
        setActiveId(state, action) {
            state.activeId = action.payload
        },
        setActiveIndexEdit(state, action) {
            state.activeIndex = action.payload
        },
    },
});

export const { setTemp, setActiveId, setActiveIndexEdit} = editSlice.actions;
export default editSlice.reducer;
