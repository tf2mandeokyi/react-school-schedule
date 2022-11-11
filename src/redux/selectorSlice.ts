import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TablePosition } from "../util/types";


type SelectorState = {
    pos: TablePosition | undefined;
}

const initialState = { pos: undefined } as SelectorState;

export const selectorSlice = createSlice({
    name: 'selector-position',
    initialState,
    reducers: {
        apply: (state, action: PayloadAction<TablePosition>) => {
            state.pos = action.payload;
        },
        reset: (state) => {
            state.pos = undefined;
        }
    }
})

export const { apply, reset } = selectorSlice.actions;