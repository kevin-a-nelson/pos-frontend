import React from 'react'
import Alert from 'react-bootstrap/Alert'
import './ErrorMessage.css'
import Button from 'react-bootstrap/Button'

import { Link } from "react-router-dom"


const ErrorMessage = (props) => {

  const {
    errorMsgs,
    onClose,
    onReset,
  } = props

  if (!errorMsgs || errorMsgs.length === 0) { return null }

  return (
    <div className="alert-container">
      <Alert className="alert" variant="danger">
        <Button className="close-btn" onClick={onClose} variant="light">X</Button>
        <div className="error-msg-container">
          {
            errorMsgs.map((errorMsg) => {
              const msg = (<p className={errorMsg.className}>{errorMsg.text}</p>)

              if (errorMsg.isLink) { return (<Link to={errorMsg.to}>{msg}</Link>) }

              if (errorMsg.isClose) { return (<Link to={errorMsg.to} onClick={onClose}>{msg}</Link>) }


              return msg
            })
          }
        </div>
      </Alert>
    </div>
  )
}

export default ErrorMessage