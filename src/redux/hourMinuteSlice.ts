import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getHourMinute } from "../util/timeutils";


type SelectorState = {
    value: number;
}

const initialState = { value: getHourMinute(new Date()) } as SelectorState;

export const hourMinuteSlice = createSlice({
    name: 'hourminute',
    initialState,
    reducers: {
        apply: (state, action: PayloadAction<Date>) => {
            state.value = getHourMinute(action.payload);
        }
    }
})

export const { apply } = hourMinuteSlice.actions;