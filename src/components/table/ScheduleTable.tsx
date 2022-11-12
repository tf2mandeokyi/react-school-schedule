import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';

import { SubjectCell } from './SubjectCell';

import './ScheduleTable.css'


const ScheduleTable : React.FC = () => {

    const [ tableContent, setTableContent ] = useState<JSX.Element>();
    const scheduleDataState = useAppSelector((state) => state.scheduleData);

    useEffect(() => {
        if(tableContent) return;

        if(scheduleDataState.state === 'empty') return;
        const { schedule } = scheduleDataState.data;

        let dotwRow = <tr>{ 
            ['일', '월', '화', '수', '목', '금', '토']
                .map((dotwName, dotw) =>
                    schedule[dotw] !== null ?
                        <td key={ dotw } className='dotw'>{ dotwName }</td> :
                        undefined
                )
                .filter(e => !!e)
        }</tr>;

        let subjectRows : JSX.Element[] = [];
        
        let longest = 0;
        for(let daySchedule of schedule) {
            if(daySchedule === null) continue;
            if(daySchedule.length > longest) longest = daySchedule.length;
        }

        for(let y = 0; y < longest; y++) {
            subjectRows.push(<tr key={ y }>{
                schedule.map((_, dotw) =>
                    schedule[dotw] !== null ?
                        <SubjectCell pos={{ dotw, y }} key={`${dotw},${y}`} /> :
                        undefined
                ).filter(e => !!e)
            }</tr>);
        }

        setTableContent(<>{ dotwRow }{ subjectRows }</>)

    }, [ tableContent, scheduleDataState ]);

    return (
        <table className="schedule-table">
            <tbody>
                { tableContent }
            </tbody>
        </table>
    );
};

export default ScheduleTable;