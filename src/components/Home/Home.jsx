import React from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import readerImg from "./reader-large.png"

import "./Home.css"

const Home = () => {
  return (
    <div className="home">
      <img src={readerImg} />
      <p>Enter</p>
      <p className="nums"><strong>0 7 1 3 9</strong></p>
      <p>Into the reader</p>
      <div className="home-text-btn-container">
        <Link to="/register">
          <Button block>Next</Button>
        </Link>
      </div>
    </div >
  )
}

export default Home;