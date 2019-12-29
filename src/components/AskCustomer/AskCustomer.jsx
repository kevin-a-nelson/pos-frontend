import React from 'react'
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom"

import "./AskCustomer.css"

const AskCustomer = () => {
  return (
    <div className="ask-customer">
      <Link to="/collect">
        <Button className="next-btn" block>Next</Button>
      </Link>
      <Link to="/checkout">
        <Button variant="outline-primary" block>Change Order</Button>
      </Link>
    </div>
  )
}

export default AskCustomer