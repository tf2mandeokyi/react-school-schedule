import { configureStore } from '@reduxjs/toolkit'
import { darkLightSlice } from './darkLightSlice'
import { dateSlice } from './dateSlice';
import { scheduleSlice } from './scheduleSlice'
import { selectorSlice } from './selectorSlice';

export const store = configureStore({
    reducer: {
        scheduleData: scheduleSlice.reducer,
        darkLightMode: darkLightSlice.reducer,
        selectorPosition: selectorSlice.reducer,
        dateSlice: dateSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;