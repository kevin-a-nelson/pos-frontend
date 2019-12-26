import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom'

class Event extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventSelected: false,
        }
    }

    handleClick() {
        const selectedEvent = {
            title: this.props.title,
            start_date: this.props.start_date,
            end_date: this.props.end_date,
            location_state: this.props.location_state,
            location_address_line_1: this.props.location_address_line_1,
            location_address_line_2: this.props.location_address_line_2,
            bg_image_path: this.props.bg_image_path,
        }
        this.props.updateShowEvents(false)
        this.props.updateSelectedEvent(selectedEvent)
        this.setState({ eventSelected: true })
    }

    render() {

        const { eventSelected } = this.state

        if (eventSelected) {
            return <Redirect to="/checkout" />
        }

        return (
            <Card className="event">
                <Card.Img variant="top" src="https://via.placeholder.com/250x150" />
                <Card.Body>
                    <Card.Title className="event-title">{this.props.title}</Card.Title>
                    <Card.Text>
                        <p>{this.props.location_state}, {this.props.location_address_line_2}</p>
                    </Card.Text>
                    <Button variant="primary" onClick={this.handleClick.bind(this)}>Select Event</Button>
                </Card.Body>
            </Card>
        )
    }
}

export default Event