import React from 'react';
import './App.css';
import {
    Col,
    Button,
    Form,
    FormGroup,
    Label,
} from 'reactstrap';
import { useForm } from 'react-hook-form';

interface FormInput {
    initials: string;
    preposition: string;
    lastName: string;
    zipcode: string;
    street: string;
    city: string;
    email: string;
}

function App() {
    const {register, errors, handleSubmit} = useForm<FormInput>();
    const submitForm               = (formData: FormInput) => {
        console.log('foobar');
    };

    console.log('errors', errors);

    return (
        <div className={'container'}>
            <Col sm={6} className={'offset-sm-3'}>
                <Form onSubmit={handleSubmit(submitForm)}>
                    <FormGroup row>
                        <Label for="initials" sm={3}>Initialen</Label>
                        <Col sm={9}>
                            <input
                                className={'w-100'}
                                type="text"
                                name="initials"
                                id="initials"
                                placeholder="Initialen"
                                ref={register({required: 'Dit veld is verplicht'})}
                            />
                            {errors.initials &&
                            <span className={'errorText'}>{errors.initials.message}</span>
                            }
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="preposition" sm={3}>Tussenvoegsel</Label>
                        <Col sm={9}>
                            <input
                                className={'w-100'}
                                type="text"
                                name="preposition"
                                id="preposition"
                                placeholder="Tussenvoegsel"
                                ref={register({required: false})}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="lastName" sm={3}>Achternaam</Label>
                        <Col sm={9}>
                            <input
                                className={'w-100'}
                                type="text"
                                name="lastName"
                                id="lastName"
                                placeholder="Achternaam"
                                ref={register({required: 'Dit veld is verplicht'})}
                            />
                            {errors.lastName &&
                            <span className={'errorText'}>{errors.lastName.message}</span>
                            }
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="zipcode" sm={3}>Postcode</Label>
                        <Col sm={9}>
                            <input
                                className={'w-100'}
                                type="text"
                                name="zipcode"
                                id="zipcode"
                                placeholder="Postcode (bv: 1334AB)"
                                ref={register({required: 'Dit veld is verplicht'})}
                            />
                            {errors.zipcode &&
                            <span className={'errorText'}>{errors.zipcode.message}</span>
                            }
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="street" sm={3}>Straatnaam</Label>
                        <Col sm={9}>
                            <input
                                className={'w-100'}
                                type="text"
                                name="street"
                                id="street"
                                placeholder="Straatnaam"
                                ref={register({required: 'Dit veld is verplicht'})}
                            />
                            {errors.street &&
                            <span className={'errorText'}>{errors.street.message}</span>
                            }
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="city" sm={3}>Stad</Label>
                        <Col sm={9}>
                            <input
                                className={'w-100'}
                                type="text"
                                name="city"
                                id="city"
                                placeholder="Stad"
                                ref={register({required: 'Dit veld is verplicht'})}
                            />
                            {errors.city &&
                            <span className={'errorText'}>{errors.city.message}</span>
                            }
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="email" sm={3}>Email</Label>
                        <Col sm={9}>
                            <input
                                className={'w-100'}
                                type="email"
                                name="email"
                                id="email"
                                placeholder="email adres"
                                ref={register({
                                    required: 'Dit veld is verplicht',
                                    pattern:  {
                                        value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                        message: 'Ongeldig email adres',
                                    },
                                })}
                            />
                            {errors.email &&
                                <span className={'errorText'}>{errors.email.message}</span>
                            }
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                            <Button className={'w-100 buttonColor'}>Submit</Button>
                    </FormGroup>
                </Form>
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
