import { createSlice } from "@reduxjs/toolkit";

interface Module {
    id: string;
    background: string;
    header: string;
    subHeader: string;
    textAlign: string;
    order: string;
    textColor: string;
}

interface Template {
    id: string;
    name: string;
    local_id: string;
    module: Module[];
    order: string;
    background: string;
    textAlign?: string;
}

export interface openState {
    template: Template;
}

const initialState: openState = {
    template: {
        id: "0",
        name: "Hello World",
        local_id: "0",
        module: [
            {
                id: "0",
                background: "#fff",
                header: "mini hello world",
                subHeader: "hi i am betsy",
                textAlign: "center",
                order: "0",
                textColor: "#abf",
            },
            {
                id: "1",
                background: "#fff",
                header: "я крутой",
                subHeader: "я маленький крутой",
                textAlign: "center",
                order: "1",
                textColor: "#abf",
            },
        ],
        order: "0",
        background: "#333",
        textAlign: "center",
    },
};

export const yourSiteSlice = createSlice({
    name: "yourSite",
    initialState,
    reducers: {},
});

export default yourSiteSlice.reducer;
