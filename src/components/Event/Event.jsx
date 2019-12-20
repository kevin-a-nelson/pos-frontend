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
            bg_image_path: this.props.bg_image_path,
        }
        this.props.updateShowEvents(false)
        this.props.updateEvent(event)
    }

    render() {
        return (
            <div onClick={this.handleClick.bind(this)}>
                <h1>{this.props.title}</h1>
                <p>{this.props.start_date}</p>
                <p>{this.props.end_date}</p>
                <p>{this.props.bg_image_path}</p>
            </div>
        )
    }
}

export default Event