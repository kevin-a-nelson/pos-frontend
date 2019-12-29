import React from 'react'
import { Link } from 'react-router-dom'
import Button from "react-bootstrap/Button"
import paymentSuccessful from "../../assets/paymentSuccessful.png"

import "./Success.css"

const Success = () => {
  return (
    <div className="success-container">
      <h1>Success</h1>
      <div className="success-img-container">
        <img className="success-img" src={paymentSuccessful} alt="payment successfull" />
      </div>
      <Link to="/checkout">
        <Button size="lg">Return to checkout</Button>
      </Link>
    </div>
  )
}

export default Success