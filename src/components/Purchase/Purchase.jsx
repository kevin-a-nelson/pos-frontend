import React from 'react'
import InsertCard from '../../static/insertCard.png'
import Button from 'react-bootstrap/Button'
import { Redirect } from 'react-router-dom'

class Purchase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goToCheckout: false,
    }
  }

  handleCollectPayment() {
    this.props.collectCardPayment()
    this.setState({ goToCheckout: true })
  }

  handleBack() {
    this.setState({ goToCheckout: true })
  }

  render() {
    if (this.state.goToCheckout) {
      return <Redirect to="/checkout" />
    }
    return (
      <div className="insert-card">
        <img className="insert-card-img" src={InsertCard} alt="Insert Card" />
        <Button variant="primary" onClick={this.handleCollectPayment.bind(this)} block>Collect Payment</Button>
        <Button variant="outline-primary" onClick={this.handleBack.bind(this)} block>Back</Button>
      </div>
    )
  }
}

export default Purchase;

