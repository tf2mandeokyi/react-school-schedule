import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getHourMinute } from "../util/timeutils";


type CurrentDateState = {
    hm: number;
    dotw: number;
}

const initialState = { 
    hm: getHourMinute(new Date()),
    dotw: new Date().getDay()
} as CurrentDateState;

export const dateSlice = createSlice({
    name: 'hourminute',
    initialState,
    reducers: {
        apply: (state, action: PayloadAction<CurrentDateState>) => {
            state.hm = action.payload.hm;
            state.dotw = action.payload.dotw;
        }
    }
})

export const { apply } = dateSlice.actions;