import React from 'react'
import Alert from 'react-bootstrap/Alert'
import './ErrorMessage.css'

const ErrorMessage = ({ errorMsgs, onClose }) => {

  if (!errorMsgs) { return null }

  return (
    <div className="error-msg-container">
      <Alert className="error-msg" variant="danger">
        <div className="top-space"></div>
        {
          errorMsgs.map((errorMsg) =>
            <p>{errorMsg}</p>
          )
        }
        <div className="error-msg-close-container">
          <span className="close-link" onClick={() => onClose(null)}>Close</span>
        </div>
      </Alert>
    </div>
  )
}

export default ErrorMessage