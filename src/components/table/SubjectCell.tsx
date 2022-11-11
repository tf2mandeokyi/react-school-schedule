import React from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { apply } from '../../redux/selectorSlice';
import { TablePosition } from '../../util/types';
import positionEquals from "../../util/positionEquals";

interface SubjectCellProps {
    pos: TablePosition

    // This might be unnecessary, considering 'dotw' and 'y' property
    // already exists in SubjectCellProps, since every cell can fetch
    // their subject names from the schedule data.
    // But this is to reduce lag on every minute refresh, and so is
    // EmptySubjectCell written below this FC.
    name: string;
}

const SubjectCell : React.FC<SubjectCellProps> = (props) => {

    const selectorPos = useAppSelector((state) => state.selectorPosition.pos);
    const dispatch = useAppDispatch();

    const clickEvent = function() {
        dispatch(apply(props.pos));
    }

    return (
        <td className="subject-td" onClick={ clickEvent }>
            <div className={
                "subject"
                + (positionEquals(selectorPos, props.pos) ? ' selected-subject' : '')
            }>{ props.name }</div>
        </td>
    );
};


const EmptySubjectCell : React.FC = () => {
    return <td></td>;
};


export { SubjectCell, EmptySubjectCell };