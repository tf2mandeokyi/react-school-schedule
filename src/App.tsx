import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import LoadingScreen from './components/screens/LoadingScreen';
import MainScreen from './components/screens/MainScreen';
import ErrorScreen from './components/screens/ErrorScreen';
import { apply } from './redux/scheduleSlice';
import { useAppDispatch } from './hooks';
import { ScheduleData } from './util/types';


const fetchSchedule = async function(classId: string) : Promise<ScheduleData> {
    let dataUrl = process.env['REACT_APP_SCHEDULE_DATA_URL'];
    let url = new URL(`./${classId}.json`, dataUrl).href;
    let response = await fetch(url);
    return response.json();
}


const checkDarkTheme = function() {
    let mode = localStorage.getItem('dark-light-mode');
    if(mode === null) {
        localStorage.setItem('dark-light-mode', 'dark');
        mode = 'dark';
    }

    let { classList } = document.getElementsByTagName('html')[0];
    if(mode === 'dark') {
        classList.add('dark-theme');
    }
    else if(mode === 'light') {
        classList.remove('dark-theme');
    }
}


const App : React.FC<{}> = () => {

    const useEffectFired = useRef<boolean>(false);

    const [ ready, setReady ] = useState<boolean>(false);
    const [ errorMessage, setErrorMessage ] = useState<string>();
    const [ searchParams ] = useSearchParams();
    const dispatch = useAppDispatch();


    const fetchData = useCallback(async () => {
        let classId = searchParams.get('classId');
        if(!classId || classId === null) {
            setErrorMessage('"classId" parameter required in URL');
            return;
        }

        try {
            let data = await fetchSchedule(classId);
            dispatch(apply(data));
            setReady(true);
        } catch(e) {
            if(e instanceof SyntaxError) setErrorMessage('Invalid "classId"!');
            console.error(e);
        }
    }, [ dispatch, searchParams ]);


    useEffect(() => {
        if(useEffectFired.current) return;
        useEffectFired.current = true;
        fetchData();
        checkDarkTheme();
    }, [ useEffectFired, fetchData ]);


    if(errorMessage) {
        return <ErrorScreen message={ errorMessage }/>
    }
    else if(ready) {
        return <MainScreen />
    }
    else {
        return <LoadingScreen />
    }
};

export default App;