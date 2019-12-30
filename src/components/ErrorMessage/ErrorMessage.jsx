import React, { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import './ErrorMessage.css'
import { Link, Redirect } from 'react-router-dom'

const ErrorMessage = ({ errorMsg, onClose }) => {

  if (errorMsg === null) {
    return null
  }

  return (
    <div>
      <Alert className="error-msg" variant="danger">
        {errorMsg}
        <br />
        <Link onClick={onClose}>Close</Link>
      </Alert>
    </div>
  )
}

export default ErrorMessage