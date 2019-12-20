import React from 'react'

class Event extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: null
        }
    }

    handleClick() {
        const event = {
            title: this.props.title,
            start_date: this.props.start_date,
            end_date: this.props.end_date,
            location_state: this.props.location_state,
            location_address_line_1: this.props.location_address_line_1,
            location_address_line_2: this.props.location_address_line_2,
            bg_image_path: this.props.bg_image_path,
        }
        this.props.updateShowEvents(false)
        this.props.updateEvent(event)
    }

    render() {
        return (
            <div className="event" onClick={this.handleClick.bind(this)}>
                <img src="https://via.placeholder.com/250x150" />
                <h1>{this.props.title}</h1>
                <p>{this.props.start_date}</p>
                <p>{this.props.end_date}</p>
                <p>{this.props.bg_image_path}</p>
            </div>
        )
    }
}

export default Event