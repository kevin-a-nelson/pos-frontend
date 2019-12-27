import React from 'react'

const Loader = ({ loading }) => {
  if (!loading) { return null }

  return <h1>Loading ... </h1>
}

export default Loader