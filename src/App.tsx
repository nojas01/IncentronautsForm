import React from 'react';
import './App.css';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

function App() {
  return (
    <div className="App">
      <Form>
        <FormGroup row>
          <Label for="exampleEmail" sm={2}>Email</Label>
          <Col sm={10}>
            <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="examplePassword" sm={2}>Password</Label>
          <Col sm={10}>
            <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
}

export default App;
