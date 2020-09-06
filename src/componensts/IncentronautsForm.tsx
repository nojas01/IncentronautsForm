import {
    Button,
    Col,
    FormGroup,
    Label,
    Spinner,
} from 'reactstrap';
import React, {
    ReactElement,
    RefObject,
    useState,
    ChangeEvent,
} from 'react';
import { useForm } from 'react-hook-form';
import '../styles/IncentronautsForm.css';

const postcodeRegex = RegExp(/(^[0-9]{4}[a-z]{2})$/i);
const houseNumberRegex = RegExp(/(^[0-9]+)$/i);

export interface FormInput {
    initials: string;
    preposition: string;
    lastName: string;
    zipcode: string;
    street: string;
    city: string;
    houseNumber: string;
    email: string;
}

export interface FormProps {
    submitForm: (formData: FormInput) => void;
    formRef: RefObject<HTMLFormElement>;
    updateDefaultValues: ({city, street}:{city: string, street:string}) => void;
    city: string;
    street: string;
}

function IncentronautsForm({submitForm, formRef, updateDefaultValues,city, street}: FormProps): ReactElement {
    const {register, errors, handleSubmit} = useForm<FormInput>();
    const [spinnerVisible, setSpinnerVisible] = useState<boolean>(false)

    const getStreetAddressInformation      = async (event:  ChangeEvent<HTMLInputElement>):Promise<void> => {
        setSpinnerVisible(true);
        if (!postcodeRegex.test(event.target.value)) return;

        const result = await fetch(`https://photon.komoot.de/api/?q=${event.target.value}&limit=5`, {
            method: 'GET',
            mode:   'cors',
        }).then((response) => response.json()).then((responsJson) => responsJson.features).catch(error => {
            console.log('error', error);
            return [];
        });

        const address = result.find((feature: {[key:string]: any}) => feature?.properties?.street ?? null);
        const updatedDefaultValues = {
            city: '',
            street: '',
        };
        if (address) {
            updatedDefaultValues.street = address.properties.street;
        }
        updatedDefaultValues.city = (result[0]?.properties?.city ?? '');
        updateDefaultValues(updatedDefaultValues)
        setSpinnerVisible(false);
    };

   return (
        <form
            onSubmit={handleSubmit(submitForm)}
            ref={formRef}
        >
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
                        ref={register({
                            required: 'Dit veld is verplicht',
                            pattern:  {
                                value:  postcodeRegex,
                                message: 'Voor je postcode in als 1234AB',
                            },
                        })
                        }
                        onBlur={getStreetAddressInformation}
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
                        defaultValue={street}
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
                        defaultValue={city}
                        ref={register({required: 'Dit veld is verplicht'})}
                    />
                    {errors.city &&
                    <span className={'errorText'}>{errors.city.message}</span>
                    }
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="houseNumber" sm={3}>Huisnummer</Label>
                <Col sm={9}>
                    <input
                        className={'w-100'}
                        type="text"
                        name="houseNumber"
                        id="houseNumber"
                        placeholder="Huisnummmer zonder toevoeging"
                        ref={register({
                            required: 'Dit veld is verplicht',
                            pattern:  {
                                value:  houseNumberRegex,
                                message: 'Voer alleen de cijfers van je huisnummer in',
                            },
                        })}
                    />
                    {errors.houseNumber &&
                    <span className={'errorText'}>{errors.houseNumber.message}</span>
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
                                value:   /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
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
                <Button className={'w-100 buttonColor mx-3'}>
                    {spinnerVisible ?
                    <Spinner className={'buttonSpinner'}/>
                    :
                    "Submit"
                    }
                </Button>
            </FormGroup>
        </form>
    );
}

export default IncentronautsForm;
