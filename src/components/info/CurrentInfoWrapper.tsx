import React from 'react';
import HyperlinkButton from '../button/HyperlinkButton';
import HyperlinkButtons from '../button/HyperlinkButtons';
import SubjectMessage from './SubjectMessage';
import OtherButtonsWrapper from './OtherButtonsWrapper';
import Timer from './Timer';

import './CurrentInfoWrapper.css'

const CurrentInfoWrapper : React.FC<{}> = () => {
    return (<>
        <Timer />
            <OtherButtonsWrapper />
        <div className="info-wrapper">
            <SubjectMessage />
            <HyperlinkButtons>
                <HyperlinkButton />
                <HyperlinkButton />
            </HyperlinkButtons>
        </div>
    </>);
};

export default CurrentInfoWrapper;