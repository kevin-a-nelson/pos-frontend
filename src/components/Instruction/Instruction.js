import React from 'react'
import Button from 'react-bootstrap/Button'

import "./Instruction.scss"

const Instruction = (props) => {
  const {
    className,
    header,
    img,
    btns,
    lines
  } = props

  const Lines = () => {
    return lines.map((line, index) => {
      return (
        <p
          key={index}
          className={`line${index + 1}`}>
          {line.text}
        </p>
      )
    })
  }

  const Buttons = () => {
    return btns.map((btn, index) => {
      return (
        <Button
          key={index}
          className={`btn${index}`}
          onClick={btn.onClick}
          block={btn.block}
        >
          {btn.text}
        </Button >
      )
    })
  }

  return (
    <div className={className}>
      <h1>{header}</h1>
      <img src={img} alt="img" />
      <Lines />
      <Buttons />
    </div >
  )
}

export default Instruction;