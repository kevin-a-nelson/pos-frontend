import React, { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import './ErrorMessage.css'
import { Link, Redirect } from 'react-router-dom'

const ErrorMessage = ({ errorOccured, errorMsg, setErrorOccured, setErrorMsg }) => {
  const [exiting, setExiting] = useState(false)

  if (!errorOccured || !errorMsg) {
    return null
  }

  const handleClick = () => {
    setErrorMsg(null)
    setErrorOccured(false)
    setExiting(true)
  }

  if (exiting) {
    return <Redirect to="/" />
  }

  return (
    <div>
      <Alert className="error-msg" variant="danger">
        {errorMsg}<br />
        <Link onClick={() => handleClick()}>home</Link>
      </Alert>
    </div>
  )
}

export default ErrorMessage