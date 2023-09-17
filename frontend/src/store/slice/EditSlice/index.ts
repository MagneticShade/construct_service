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
}

const initialState: openState = {
    templates: [],
};

export const editSlice = createSlice({
    name: "edit",
    initialState,
    reducers: {
        setTemp(state, action) {
            state.templates = action.payload
        },
    },
});

export const { setTemp } = editSlice.actions;
export default editSlice.reducer;
