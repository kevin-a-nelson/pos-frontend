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
  }

  if (checkedOut && !errorOccured) {
    return <Redirect to="/collect" />
  }

  return (
    <div>
      <div className="checkout-header">
        <div className="checkout-header-left">
          <h1>Total: </h1>
        </div>
        <div className="checkout-header-right">
          <h1>${chargeAmount}</h1>
        </div>
      </div>
      <Button onClick={() => handleCheckout()} block>Checkout</Button>
      <Products
        cart={cart}
        setCart={setCart}
        updateChargeAmount={updateChargeAmount}
      />
    </div>
  )
}

export default Checkout;