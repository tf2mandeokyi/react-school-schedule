import React, { useState } from 'react';


interface HyperlinkButtonProps {
    text: string;
    color: string;
    href?: string;
    clickable: boolean;
}

const HyperlinkButton : React.FC<HyperlinkButtonProps> = (props) => {

    const [ hover, setHover ] = useState<boolean>(false);

    return (
        <div 
            className="hyperlink-button" 
            style={{
                border: `1px solid ${props.color}`,
                backgroundColor: hover ? props.color : '',
                color: props.clickable ? '' : 'var(--unavailable-color)',
                cursor: props.clickable ? 'pointer' : 'not-allowed'
            }}
            onMouseEnter={ () => setHover(props.clickable && true) }
            onMouseLeave={ () => setHover(false) }
            onClick={ () => window.open(props.href, '_blank')?.focus() }
        >
            { props.text }
        </div>
    );
};

export default HyperlinkButton;