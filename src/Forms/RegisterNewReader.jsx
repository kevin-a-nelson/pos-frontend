//@flow

import * as React from "react";

import { Redirect } from "react-router-dom";

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class RegisterNewReader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
    };
    this.registrationCode = React.createRef();
  }

  handleSubmit() {
    let registrationCode = this.registrationCode.current.value
    this.props.onSubmitRegister(registrationCode);
    this.setState({ submitted: true })
  }

  render() {
    const { submitted } = this.state;

    if (submitted) {
      return <Redirect to="/events" />
    }

    return (
      <Form>
        <Form.Group controlId="registerReader">
          <Form.Label>Registration Code</Form.Label>
          <Form.Control placeholder="Enter Registration Code" ref={this.registrationCode} />
        </Form.Group>
        <Button variant="primary" onClick={() => this.handleSubmit()}>
          Submit
        </Button>
      </Form>
    );
  }
}

export default RegisterNewReader;
