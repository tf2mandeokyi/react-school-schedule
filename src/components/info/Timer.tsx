import React, { useEffect, useCallback, useState, useRef } from 'react';

import { apply } from '../../redux/hourMinuteSlice';
import { useAppDispatch } from '../../redux/hooks';

import './Timer.css'


const Timer : React.FC<{}> = () => {

    const loopIdRef = useRef<NodeJS.Timer>();
    const prevMinuteRef = useRef<number>(-1);

    const [ timerText, setTimerText ] = useState<string>();
    const dispatch = useAppDispatch();


    const updateTimerText = useCallback((date: Date) => {
        setTimerText(
            `${date.getFullYear()}년 ` +
            `${date.getMonth()+1}월 ` +
            `${date.getDate()}일 ` +
            `(${['일', '월', '화', '수', '목', '금', '토'][date.getDay()]}) ` +
            `${('00' + date.getHours()).slice(-2)}:` +
            `${('00' + date.getMinutes()).slice(-2)}:` +
            `${('00' + date.getSeconds()).slice(-2)}`
        )
    }, []);


    const refreshEveryMinute = useCallback((date: Date) => {
        if(date.getMinutes() !== prevMinuteRef.current) {
            dispatch(apply(date));
            prevMinuteRef.current = date.getMinutes();
        }
    }, [ dispatch ]);


    const loop = useCallback(() => {
        let now = new Date(new Date().getTime() * 1);
        updateTimerText(now);
        refreshEveryMinute(now);
    }, [ updateTimerText, refreshEveryMinute ])


    useEffect(() => {
        loop();
        loopIdRef.current = setInterval(loop, 1000);
        return () => clearInterval(loopIdRef.current);
    }, [ loop ])


    return (
        <div className="timer">{ timerText }</div>
    );
};

export default Timer;