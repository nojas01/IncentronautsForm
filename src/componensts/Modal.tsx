import React, {
    ReactElement,
    ReactNode,
} from 'react';
import { Spinner } from 'reactstrap';
import '../styles/Modal.css'

interface ModalProps {
    children?: ReactNode;
}

function Modal({children}: ModalProps):ReactElement {

    return (
        <div className={'modalContainer'}>
            {children ?
                children :
                <Spinner className={'spinner'}/>
            }
        </div>
    )
}

export default Modal;
