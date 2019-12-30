import React from 'react'

import "./Loader.css"

const Loader = ({ loading }) => {

  if (!loading) { return null }

  return (
    <div className="lds-grid-container">
      <div class="lds-grid">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loader