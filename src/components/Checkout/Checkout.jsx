import React, { useState } from 'react'
import Products from '../Products/Products.jsx'
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './Checkout.css'

const Checkout = ({ cart, setCart, chargeAmount, updateChargeAmount, setReaderDisplay, errorOccured }) => {
  const [checkedOut, setCheckedOut] = useState(false)

  const handleCheckout = () => {
    setReaderDisplay()
    setCheckedOut(true)
    window.scrollTo(0, 0);
  }

  if (checkedOut && !errorOccured) {
    return <Redirect to="/confirm" />
  }

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
        setCart={setCart}
        updateChargeAmount={updateChargeAmount}
      />
      <Button size="lg" className="checkout-btn" disabled={chargeAmount === 0} onClick={() => handleCheckout()} block>Checkout</Button>
    </div>
  )
}

export default Checkout;