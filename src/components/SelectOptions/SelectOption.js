import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import "../Event/Event.css"

const Event = (props) => {
    const {
        title,
        onSelect,
        image,
        subTitle,
        event
    } = props

    return (
        <Card className="event">
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title className="event-title">{title}</Card.Title>
                <Card.Text>
                    {subTitle}
                </Card.Text>
                <Button variant="primary" onClick={() => onSelect(event)}>Select Event</Button>
            </Card.Body>
        </Card>
    )
}

export default Event