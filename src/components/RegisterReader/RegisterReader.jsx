
import React, { useState } from "react";

import { Redirect } from "react-router-dom";

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const RegisterReader = ({ registerReader, errorOccured }) => {
  let formRef = React.createRef();

  const handleRegister = () => {
    const registrationCode = formRef.current.value
    registerReader(registrationCode)
  }

  return (
    <div>
      <Form>
        <Form.Group controlId="registerReader">
          <Form.Label>Registration Code</Form.Label>
          <Form.Control placeholder="Enter Registration Code" ref={formRef} />
        </Form.Group>
        <Button variant="primary" onClick={() => handleRegister()}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default RegisterReader;
