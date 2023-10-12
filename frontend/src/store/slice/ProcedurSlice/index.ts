import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface openState {
    color: string;
    background: string;
    count: number;
    blur: number;
    speed: number;
    size: number;
}

const initialState: openState = {
    color: "white",
    background: "gray",
    count: 3,
    blur: 30,
    speed: 0.05,
    size: 10,
};

export const protcedurSlice = createSlice({
    name: "index",
    initialState,
    reducers: {
        setColor(state, action: PayloadAction<string>) {
            state.color = action.payload;
        },
        setBackground(state, action: PayloadAction<string>) {
            state.background = action.payload;
        },
        setCount(state, action: PayloadAction<number>) {
            state.count = action.payload;
        },
        setBlur(state, action: PayloadAction<number>) {
            state.blur = action.payload;
        },
        setSpeed(state, action: PayloadAction<number>) {
            state.speed = action.payload;
        },
        setSize(state, action: PayloadAction<number>){
            state.size = action.payload;
        }
    },
});

export const { setColor, setBackground, setCount, setBlur, setSpeed, setSize } =
    protcedurSlice.actions;
export default protcedurSlice.reducer;
