import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type DarkLightString = 'dark' | 'light';
type DarkLightState = { mode: DarkLightString };

const initialState = { mode: localStorage.getItem('dark-light-mode') as DarkLightString ?? 'dark' } as DarkLightState;

const applyDarkTheme = function(mode: DarkLightString) {
    localStorage.setItem('dark-light-mode', mode);

    let { classList } = document.getElementsByTagName('html')[0];
    if(mode === 'dark') {
        classList.add('dark-theme');
    }
    else if(mode === 'light') {
        classList.remove('dark-theme');
    }
}

export const darkLightSlice = createSlice({
    name: 'dark-light-mode',
    initialState,
    reducers: {
        apply: (state, action: PayloadAction<DarkLightString>) => {
            state.mode = action.payload;
            applyDarkTheme(state.mode);
        },
        toggle: (state) => {
            state.mode = state.mode === 'dark' ? 'light' : 'dark';
            applyDarkTheme(state.mode);
        }
    }
})

export const checkDarkTheme = function() {
    let mode = localStorage.getItem('dark-light-mode') as DarkLightString;
    applyDarkTheme(mode ?? 'dark');
}

export const { toggle } = darkLightSlice.actions;