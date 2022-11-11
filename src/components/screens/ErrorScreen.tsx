import React from 'react';

interface ErrorScreenProps {
    message: string;
}

const ErrorScreen : React.FC<ErrorScreenProps> = (props) => {
    return (
        <div>
            { props.message }
        </div>
    );
};

export default ErrorScreen;