import React, { useEffect, useState } from 'react'
import Products from '../Products/Products.jsx'
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'
import './Checkout.css'
import axios from 'axios';

const Checkout = (props) => {

  const [cart, setCart] = useState(0);

  const {
    chargeAmount,
    onCheckout,
    onQtyChange,
    onPayWithCash
  } = props

  useEffect(() => {
    axios.get('http://localhost:8000/api/products')
      .then(res => {
        setCart(res.data);
      })
      .catch(error => {
        console.log(error)
      })
  }, []);

  return (
    <div className="checkout">
      <div className="pay-cash-btn-container">
        <Button onClick={() => onPayWithCash()} variant="primary" size="lg" disabled={chargeAmount === 0} className="pay-cash-btn" block>Pay With Cash</Button>
      </div>
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