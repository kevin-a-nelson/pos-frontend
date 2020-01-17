import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import "./Event.css"

const Event = (props) => {
    const {
        event,
        onSelect,
    } = props

    return (
        <Card className="event">
            <Card.Img variant="top" src={`https://events.prephoops.com/${event.logo}`} />
            <Card.Body>
                <Card.Title className="event-title">{event.title}</Card.Title>
                <Card.Text>
                    {event.address_state}, {event.address_city}
                </Card.Text>
                <Button variant="primary" onClick={() => onSelect(event)}>Select Event</Button>
            </Card.Body>
        </Card>
    )
}

export default Event