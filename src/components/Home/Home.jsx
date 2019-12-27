import React from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <p>Enter 0 - 7 - 1 - 3 - 9 into the reader</p>
      <Link to="/register">
        <Button>Next</Button>
      </Link>
    </div>
  )
}

export default Home;