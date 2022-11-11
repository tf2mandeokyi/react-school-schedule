import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';

import { SubjectCell, EmptySubjectCell } from './SubjectCell';
import { apply, reset } from '../../redux/selectorSlice';

import './ScheduleTable.css'
import stringFallback from '../../util/stringFallback';

const ScheduleTable : React.FC<{}> = () => {

    const [ tableContent, setTableContent ] = useState<JSX.Element>();
    const scheduleDataState = useAppSelector((state) => state.scheduleData);

    useEffect(() => {
        if(tableContent) return;

        if(scheduleDataState.state === 'empty') return;
        const { subjects, schedule } = scheduleDataState.data;
        console.log(subjects, schedule)

        let dotwRow = <tr>
            { ['월', '화', '수', '목', '금'].map(dotw => <td className='dotw'>{ dotw }</td>) }
        </tr>;

        let subjectRows : JSX.Element[] = [];
        for(let y = 0; y < schedule[0].length; y++) {
            let subjectRow = <tr>{
                schedule.map((daySubjects, dotw) => {
                    let subject = subjects[daySubjects[y]]; 
                    if(subject === undefined) return <EmptySubjectCell />;

                    let { name, short_name } = subject;
                    let displayName = stringFallback('', short_name, name);
                    return <SubjectCell pos={{ dotw, y }} name={ displayName }/>
                })
            }</tr>
            subjectRows.push(subjectRow);
        }

        setTableContent(<>{ dotwRow }{ subjectRows }</>)

    }, [ tableContent, scheduleDataState ]);

    return (
        <table className="schedule-table">{ tableContent }</table>
    );
};

export default ScheduleTable;