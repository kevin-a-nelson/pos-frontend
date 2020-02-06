import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import "../Facility/Facility.css"

const Facility = (props) => {
    const {
        facility,
        onSelect,
    } = props

    return (
        <Card className="facility">
            <Card.Body>
                <Card.Title className="event-title">{facility.title}</Card.Title>
                <Button variant="primary" onClick={() => onSelect(facility)}>Select Facility</Button>
            </Card.Body>
        </Card>
    )
}

export default Facility