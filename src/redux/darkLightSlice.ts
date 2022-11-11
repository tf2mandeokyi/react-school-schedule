import { createSlice } from "@reduxjs/toolkit";

type DarkLightString = 'dark' | 'light';
type DarkLightState = { mode: DarkLightString };

const initialState = { mode: 'dark' } as DarkLightState;

const applyDarkTheme = function(mode: DarkLightString) {
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
        toggle: (state) => {
            state.mode = state.mode === 'dark' ? 'light' : 'dark';
            localStorage.setItem('dark-light-mode', state.mode);
            applyDarkTheme(state.mode);
        }
    }
})

export const checkDarkTheme = function() {
    let mode = localStorage.getItem('dark-light-mode') as DarkLightString;
    if(mode === null) {
        localStorage.setItem('dark-light-mode', 'dark');
        mode = 'dark';
    }
    applyDarkTheme(mode);
}

export const { toggle } = darkLightSlice.actions;