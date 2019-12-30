import React from 'react'
import Products from '../Products/Products.jsx'
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'
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
        <div id="total-container">
          <span id="total">Total</span>
        </div>
        <div id="amount-container">
          <span id="amount">${chargeAmount}</span>
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