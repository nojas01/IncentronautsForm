import React, { ReactElement } from 'react';
import { Button } from 'reactstrap';

interface ApiResponseMessage {
    handleButtonPress: () => void;
    color: string;
    message: string;
    buttonText: string;
}

const ApiResponseMessage = ({handleButtonPress, color, buttonText, message}: ApiResponseMessage): ReactElement => (
    <div style={{backgroundColor: color, color: 'white', alignItems: 'center', justifyContent: 'center', padding: '1rem'}}>
        <p>
            {message}
        </p>
        <Button onClick={handleButtonPress}>
            {buttonText}
        </Button>
    </div>
);

export default ApiResponseMessage;
