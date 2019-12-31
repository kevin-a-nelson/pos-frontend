import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Event = (props) => {
    const {
        event,
        onSelect,
    } = props

    return (
        <Card className="event">
            <Card.Img variant="top" src={`https://events.prephoops.com/${event.images[0].image_path}`} />
            <Card.Body>
                <Card.Title className="event-title">{event.title}</Card.Title>
                <Card.Text>
                    {event.location_state}, {event.location_address_line_2}
                </Card.Text>
                <Button variant="primary" onClick={() => onSelect(event)}>Select Event</Button>
            </Card.Body>
        </Card>
    )
}

export default Event