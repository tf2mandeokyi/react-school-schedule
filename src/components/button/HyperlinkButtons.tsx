import React from 'react';

interface HyperlinkButtonsProp {
    children: React.ReactNode
}

const HyperlinkButtons : React.FC<HyperlinkButtonsProp> = (props) => {
    return (
        <div className="hyperlink-buttons">
            { props.children }
        </div>
    );
};

export default HyperlinkButtons;