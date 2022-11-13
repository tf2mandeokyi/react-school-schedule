import React, { useState, useEffect, useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { reset } from '../../redux/selectorSlice';
import { getClassStartingTime, getIndexFromHM } from '../../util/timeutils';
import { ScheduleData } from '../../util/types';

import './SubjectMessage.css'


const timeLeftDisplay = function(name: string, hmLeft: number) : JSX.Element {
    return <>
        <div>선택한 과목 <span className="current-subject">{name}</span>까지</div>
        <div>
            {Math.floor(hmLeft / 60) === 0 ? '' : Math.floor(hmLeft / 60) + '시간 '}
            {hmLeft % 60 === 0 ? '' : hmLeft % 60 + '분 '}남았습니다.
        </div>
    </>
}


const SubjectMessage : React.FC = () => {

    const scheduleDataState = useAppSelector((state) => state.scheduleData);
    const { dotw: currentDotw, hm: currentHM } = useAppSelector((state) => state.dateSlice);
    const selectorPos = useAppSelector((state) => state.selectorPosition.pos);

    const dispatch = useAppDispatch();

    const [ message, setMessage ] = useState<JSX.Element>();


    const getMessageFromSelection : (data: ScheduleData) => JSX.Element | undefined = useCallback((data) => {
        if(!selectorPos) return;

        let { subjects, schedule } = data;
        let { classStart, lunchIndex, classDuration, breakDuration, lunchDuration } = data.timeLengthInfo;

        let daySchedule = schedule[selectorPos.dotw];
        if(daySchedule === null) return;

        let currentIndex = getIndexFromHM(data, currentHM);
        let subjectId = daySchedule[selectorPos.y]
        let subject = subjects[Array.isArray(subjectId) ? subjectId[0] : subjectId]; // TODO add multi-subject

        if(currentDotw === selectorPos.dotw) {
            if(currentIndex === selectorPos.y) {
                let lunchStart = lunchIndex * (classDuration + breakDuration) + classStart;
                let startTime = getClassStartingTime(data, currentIndex);
                if(currentHM >= lunchStart && currentHM < lunchStart + lunchDuration) {
                    return timeLeftDisplay(subject.name ?? '', getClassStartingTime(data, selectorPos.y) - currentHM);
                }
                else if(currentHM < startTime) {
                    return timeLeftDisplay(subject.name ?? '', getClassStartingTime(data, selectorPos.y) - currentHM);
                }
                else {
                    dispatch(reset());
                    return;
                }
            }
            else if(selectorPos.y < currentIndex) {
                return <>
                    <div>선택한 과목 <span className="current-subject">{subject.name}</span>까지</div>
                    <div>1주일 남았습니다.</div>
                </>
            }
            else {
                return timeLeftDisplay(subject.name ?? '', getClassStartingTime(data, selectorPos.y) - currentHM);
            }
        }
        else {
            let delta = (((selectorPos.dotw - currentDotw) % 7) + 7) % 7;
            return <>
                <div>선택한 과목 <span className="current-subject">{subject.name}</span>까지</div>
                <div>{delta}일 남았습니다.</div>
            </>
        }
    }, [ currentDotw, currentHM, selectorPos, dispatch ]);


    const getMessageFromCurrentHM : (data: ScheduleData) => JSX.Element = useCallback((data) => {

        let { subjects, schedule } = data;
        let { morningStart, morningEnd, classStart, lunchIndex, classDuration, breakDuration, lunchDuration }
            = data.timeLengthInfo;
        
        let todaySchedule = schedule[currentDotw];

        if(todaySchedule === null) {
            if(currentDotw === 0 || currentDotw === 6) { // Weekends
                return <>
                    오늘은 주말입니다.
                </>
            }
            else {
                return <>
                    오늘은 수업이 없습니다.
                </>
            }
        }
        if(currentHM < morningStart) { // Early mornings
            return <>
                아직은 아침 조회 시간이 아닙니다.
            </>
        }
        if(currentHM >= morningStart && currentHM < morningEnd) { // Morning
            return <>
                지금은 <span className="current-subject">아침 조회 시간</span>입니다.
            </>
        }

        let currentIndex = getIndexFromHM(data, currentHM);
        let hmSinceStart = currentHM - classStart;
        let lunchStart = lunchIndex * (classDuration + breakDuration);
        
        if(lunchStart <= hmSinceStart && hmSinceStart < lunchStart + lunchDuration) { // Lunch time
            return <>
                지금은 <span className="current-subject">점심시간</span>입니다.
            </>
        }
        else { // Not lunch time
            if(hmSinceStart >= (lunchStart + lunchDuration)) hmSinceStart -= lunchDuration;
            if(currentIndex >= todaySchedule.length) {
                return <>
                    오늘 수업은 다 끝났습니다.
                </>
            }

            let subjectId = todaySchedule[currentIndex];
            let subject = subjects[Array.isArray(subjectId) ? subjectId[0] : subjectId]; // TODO add multi-subject
            if(hmSinceStart % (classDuration + breakDuration) < breakDuration) { // Break time
                return <>
                    지금은 <span className="current-subject">쉬는시간</span>입니다.<br/>
                    <span className="subject-submessage">다음 과목: {subject.name}</span>
                </>
            }
            else { // Class time
                return <>
                    현재 과목은 <span className="current-subject">{subject.name}</span>입니다.
                </>
            }
        }
    }, [ currentDotw, currentHM ]);


    useEffect(() => {
        if(scheduleDataState.state === 'empty') return;

        let { data } = scheduleDataState;
        let newMessage = getMessageFromSelection(data) ?? getMessageFromCurrentHM(data);
        setMessage(newMessage)

    }, [ getMessageFromSelection, getMessageFromCurrentHM, scheduleDataState ])

    return (
        <div className="subject-message">
            { message }
        </div>
    );
};

export default SubjectMessage;