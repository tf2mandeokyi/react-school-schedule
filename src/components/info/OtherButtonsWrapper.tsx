import React from 'react';
import DarkLightSwitcher from './DarkLightSwitcher';

import './OtherButtonsWrapper.css'

const OtherButtonsWrapper : React.FC<{}> = () => {
    return (
        <div className="other-buttons-wrapper">
            <DarkLightSwitcher />
        </div>
    );
};

export default OtherButtonsWrapper;