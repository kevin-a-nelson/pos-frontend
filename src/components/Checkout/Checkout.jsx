import React, { useState } from 'react'
import Products from '../Products/Products.jsx'
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './Checkout.css'

const Checkout = (props) => {

  const {
    cart,
    chargeAmount,
    onCheckout,
    onQtyChange
  } = props

  return (
    <div className="checkout">
      <div className="checkout-header">
        <div className="checkout-header-left">
          <h1>Total: </h1>
        </div>
        <div className="checkout-header-right">
          <h1>${chargeAmount}</h1>
        </div>
      </div>
      <Products
        cart={cart}
        onQtyChange={onQtyChange}
      />
      <Button size="lg" className="checkout-btn" disabled={chargeAmount === 0} onClick={() => onCheckout()} block>Checkout</Button>
    </div>
  )
}

export default Checkout;