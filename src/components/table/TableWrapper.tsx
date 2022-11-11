import React from 'react';
import ScheduleTable from './ScheduleTable';

import './TableWrapper.css'

const TableWrapper : React.FC<{}> = () => {
    return (
        <div className="table-wrapper">
            <ScheduleTable />
        </div>
    );
};

export default TableWrapper;