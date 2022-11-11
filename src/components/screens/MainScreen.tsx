import React from 'react';
import CurrentInfoWrapper from '../info/CurrentInfoWrapper';
import TableWrapper from '../table/TableWrapper';

import './MainScreen.css'

const MainScreen : React.FC<{}> = () => {
    return (
        <div className="main">
            <TableWrapper />
            <CurrentInfoWrapper />
        </div>
    );
};

export default MainScreen;