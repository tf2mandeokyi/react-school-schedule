import React from 'react';
import GoBackButton from '../button/GoBackButton';

import HyperlinkButtons from '../button/HyperlinkButtons';
import DarkLightSwitcher from '../info/DarkLightSwitcher';
import SubjectMessage from '../info/SubjectMessage';
import Timer from '../info/Timer';
import ScheduleTable from '../table/ScheduleTable';

import './MainScreen.css'


const MainScreen : React.FC = () => {
    return (<>
        <div className="main">
            <div className="table-wrapper">
                <ScheduleTable />
            </div>
            <div className="info-wrapper">
                <Timer />
                <GoBackButton />
                <div className="message-wrapper">
                    <SubjectMessage /><br/>
                    <HyperlinkButtons />
                </div>
            </div>
        </div>
        <div className="other-buttons-wrapper">
            <DarkLightSwitcher />
        </div>
    </>);
};

export default MainScreen;