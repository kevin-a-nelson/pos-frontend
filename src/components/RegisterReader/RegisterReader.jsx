
import React, { useState } from "react";

import { Redirect, Link } from "react-router-dom";

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import "./RegisterReader.css"

const RegisterReader = ({ registerReader, errorOccured, setReaderRegistered }) => {
  const [registered, setRegistered] = useState(false)

  let formRef = React.createRef();

  const handleRegister = () => {
    const registrationCode = formRef.current.value
    registerReader(registrationCode)
    setRegistered(true)
    setReaderRegistered(true)
  }

  if (!errorOccured && registered) {
    return <Redirect to="/events" />
  }

  return (
    <div className="register-reader">
      <Form>
        <Form.Group controlId="registerReader">
          <Form.Label>Registration Code</Form.Label>
          <Form.Control placeholder="Ex. Sepia-cerulean-orynx" ref={formRef} />
        </Form.Group>
        <Button variant="primary" onClick={() => handleRegister()}>
          Submit
        </Button>
        <Link to="/">
          <Button variant="outline-primary" className="back-btn">
            Back
          </Button>
        </Link>
      </Form>
    </div>
  );
}

export default RegisterReader;
