import React from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { reset } from '../../redux/selectorSlice';

import './GoBackButton.css'


const GoBackButton : React.FC = () => {

    const selectorPos = useAppSelector((state) => state.selectorPosition.pos)
    const dispatch = useAppDispatch()

    return (
        selectorPos ? 
        <div className="go-back-button" onClick={() => dispatch(reset())}>
            돌아가기
        </div> : <></>
    );
};

export default GoBackButton;