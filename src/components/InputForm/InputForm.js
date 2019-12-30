import React, { useState } from 'react'
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

import "./InputForm.scss"

const InputForm = (props) => {
  const [formValue, setFormValue] = useState()

  const {
    label,
    placeholder,
    btns,
  } = props

  let formRef = React.createRef();


  const handleChange = () => {
    setFormValue(formRef.current.value)
  }

  const Btns = () => {
    return (
      btns.map((btn, index) => {
        return (
          <Button key={index} className={`btn${index + 1}`} variant={btn.variant} onClick={() => btn.onClick(formValue)}>
            {btn.text}
          </Button>
        )
      })
    )
  }

  return (
    <div className="input-form">
      <Form>
        <Form.Group controlId="registerReader">
          <Form.Label>{label}</Form.Label>
          <Form.Control onChange={handleChange} placeholder={placeholder} ref={formRef} />
        </Form.Group>
        <Btns />
      </Form>
    </div >
  )
}

export default InputForm