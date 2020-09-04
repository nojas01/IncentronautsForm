import React from 'react';
import './App.css';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Row } from 'reactstrap';

function App() {
  return (
      <div className={'container'}>
    <Col sm={6} className={'offset-sm-3'}>
      <Form>
        <FormGroup row>
          <Label for="initials" sm={3}>Initialen</Label>
          <Col sm={9}>
            <Input type="text" name="initials" id="initials" placeholder="Initialen" />
          </Col>
        </FormGroup>
          <FormGroup row>
            <Label for="lastName" sm={3}>Tussenvoegsel</Label>
            <Col sm={9}>
              <Input type="text" name="lastName" id="lastName" placeholder="Tussenvoegsel" />
            </Col>
          </FormGroup>
        <FormGroup row>
          <Label for="lastName" sm={3}>Achternaam</Label>
          <Col sm={9}>
            <Input type="text" name="lastName" id="lastName" placeholder="Achternaam" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="zipcode" sm={3}>Postcode</Label>
          <Col sm={9}>
            <Input type="text" name="zipcode" id="zipcode" placeholder="Postcode (bv: 1334AB)" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="street" sm={3}>Straatnaam</Label>
          <Col sm={9}>
            <Input type="text" name="street" id="street" placeholder="Straatnaam" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="city" sm={3}>Stad</Label>
          <Col sm={9}>
            <Input type="text" name="city" id="city" placeholder="Stad" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail" sm={3}>Email</Label>
          <Col sm={9}>
            <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
          </Col>
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
