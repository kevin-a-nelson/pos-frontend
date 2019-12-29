import React, { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import './ErrorMessage.css'
import { Link, Redirect } from 'react-router-dom'

const ErrorMessage = ({ errorOccured, errorMsg, setErrorOccured, setErrorMsg }) => {

  if (!errorOccured || !errorMsg) {
    return null
  }

  const handleClick = () => {
    setErrorMsg(null)
    setErrorOccured(false)
  }

  return (
    <div>
      <Alert className="error-msg" variant="danger">
        {errorMsg}<br />
        <Link onClick={() => setErrorMsg(null)}>Close</Link>
      </Alert>
    </div>
  )
}

export default ErrorMessage