import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ScheduleData } from "../util/types";

type EmptySchdlDataState = { state: 'empty' };
type FetchedSchdlDataState = { state: 'fetched', data: ScheduleData }

const initialState = {
    state: 'empty'
} as (EmptySchdlDataState | FetchedSchdlDataState)

export const scheduleSlice = createSlice({
    name: 'schedule-data',
    initialState,
    reducers: {
        apply: (state, action: PayloadAction<ScheduleData>) => {
            state.state = 'fetched';
            (state as FetchedSchdlDataState).data = action.payload;
        }
    }
})

export const { apply } = scheduleSlice.actions;