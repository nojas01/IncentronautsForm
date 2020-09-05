import React, {
    useRef,
    useState,
} from 'react';
import './styles/App.css';
import {
    Col,
} from 'reactstrap';
import IncentronautsForm, {  FormInput } from './componensts/IncentronautsForm';
import Modal from './componensts/Modal';
import Logo from './componensts/Logo';

function App() {
    const incentronautsForm = useRef<HTMLFormElement>(null)
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const submitForm                       = async (formData: FormInput) => {
        setModalVisible(true);
        const response = await fetch('https://mockbin.org/request', {
                method:  'POST',
                mode:    'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:    JSON.stringify(formData),
            },
        );
        const responseJson = await  response.json();
        if (response.status === 200 && null !== incentronautsForm.current) {
            incentronautsForm.current.reset()
        }
        setModalVisible(false);
        return responseJson;
    };

    return (
        <div className={'container'}>
            <Col sm={6} className={'offset-sm-3'}>
            <Logo
                color={'#fe5000'}
            />
            <p className={'introText'}>
                Nu word je straks aangenomen als Incentronaut en ga je knallen bij de klant. Te gek! wel
                hebben we nog wat informatie van je nodig. Hiervoor willen we je vragen het volgende formulier in te vullen.
            </p>
            </Col>
            <Col sm={6} className={'offset-sm-3'}>
               <IncentronautsForm
                   submitForm={submitForm}
                   formRef={incentronautsForm}
               />
                {modalVisible &&
                    <Modal />
                }
            </Col>
        </div>
    );
}

export default App;


//
// ● Voorletters (verplicht)
// ● Tussenvoegsel
// ● Achternaam (verplicht)
// ● Postcode (verplicht, validatiecheck)
// ● Straatnaam (wordt opgehaald via een postcode check)
// ● Stad (wordt opgehaald via een postcodecheck)
// ● Huisnummer (verplicht, alleen nummers)
// ● E-mailadres (verplicht, validatie check)
