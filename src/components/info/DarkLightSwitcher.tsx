import React from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';

import { toggle } from '../../redux/darkLightSlice';

import './DarkLightSwitcher.css'


const DarkLightSwitcher : React.FC = () => {

    const darkLightMode = useAppSelector((state) => state.darkLightMode.mode);
    const dispatch = useAppDispatch();

    return (
        <div className="dark-light-switcher">
            <span className="dark-light-tooltiptext">{
                darkLightMode === 'dark' ?
                '클릭하시면 밝은 모드로 전환됩니다.' : 
                '클릭하시면 어두운 모드로 전환됩니다.'
            }</span>
            <span className="dark-light-button" onClick={ () => dispatch(toggle()) }>
                <i 
                    className={ `fas fa-${darkLightMode === 'dark' ? 'moon' : 'sun'}` }
                    style={{ fontSize: '30px' }}
                />
            </span>
        </div>
    );
};

export default DarkLightSwitcher;