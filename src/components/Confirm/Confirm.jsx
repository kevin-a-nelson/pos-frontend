import React from 'react'
import Button from 'react-bootstrap/Button'
import { Redirect } from 'react-router-dom'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { Link } from 'react-router-dom'

class Confirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmed: false,
      goToCheckout: false,
    }
  }

  handleConfirm() {
    this.props.collectPaymentMethod()
    this.setState({ confirmed: true })
  }

  handleBack() {
    this.setState({ goToCheckout: true })
  }

  render() {

    if (this.state.confirmed) {
      return <Redirect to="/purchase" />
    }

    if (this.state.goToCheckout) {
      return <Redirect to="/checkout" />
    }

    return (
      <div className="confirm">
        <Button variant="primary" onClick={this.handleConfirm.bind(this)} block>Confirm</Button>
        <Button variant="outline-primary" onClick={this.handleBack.bind(this)} block>Back</Button>
      </div>
    )
  }
}

export default Confirm