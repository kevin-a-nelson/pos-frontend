import React from 'react'
import Alert from 'react-bootstrap/Alert'
import './ErrorMessage.css'

import { Link } from "react-router-dom"


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
        <span>If all else fails <Link to="/reader" onClick={() => onClose(null)} >restart</Link></span>
        <div className="error-msg-close-container">
          <span className="close-link" onClick={() => onClose(null)}>Close</span>
        </div>
      </Alert>
    </div>
  )
}

export default ErrorMessage