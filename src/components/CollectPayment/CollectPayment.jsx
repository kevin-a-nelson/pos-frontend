import React, { useState } from 'react'
import dollarSign from '../../assets/dollarSign.png'
import Button from 'react-bootstrap/Button'
import { Redirect, Link } from 'react-router-dom'
import "./CollectPayment.css"


const CollectPayment = ({ collectPayment, cancelPayment, emptyCart, collectingPayment, errorOccured, terminal }) => {
  const [paymentCollected, setPaymentCollected] = useState(false)
  const [paymentCanceled, setPaymentCanceled] = useState(false)

  const handleCollectPayment = () => {
    collectPayment()
    emptyCart()
    setPaymentCollected(true)
  }

  const handleCancelPayment = () => {

    if (!paymentCollected) {
      emptyCart()
      setPaymentCanceled(true)
      terminal.clearReaderDisplay()
      return
    }

    cancelPayment()
    setPaymentCollected(false)
    setPaymentCanceled(true)
  }

  if (paymentCanceled) {
    return <Redirect to="/checkout" />
  }

  if (paymentCollected && !collectingPayment && !errorOccured) {
    return <Redirect to="/success" />
  }

  return (
    <div className="insert-card">
      <img className="insert-card-img" src={dollarSign} alt="Insert Card" />
      <div className="insert-card-btns">
        <Button size="md" disabled={collectingPayment} className="btn" variant="primary" onClick={() => handleCollectPayment()} block>Collect Payment</Button>
        <Button size="md" variant="outline-primary" className="btn" onClick={() => handleCancelPayment()} block>Cancel Payment</Button>
      </div>
    </div>
  )
}

export default CollectPayment;

