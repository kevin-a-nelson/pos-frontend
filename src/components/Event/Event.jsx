import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom'

const Event = ({ title, event, image, state, city, setEvent }) => {
    const [eventSelected, setEventSelected] = useState(false)

    const handleEventSelect = () => {
        setEvent({ event })
        setEventSelected(true)
    }

    if (eventSelected) {
        return <Redirect to="/checkout" />
    }

    return (
        <Card className="event">
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title className="event-title">{title}</Card.Title>
                <Card.Text>
                    {state}, {city}
                </Card.Text>
                <Button variant="primary" onClick={() => handleEventSelect()}>Select Event</Button>
            </Card.Body>
        </Card>
    )
}

export default Event