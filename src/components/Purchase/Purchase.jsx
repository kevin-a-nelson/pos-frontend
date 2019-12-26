import React from 'react'
import InsertCard from '../../static/insertCard.png'
import Button from 'react-bootstrap/Button'
import { Redirect } from 'react-router-dom'

class Purchase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentCollected: false,
    }
  }

  handleCollectPayment() {
    this.props.collectCardPayment()
    this.setState({ paymentCollected: true })
  }

  handleBack() {
    this.setState({ paymentCollected: true })
  }

  render() {
    const { paymentCollected } = this.state
    const { workFlowInProgress } = this.props

    if (workFlowInProgress) {
      return <h1>Loading ... </h1>
    }

    if (paymentCollected) {
      return <Redirect to="/success" />
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

