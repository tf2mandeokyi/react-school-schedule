import { configureStore } from '@reduxjs/toolkit'
import { darkLightSlice } from './darkLightSlice'
import { hourMinuteSlice } from './hourMinuteSlice';
import { scheduleSlice } from './scheduleSlice'
import { selectorSlice } from './selectorSlice';

export const store = configureStore({
    reducer: {
        scheduleData: scheduleSlice.reducer,
        darkLightMode: darkLightSlice.reducer,
        selectorPosition: selectorSlice.reducer,
        currentHourMinute: hourMinuteSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;