import React, { ReactElement } from 'react';
import { Spinner } from 'reactstrap';
import '../styles/Modal.css'


function Modal():ReactElement {

    return (
        <div className={'modalContainer'}>
            <Spinner className={'spinner'} />
        </div>
    )
}

export default Modal;
