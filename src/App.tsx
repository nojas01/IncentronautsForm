import React, {
    ReactElement,
    useRef,
    useState,
} from 'react';
import './styles/App.css';
import {
    Col,
} from 'reactstrap';
import IncentronautsForm, { FormInput } from './componensts/IncentronautsForm';
import Modal from './componensts/Modal';
import Logo from './componensts/Logo';
import ApiResponseMessage from './componensts/ApiResponseMessage';


function App(): ReactElement {
    const incentronautsForm                = useRef<HTMLFormElement>(null);
    const [modalVisible, setModalVisible]  = useState<boolean>(false);
    const [formSentToApi, setFormSentToApi] = useState<boolean>(false);
    const [apiError, setApiError]          = useState<boolean>(false);

    const submitForm = (formData: FormInput) => {
        setModalVisible(true);
        fetch('https://mockbin.org/request', {
                method:  'POST',
                mode:    'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:    JSON.stringify(formData),
            },
        ).then((response) => {
            if (!response.ok) {
                throw new Error('Api request failed');
            }
            setFormSentToApi(true);
            return;
        }).catch(error => {
            console.log('error', error);
            setApiError(true);
        });
    };

    const closeModal = () => {
        // if error don't reset the form && Check if the ref exists.
        if (!apiError && null !== incentronautsForm.current) {
            incentronautsForm.current.reset();
        }
        // reset modal props
        setApiError(false);
        setFormSentToApi(false);
        setModalVisible(false);
    };

    return (
        <div className={'container'}>
            <Col sm={6} className={'offset-sm-3'}>
                <Logo
                    color={'#fe5000'}
                />
                <p className={'introText'}>
                    Nu word je straks aangenomen als Incentronaut en ga je knallen bij de klant. Te gek! wel
                    hebben we nog wat informatie van je nodig. Hiervoor willen we je vragen het volgende formulier in te
                    vullen.
                </p>
            </Col>
            <Col sm={6} className={'offset-sm-3'}>
                <IncentronautsForm
                    submitForm={submitForm}
                    formRef={incentronautsForm}
                />
                {modalVisible &&
                <Modal>
                    {formSentToApi &&
                        <ApiResponseMessage
                            message={'We hebben je formulier ontvangen. We komen zo spoedig mogelijk bij je terug'}
                            buttonText={'Klik hier om terug te gaan'}
                            color={'#fe5000'}
                            handleButtonPress={closeModal}
                        />
                    }
                    {apiError &&
                        <ApiResponseMessage
                            message={'Oeps er ging iets mis, probeer het later opnieuw'}
                            buttonText={'Klik hier om terug te gaan'}
                            color={'red'}
                            handleButtonPress={closeModal}
                        />
                    }
                </Modal>
                }
            </Col>
        </div>
    );
}

export default App;
