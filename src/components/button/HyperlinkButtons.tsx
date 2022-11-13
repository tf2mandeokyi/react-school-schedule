import React, { useEffect, useCallback, useState } from 'react';

import { useAppSelector } from '../../hooks';
import { getIndexFromHM } from '../../util/timeutils';
import HyperlinkButton from './HyperlinkButton';

import './HyperlinkButtons.css'


const HyperlinkButtons : React.FC = () => {

    const scheduleDataState = useAppSelector((state) => state.scheduleData);
    const currentDate = useAppSelector((state) => state.dateSlice);
    const selectorPos = useAppSelector((state) => state.selectorPosition.pos);

    const [ buttons, setButtons ] = useState<JSX.Element[]>();


    const makeButtonsFromId = useCallback((subjectId: string[] | string | undefined) => {
        if(scheduleDataState.state === 'empty' || !subjectId) return [];

        let { buttons, subjects } = scheduleDataState.data;
        let { links, displayArgs } = subjects[Array.isArray(subjectId) ? subjectId[0] : subjectId]; // TODO add multi-subject
        
        return buttons.map(({ display, color, customDisplay, noLinkDisplay, noLinkColor }, i) => {
            let link = links[i];

            if(!!link && link !== null) {
                if(customDisplay && displayArgs) {
                    const buttonDisplayArgs = displayArgs[i];
                    if(buttonDisplayArgs !== null) {
                        let newDisplay = customDisplay.replace(/\{(\d+)\}/g, function(m, argsIndex) {
                            return buttonDisplayArgs[argsIndex]
                        })
                        return <HyperlinkButton 
                            key={ i }
                            text={ newDisplay }
                            clickable={ true }
                            color={ color }
                            href={ link }
                        />
                    }
                }
                return <HyperlinkButton 
                    key={ i }
                    text={ display }
                    clickable={ true }
                    color={ color }
                    href={ link }
                />
            }
            else if(noLinkDisplay) {
                return <HyperlinkButton 
                    key={ i }
                    text={ noLinkDisplay }
                    clickable={ false }
                    color={ noLinkColor ?? color }
                />
            }
            else return <></>;
        });

    }, [ scheduleDataState ]);


    const getButtons = useCallback(() => {
        if(scheduleDataState.state === 'empty') return;

        let { schedule } = scheduleDataState.data;

        if(selectorPos) {
            let daySchedule = schedule[selectorPos.dotw];
            if(daySchedule === null) return;

            return makeButtonsFromId(daySchedule[selectorPos.y]);
        }
        else {
            let { dotw: currentDotw, hm: currentHM } = currentDate;
            let daySchedule = schedule[currentDotw];
            if(daySchedule === null) return;

            let y = getIndexFromHM(scheduleDataState.data, currentHM);
            return makeButtonsFromId(daySchedule[y]);
        }
    }, [ makeButtonsFromId, scheduleDataState, currentDate, selectorPos ]);


    useEffect(() => {
        setButtons(getButtons());

    }, [ getButtons ]);

    return (
        <div className="hyperlink-buttons">{ buttons }</div>
    );
};

export default HyperlinkButtons;