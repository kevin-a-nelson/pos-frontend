import React from 'react'
import { Link } from 'react-router-dom'

const Success = () => {
  return (
    <div>
      <h1>Success!</h1>
      <Link to="/checkout">back to checkout</Link>
    </div>
  )
}

export default Success