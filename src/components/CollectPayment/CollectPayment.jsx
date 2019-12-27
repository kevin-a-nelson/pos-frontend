import React, { useState } from 'react'
import InsertCard from '../../assets/insertCard.png'
import Button from 'react-bootstrap/Button'
import { Redirect, Link } from 'react-router-dom'


const CollectPayment = ({ collectPayment, cancelPayment, emptyCart }) => {
  const [paymentCollected, setPaymentCollected] = useState(false)

  const handleCollectPayment = () => {
    collectPayment()
    emptyCart()
    setPaymentCollected(true)
  }

  const handleCancelPayment = () => {
    cancelPayment()
    paymentCollected(false)
  }

  if (paymentCollected) {
    return <Redirect to="/success" />
  }

  return (
    <div className="insert-card">
      <img className="insert-card-img" src={InsertCard} alt="Insert Card" />
      <Button className="collect-payment-btn" variant="primary" onClick={() => handleCollectPayment()} block>Collect Payment</Button>
      <Link to="/checkout">
        <Button variant="outline-primary" block>Back</Button>
      </Link>
    </div >
  )
}

export default CollectPayment;

