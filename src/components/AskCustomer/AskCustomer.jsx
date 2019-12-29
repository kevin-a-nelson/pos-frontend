import React from 'react'
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom"
import InsertCard from "../../assets/insertCard2.png"

import "./AskCustomer.css"

const AskCustomer = (props) => {
  const { terminal } = props
  return (
    <div className="ask-customer">
      <h1>Insert Card</h1>
      <img src={InsertCard} />
      <Link to="/collect">
        <Button className="next-btn" block>Next</Button>
      </Link>
      <Link to="/checkout" onClick={() => terminal.clearReaderDisplay()}>
        <Button variant="outline-primary" block>Change Order</Button>
      </Link>
    </div>
  )
}

export default AskCustomer