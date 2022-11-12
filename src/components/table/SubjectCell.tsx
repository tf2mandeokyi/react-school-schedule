import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { apply } from '../../redux/selectorSlice';
import { TablePosition } from '../../util/types';
import positionEquals from "../../util/positionEquals";
import { getClassStartingTime } from '../../util/timeutils';


interface SubjectCellProps {
    pos: TablePosition
}

interface CellDurationHM {
    start: number;
    end: number;
}

const SubjectCell : React.FC<SubjectCellProps> = (props) => {

    const { dotw, y } = props.pos;

    const scheduleData = useAppSelector((state) => state.scheduleData);
    const selectorPos = useAppSelector((state) => state.selectorPosition.pos);
    const currentDate = useAppSelector((state) => state.dateSlice);
    const dispatch = useAppDispatch();

    const [ additionalClass, setAdditionalClass ] = useState<string>('');
    const [ empty, setEmpty ] = useState<boolean>(false);
    const [ displayName, setDisplayName ] = useState<string>('');
    const [ duration, setDuration ] = useState<CellDurationHM>();


    const clickEvent = function() {
        dispatch(apply(props.pos));
    }


    // Class duration + subject name calculation
    useEffect(() => {
        if(scheduleData.state === 'empty') return;

        let { schedule, subjects, timeLengthInfo } = scheduleData.data;
        let daySchedule = schedule[dotw];
        if(daySchedule === null) return;

        let subject = subjects[daySchedule[y]]; 
        if(subject === undefined) {
            setEmpty(true);
            return;
        }

        let start = getClassStartingTime(scheduleData.data, y);
        setDuration({
            start,
            end: start + timeLengthInfo.classDuration
        })

        let { name, shortName } = subject;
        let displayName = shortName ?? name ?? '';
        setDisplayName(displayName);
    }, [ scheduleData, dotw, y ]);


    // Color apply
    useEffect(() => {
        if(!duration) return;

        let result = '';
        let { start, end } = duration;
        let { dotw: currentDotw, hm: currentHM } = currentDate;

        if(positionEquals(selectorPos, props.pos))
            result += ' selected-subject';
        if(currentDotw > dotw || (currentDotw === dotw && currentHM >= end))
            result += ' done-subject';
        else if(currentDotw === dotw && start <= currentHM && currentHM < end)
            result += ' doing-subject';

        setAdditionalClass(result);
    }, [ selectorPos, duration, currentDate, props.pos, dotw ]);


    return (
        <td 
            className={ empty ? `empty-subject-td` : `subject-td${additionalClass}` }
            onClick={ empty ? undefined : clickEvent }
        >
            { displayName }
        </td>
    );
};


const EmptySubjectCell : React.FC = () => {
    return <td></td>;
};


export { SubjectCell, EmptySubjectCell };